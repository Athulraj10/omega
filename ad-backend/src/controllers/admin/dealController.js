const Deal = require('../../models/deal');
const Product = require('../../models/product');
const Category = require('../../models/category');
const S3Bucket = require('../../services/S3Bucket');
const logger = require('../../logger/logger');

// Add new deal
const addDeal = async (req, res) => {
  try {
    const {
      title,
      description,
      dealType,
      discountValue,
      originalPrice,
      dealPrice,
      category,
      brand,
      location,
      quantity,
      weight,
      rating,
      status,
      sale,
      isActive,
      isFeatured,
      startDate,
      endDate,
      maxUses,
      minOrderValue,
      applicableProducts,
      applicableCategories,
      tags,
      conditions,
      terms,
      seller
    } = req.body;

    // Validate required fields
    if (!title || !originalPrice || !dealPrice || !category || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, originalPrice, dealPrice, category, startDate, endDate'
      });
    }

    // Validate prices
    if (parseFloat(originalPrice) <= 0 || parseFloat(dealPrice) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Prices must be greater than 0'
      });
    }

    if (parseFloat(dealPrice) >= parseFloat(originalPrice)) {
      return res.status(400).json({
        success: false,
        message: 'Deal price must be less than original price'
      });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (start < now) {
      return res.status(400).json({
        success: false,
        message: 'Start date cannot be in the past'
      });
    }

    if (end <= start) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date'
      });
    }

    // Handle image uploads
    let images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${file.originalname}`;
          const storagePath = 'deals';
          
          // Convert file to base64 for S3Bucket service
          const base64Data = file.buffer.toString('base64');
          const mimeType = file.mimetype;
          const base64String = `data:${mimeType};base64,${base64Data}`;
          
          const uploadResult = await S3Bucket.base64ImageUpload(fileName, storagePath, base64String, res);
          
          if (uploadResult.code === 200) {
            const imageUrl = process.env.S3_ENABLE === 'true' 
              ? S3Bucket.s3MediaUrl(storagePath, '', fileName)
              : S3Bucket.mediaUrl(storagePath, '', fileName);
            images.push(imageUrl);
          }
        } catch (uploadError) {
          logger.error('Image upload error:', uploadError);
          return res.status(500).json({
            success: false,
            message: 'Error uploading images'
          });
        }
      }
    }

    // Convert tags string to array
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

    // Create deal object
    const dealData = {
      title: title.trim(),
      description: description?.trim(),
      dealType: dealType || 'percentage',
      discountValue: parseFloat(discountValue) || 0,
      originalPrice: parseFloat(originalPrice),
      dealPrice: parseFloat(dealPrice),
      category: category.trim(),
      brand: brand?.trim(),
      location: location || 'Online',
      quantity: parseInt(quantity) || 1,
      weight: weight?.trim(),
      rating: parseFloat(rating) || 0,
      status: status || 'Available',
      sale: sale?.trim(),
      images,
      isActive: isActive !== undefined ? isActive : true,
      isFeatured: isFeatured || false,
      startDate: start,
      endDate: end,
      maxUses: parseInt(maxUses) || -1,
      minOrderValue: parseFloat(minOrderValue) || 0,
      applicableProducts: applicableProducts ? applicableProducts.split(',').map(id => id.trim()) : [],
      applicableCategories: applicableCategories ? applicableCategories.split(',').map(id => id.trim()) : [],
      tags: tagsArray,
      conditions: conditions?.trim(),
      terms: terms?.trim(),
      createdBy: req.adminData._id,
      seller: seller || null
    };

    // Create the deal
    const deal = new Deal(dealData);
    await deal.save();

    logger.info(`Deal created successfully: ${deal._id}`);

    res.status(201).json({
      success: true,
      message: 'Deal created successfully',
      data: deal
    });

  } catch (error) {
    logger.error('Error creating deal:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating deal',
      error: error.message
    });
  }
};

// Get all deals with pagination and filters
const getAllDeals = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      dealType,
      status,
      isActive,
      isFeatured,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) filter.category = category;
    if (dealType) filter.dealType = dealType;
    if (status) filter.status = status;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';

    if (startDate || endDate) {
      filter.startDate = {};
      if (startDate) filter.startDate.$gte = new Date(startDate);
      if (endDate) filter.startDate.$lte = new Date(endDate);
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const deals = await Deal.find(filter)
      .populate('createdBy', 'name email')
      .populate('seller', 'companyName userName')
      .populate('category', 'name description icon')
      .populate('applicableProducts', 'name price')
      .populate('applicableCategories', 'name')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Deal.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: deals,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    logger.error('Error fetching deals:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching deals',
      error: error.message
    });
  }
};

// Get deal by ID
const getDealById = async (req, res) => {
  try {
    const { id } = req.params;

    const deal = await Deal.findById(id)
      .populate('createdBy', 'name email')
      .populate('seller', 'companyName userName')
      .populate('category', 'name description icon')
      .populate('applicableProducts', 'name price stock')
      .populate('applicableCategories', 'name');

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: 'Deal not found'
      });
    }

    res.status(200).json({
      success: true,
      data: deal
    });

  } catch (error) {
    logger.error('Error fetching deal:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching deal',
      error: error.message
    });
  }
};

// Update deal
const updateDeal = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Find the deal
    const deal = await Deal.findById(id);
    if (!deal) {
      return res.status(404).json({
        success: false,
        message: 'Deal not found'
      });
    }

    // Handle image uploads if new images are provided
    if (req.files && req.files.length > 0) {
      const newImages = [];
      for (const file of req.files) {
        try {
          const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${file.originalname}`;
          const storagePath = 'deals';
          
          // Convert file to base64 for S3Bucket service
          const base64Data = file.buffer.toString('base64');
          const mimeType = file.mimetype;
          const base64String = `data:${mimeType};base64,${base64Data}`;
          
          const uploadResult = await S3Bucket.base64ImageUpload(fileName, storagePath, base64String, res);
          
          if (uploadResult.code === 200) {
            const imageUrl = process.env.S3_ENABLE === 'true' 
              ? S3Bucket.s3MediaUrl(storagePath, '', fileName)
              : S3Bucket.mediaUrl(storagePath, '', fileName);
            newImages.push(imageUrl);
          }
        } catch (uploadError) {
          logger.error('Image upload error:', uploadError);
          return res.status(500).json({
            success: false,
            message: 'Error uploading images'
          });
        }
      }
      updateData.images = newImages;
    }

    // Convert tags string to array if provided
    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    }

    // Convert applicable products/categories strings to arrays
    if (updateData.applicableProducts && typeof updateData.applicableProducts === 'string') {
      updateData.applicableProducts = updateData.applicableProducts.split(',').map(id => id.trim());
    }

    if (updateData.applicableCategories && typeof updateData.applicableCategories === 'string') {
      updateData.applicableCategories = updateData.applicableCategories.split(',').map(id => id.trim());
    }

    // Validate prices if provided
    if (updateData.originalPrice && updateData.dealPrice) {
      if (parseFloat(updateData.dealPrice) >= parseFloat(updateData.originalPrice)) {
        return res.status(400).json({
          success: false,
          message: 'Deal price must be less than original price'
        });
      }
    }

    // Update the deal
    const updatedDeal = await Deal.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email')
     .populate('seller', 'companyName userName')
     .populate('category', 'name description icon')
     .populate('applicableProducts', 'name price')
     .populate('applicableCategories', 'name');

    logger.info(`Deal updated successfully: ${id}`);

    res.status(200).json({
      success: true,
      message: 'Deal updated successfully',
      data: updatedDeal
    });

  } catch (error) {
    logger.error('Error updating deal:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating deal',
      error: error.message
    });
  }
};

