const fs = require("fs").promises;
const path = require("path");
const Product = require("../../models/product");
const Response = require("../../services/Response");

// Utility function to generate unique SKU
const generateUniqueSKU = async (baseSKU) => {
  let sku = baseSKU;
  let counter = 1;
  
  while (await Product.findOne({ sku })) {
    sku = `${baseSKU}-${counter}`;
    counter++;
  }
  
  return sku;
};

const SUCCESS = 200;
const FAIL = 400;
const INTERNAL_SERVER = 500;

const getProducts = async (req, res) => {
  try {
    console.log('🔄 Fetching products...');
    
    const products = await Product.find()
      .populate('category', 'name')
      .populate('seller', 'companyName userName email')
      .sort({ createdAt: -1 });
    
    console.log('📦 Fetched products:', products.length);
    console.log('📦 Sample product:', products[0] ? {
      _id: products[0]._id,
      name: products[0].name,
      category: products[0].category,
      seller: products[0].seller
    } : 'No products');
    
    return Response.successResponseData(res, products, SUCCESS, "Product list fetched successfully");
  } catch (err) {
    console.error('❌ Error fetching products:', err);
    console.error('❌ Error stack:', err.stack);
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

const addProduct = async (req, res) => {
  try {
    const { 
      name, description, category, subcategory, price, discountPrice, stock, minimumOrder, sku, status, seller,
      sale, location, brand, weight, rating, availability,
      metaTitle, metaDescription, keywords,
      features, tags,
      isOnSale, saleStartDate, saleEndDate, discountPercentage,
      lowStockThreshold, trackInventory
    } = req.body;

    console.log('📝 Adding product:', {name, description, category, price, discountPrice, stock, minimumOrder, sku, status, seller });
    console.log('📝 Subcategory value:', subcategory);
    console.log('📝 Subcategory type:', typeof subcategory);
    console.log('📝 Subcategory is array:', Array.isArray(subcategory));
    console.log('📁 Files received:', req.files ? req.files.length : 0);
    console.log('📝 Status value:', status);
    console.log('📝 Status type:', typeof status);
    // Basic validation
    console.log({name, description, category, price, discountPrice, stock, minimumOrder, sku, status, seller})
    if (!name || !category || !price || !sku) {
      return Response.errorResponseWithoutData(res, "Missing required fields", FAIL);
    }

    // Validate price, stock, and minimum order are numbers
    if (isNaN(price) || isNaN(stock) || isNaN(minimumOrder)) {
      return Response.errorResponseWithoutData(res, "Price, stock, and minimum order must be valid numbers", FAIL);
    }

    // Validate minimum order quantity
    if (parseInt(minimumOrder) < 1) {
      return Response.errorResponseWithoutData(res, "Minimum order quantity must be at least 1", FAIL);
    }

    if (parseInt(minimumOrder) > parseInt(stock)) {
      return Response.errorResponseWithoutData(res, "Minimum order quantity cannot be greater than available stock", FAIL);
    }

    // Validate discount price
    if (discountPrice && parseFloat(discountPrice) > 0) {
      const regularPrice = parseFloat(price);
      const discountPriceValue = parseFloat(discountPrice);
      
      if (discountPriceValue >= regularPrice) {
        return Response.errorResponseWithoutData(res, "Discount price must be less than regular price", FAIL);
      }
      
      if (discountPriceValue <= 0) {
        return Response.errorResponseWithoutData(res, "Discount price must be greater than 0", FAIL);
      }
    }

    // Check if SKU already exists
    const existingProduct = await Product.findOne({ sku: sku.trim() });
    if (existingProduct) {
      return Response.errorResponseWithoutData(res, `Product with SKU "${sku.trim()}" already exists. Please use a different SKU.`, FAIL);
    }

    let images = [];
    if (req.files && req.files.length > 0) {
      console.log('📸 Processing uploaded files:', req.files.length);
      images = req.files.map((file) => {
        const imagePath = `/uploads/products/${file.filename}`;
        console.log('📄 Image path:', imagePath);
        console.log('📄 File details:', {
          originalname: file.originalname,
          filename: file.filename,
          mimetype: file.mimetype,
          size: file.size
        });
        return imagePath;
      });
    } else {
      console.log('📸 No files uploaded');
    }

    // Process arrays from comma-separated strings
    const keywordsArray = keywords ? keywords.split(',').map(k => k.trim()).filter(k => k) : [];
    const featuresArray = features ? features.split(',').map(f => f.trim()).filter(f => f) : [];
    const tagsArray = tags ? tags.split(',').map(t => t.trim()).filter(t => t) : [];

    // Ensure subcategory is a single value, not an array
    const subcategoryValue = Array.isArray(subcategory) ? subcategory[0] : subcategory;
    
    const product = new Product({
      name: name.trim(),
      description: description?.trim() || '',
      category,
      subcategory: subcategoryValue || undefined,
      price: parseFloat(price),
      discountPrice: discountPrice ? parseFloat(discountPrice) : undefined,
      stock: parseInt(stock),
      minimumOrder: parseInt(minimumOrder),
      sku: sku.trim(),
      status: status || '1',
      seller: seller || undefined,
      
      // Product details
      sale: sale || '',
      location: location || 'Online',
      brand: brand || '',
      weight: weight || '',
      rating: rating ? parseFloat(rating) : 0,
      availability: availability || 'Available',
      
      // SEO fields
      metaTitle: metaTitle || '',
      metaDescription: metaDescription || '',
      keywords: keywordsArray,
      
      // Features and tags
      features: featuresArray,
      tags: tagsArray,
      
      // Sale settings
      isOnSale: isOnSale === 'true',
      saleStartDate: saleStartDate ? new Date(saleStartDate) : undefined,
      saleEndDate: saleEndDate ? new Date(saleEndDate) : undefined,
      discountPercentage: discountPercentage ? parseFloat(discountPercentage) : undefined,
      
      // Inventory settings
      lowStockThreshold: lowStockThreshold ? parseInt(lowStockThreshold) : 5,
      trackInventory: trackInventory !== 'false',
      
      images,
    });

    await product.save();
    return Response.successResponseData(res, product, SUCCESS, "Product added successfully");
  } catch (err) {
    console.error('Error adding product:', err);
    
    // Handle duplicate key errors (MongoDB error code 11000)
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      const value = err.keyValue[field];
      
      if (field === 'sku') {
        return Response.errorResponseWithoutData(res, `Product with SKU "${value}" already exists. Please use a different SKU.`, FAIL);
      } else {
        return Response.errorResponseWithoutData(res, `A product with this ${field} already exists.`, FAIL);
      }
    }
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors).map(error => error.message);
      return Response.errorResponseWithoutData(res, `Validation error: ${validationErrors.join(', ')}`, FAIL);
    }
    
    // Handle other errors
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, description, category, subcategory, price, discountPrice, stock, minimumOrder, sku, status, seller,
      sale, location, brand, weight, rating, availability,
      metaTitle, metaDescription, keywords,
      features, tags,
      isOnSale, saleStartDate, saleEndDate, discountPercentage,
      lowStockThreshold, trackInventory
    } = req.body;

    // Validate required fields
    if (!name || !category || !price || !sku) {
      return Response.errorResponseWithoutData(res, "Missing required fields", FAIL);
    }

    // Validate price, stock, and minimum order are numbers
    if (isNaN(price) || isNaN(stock) || isNaN(minimumOrder)) {
      return Response.errorResponseWithoutData(res, "Price, stock, and minimum order must be valid numbers", FAIL);
    }

    // Validate minimum order quantity
    if (parseInt(minimumOrder) < 1) {
      return Response.errorResponseWithoutData(res, "Minimum order quantity must be at least 1", FAIL);
    }

    if (parseInt(minimumOrder) > parseInt(stock)) {
      return Response.errorResponseWithoutData(res, "Minimum order quantity cannot be greater than available stock", FAIL);
    }

    // Validate discount price
    if (discountPrice && parseFloat(discountPrice) > 0) {
      const regularPrice = parseFloat(price);
      const discountPriceValue = parseFloat(discountPrice);
      
      if (discountPriceValue >= regularPrice) {
        return Response.errorResponseWithoutData(res, "Discount price must be less than regular price", FAIL);
      }
      
      if (discountPriceValue <= 0) {
        return Response.errorResponseWithoutData(res, "Discount price must be greater than 0", FAIL);
      }
    }

    // Check if SKU already exists for another product
    const existingProduct = await Product.findOne({ sku: sku.trim(), _id: { $ne: id } });
    if (existingProduct) {
      return Response.errorResponseWithoutData(res, `Product with SKU "${sku.trim()}" already exists. Please use a different SKU.`, FAIL);
    }

    // Process arrays from comma-separated strings
    const keywordsArray = keywords ? keywords.split(',').map(k => k.trim()).filter(k => k) : [];
    const featuresArray = features ? features.split(',').map(f => f.trim()).filter(f => f) : [];
    const tagsArray = tags ? tags.split(',').map(t => t.trim()).filter(t => t) : [];

    const update = {
      name: name.trim(),
      description: description?.trim() || '',
      category,
      subcategory: subcategory || undefined,
      price: parseFloat(price),
      discountPrice: discountPrice ? parseFloat(discountPrice) : undefined,
      stock: parseInt(stock),
      minimumOrder: parseInt(minimumOrder),
      sku: sku.trim(),
      status: status || '1',
      
      // Product details
      sale: sale || '',
      location: location || 'Online',
      brand: brand || '',
      weight: weight || '',
      rating: rating ? parseFloat(rating) : 0,
      availability: availability || 'Available',
      
      // SEO fields
      metaTitle: metaTitle || '',
      metaDescription: metaDescription || '',
      keywords: keywordsArray,
      
      // Features and tags
      features: featuresArray,
      tags: tagsArray,
      
      // Sale settings
      isOnSale: isOnSale === 'true',
      saleStartDate: saleStartDate ? new Date(saleStartDate) : undefined,
      saleEndDate: saleEndDate ? new Date(saleEndDate) : undefined,
      discountPercentage: discountPercentage ? parseFloat(discountPercentage) : undefined,
      
      // Inventory settings
      lowStockThreshold: lowStockThreshold ? parseInt(lowStockThreshold) : 5,
      trackInventory: trackInventory !== 'false',
    };

    // Handle new images if uploaded
    if (req.files && req.files.length > 0) {
      console.log('📸 Processing uploaded files for edit:', req.files.length);
      update.images = req.files.map((file) => {
        const imagePath = `/uploads/products/${file.filename}`;
        console.log('📄 Image path for edit:', imagePath);
        return imagePath;
      });
    } else {
      console.log('📸 No files uploaded for edit');
    }

    const product = await Product.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return Response.errorResponseWithoutData(res, "Product not found", FAIL);
    }

    return Response.successResponseData(res, product, SUCCESS, "Product updated successfully");
  } catch (err) {
    console.error('Error updating product:', err);
    
    // Handle duplicate key errors (MongoDB error code 11000)
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      const value = err.keyValue[field];
      
      if (field === 'sku') {
        return Response.errorResponseWithoutData(res, `Product with SKU "${value}" already exists. Please use a different SKU.`, FAIL);
      } else {
        return Response.errorResponseWithoutData(res, `A product with this ${field} already exists.`, FAIL);
      }
    }
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors).map(error => error.message);
      return Response.errorResponseWithoutData(res, `Validation error: ${validationErrors.join(', ')}`, FAIL);
    }
    
    // Handle other errors
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return Response.errorResponseWithoutData(res, "Product not found", FAIL);
    }

    // Delete associated image files
    if (product.images?.length) {
      for (const imgPath of product.images) {
        const filePath = path.join(__dirname, "../../../public", imgPath);
        try {
          await fs.unlink(filePath);
        } catch (err) {
          console.warn(`Failed to delete image: ${filePath}`, err.message);
        }
      }
    }

    return Response.successResponseWithoutData(res, "Product deleted successfully", SUCCESS);
  } catch (err) {
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

const updateProductStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!product) {
      return Response.errorResponseWithoutData(res, "Product not found", FAIL);
    }

    return Response.successResponseData(res, product, SUCCESS, "Product status updated successfully");
  } catch (err) {
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

const checkSKUAvailability = async (req, res) => {
  try {
    const { sku, productId } = req.query;
    
    if (!sku) {
      return Response.errorResponseWithoutData(res, "SKU is required", FAIL);
    }

    let query = { sku: sku.trim() };
    
    // If editing a product, exclude it from the check
    if (productId) {
      query._id = { $ne: productId };
    }

    const existingProduct = await Product.findOne(query);
    
    return Response.successResponseData(res, {
      available: !existingProduct,
      sku: sku.trim()
    }, SUCCESS, existingProduct ? "SKU already exists" : "SKU is available");
  } catch (err) {
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

const generateSKU = async (req, res) => {
  try {
    const { baseSKU } = req.query;
    
    if (!baseSKU) {
      return Response.errorResponseWithoutData(res, "Base SKU is required", FAIL);
    }

    const uniqueSKU = await generateUniqueSKU(baseSKU);
    
    return Response.successResponseData(res, {
      sku: uniqueSKU
    }, SUCCESS, "Unique SKU generated successfully");
  } catch (err) {
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

// Get product analytics
const getProductAnalytics = async (req, res) => {
  try {
    const { timeFrame = '30d' } = req.query;
    console.log('📊 Product analytics request:', { timeFrame });

    // Calculate date range based on timeFrame
    const now = new Date();
    let startDate;
    
    switch (timeFrame) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Get basic product metrics
    const [
      totalProducts,
      activeProducts,
      lowStockProducts,
      outOfStockProducts,
      averageRating,
      totalReviews
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ status: '1' }),
      Product.countDocuments({ stock: { $lte: 5 } }),
      Product.countDocuments({ stock: 0 }),
      Product.aggregate([
        { $group: { _id: null, avgRating: { $avg: '$rating' } } }
      ]),
      Product.aggregate([
        { $group: { _id: null, totalReviews: { $sum: '$ratingsCount' } } }
      ])
    ]);

    // Get category performance
    const categoryPerformance = await Product.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categoryData'
        }
      },
      {
        $group: {
          _id: '$category',
          categoryName: { $first: '$categoryData.name' },
          products: { $sum: 1 },
          revenue: { $sum: { $multiply: ['$price', { $rand: {} }] } } // Mock revenue
        }
      },
      { $sort: { revenue: -1 } },
      { $limit: 5 }
    ]);

    // Get monthly sales trend (mock data for now)
    const monthlySales = [
      { month: 'Jan', sales: Math.floor(Math.random() * 200) + 100, revenue: Math.floor(Math.random() * 50000) + 20000 },
      { month: 'Feb', sales: Math.floor(Math.random() * 200) + 100, revenue: Math.floor(Math.random() * 50000) + 20000 },
      { month: 'Mar', sales: Math.floor(Math.random() * 200) + 100, revenue: Math.floor(Math.random() * 50000) + 20000 },
      { month: 'Apr', sales: Math.floor(Math.random() * 200) + 100, revenue: Math.floor(Math.random() * 50000) + 20000 },
      { month: 'May', sales: Math.floor(Math.random() * 200) + 100, revenue: Math.floor(Math.random() * 50000) + 20000 },
      { month: 'Jun', sales: Math.floor(Math.random() * 200) + 100, revenue: Math.floor(Math.random() * 50000) + 20000 }
    ];

    // Get stock levels
    const stockLevels = [
      { range: 'Out of Stock', count: outOfStockProducts, percentage: (outOfStockProducts / totalProducts) * 100 },
      { range: 'Low Stock (1-5)', count: lowStockProducts - outOfStockProducts, percentage: ((lowStockProducts - outOfStockProducts) / totalProducts) * 100 },
      { range: 'In Stock (6-20)', count: Math.floor(totalProducts * 0.3), percentage: 30 },
      { range: 'Well Stocked (20+)', count: Math.floor(totalProducts * 0.5), percentage: 50 }
    ];

    // Get rating distribution
    const ratingDistribution = await Product.aggregate([
      {
        $group: {
          _id: { $floor: '$rating' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': -1 } }
    ]);

    // Get top selling products (mock data)
    const topSellingProducts = await Product.aggregate([
      { $sample: { size: 5 } },
      {
        $project: {
          name: 1,
          sales: { $floor: { $multiply: [{ $rand: {} }, 1000] } },
          revenue: { $multiply: ['$price', { $floor: { $multiply: [{ $rand: {} }, 100] } }] },
          rating: 1
        }
      },
      { $sort: { sales: -1 } }
    ]);

    const analytics = {
      totalProducts,
      activeProducts,
      lowStockProducts,
      outOfStockProducts,
      totalRevenue: monthlySales.reduce((sum, item) => sum + item.revenue, 0),
      averageRating: averageRating[0]?.avgRating || 0,
      totalReviews: totalReviews[0]?.totalReviews || 0,
      topSellingProducts,
      categoryPerformance,
      monthlySales,
      stockLevels,
      ratingDistribution
    };

    console.log('✅ Product analytics calculated:', analytics);
    return Response.successResponseData(res, analytics, SUCCESS, "Product analytics retrieved successfully");

  } catch (error) {
    console.error('❌ Error in getProductAnalytics:', error);
    return Response.errorResponseWithoutData(res, "Failed to retrieve product analytics", INTERNAL_SERVER);
  }
};

module.exports = {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
  updateProductStatus,
  checkSKUAvailability,
  generateSKU,
  getProductAnalytics,
};