// Delete deal
const deleteDeal = async (req, res) => {
  try {
    const { id } = req.params;

    const deal = await Deal.findById(id);
    if (!deal) {
      return res.status(404).json({
        success: false,
        message: 'Deal not found'
      });
    }

    // Delete associated images from S3
    if (deal.images && deal.images.length > 0) {
      for (const imageUrl of deal.images) {
        try {
          // Extract filename from URL for deletion
          const urlParts = imageUrl.split('/');
          const fileName = urlParts[urlParts.length - 1];
          await S3Bucket.removeOldImage(fileName, 'deals', res);
        } catch (deleteError) {
          logger.error('Error deleting image from S3:', deleteError);
        }
      }
    }

    await Deal.findByIdAndDelete(id);

    logger.info(`Deal deleted successfully: ${id}`);

    res.status(200).json({
      success: true,
      message: 'Deal deleted successfully'
    });

  } catch (error) {
    logger.error('Error deleting deal:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting deal',
      error: error.message
    });
  }
};

// Get active deals
const getActiveDeals = async (req, res) => {
  try {
    const deals = await Deal.getActiveDeals();

    res.status(200).json({
      success: true,
      data: deals
    });

  } catch (error) {
    logger.error('Error fetching active deals:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching active deals',
      error: error.message
    });
  }
};

// Get deal statistics
const getDealStats = async (req, res) => {
  try {
    const totalDeals = await Deal.countDocuments();
    const activeDeals = await Deal.countDocuments({ isActive: true });
    const featuredDeals = await Deal.countDocuments({ isFeatured: true });
    
    const now = new Date();
    const upcomingDeals = await Deal.countDocuments({
      startDate: { $gt: now },
      isActive: true
    });

    const expiringDeals = await Deal.countDocuments({
      endDate: { $gte: now, $lte: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) }, // Next 7 days
      isActive: true
    });

    res.status(200).json({
      success: true,
      data: {
        totalDeals,
        activeDeals,
        featuredDeals,
        upcomingDeals,
        expiringDeals
      }
    });

  } catch (error) {
    logger.error('Error fetching deal statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching deal statistics',
      error: error.message
    });
  }
};

// Bulk update deals
const bulkUpdateDeals = async (req, res) => {
  try {
    const { dealIds, updateData } = req.body;

    if (!dealIds || !Array.isArray(dealIds) || dealIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Deal IDs array is required'
      });
    }

    const result = await Deal.updateMany(
      { _id: { $in: dealIds } },
      updateData
    );

    logger.info(`Bulk updated ${result.modifiedCount} deals`);

    res.status(200).json({
      success: true,
      message: `Successfully updated ${result.modifiedCount} deals`,
      data: {
        modifiedCount: result.modifiedCount
      }
    });

  } catch (error) {
    logger.error('Error bulk updating deals:', error);
    res.status(500).json({
      success: false,
      message: 'Error bulk updating deals',
      error: error.message
    });
  }
};

module.exports = {
  addDeal,
  getAllDeals,
  getDealById,
  updateDeal,
  deleteDeal,
  getActiveDeals,
  getDealStats,
  bulkUpdateDeals
};