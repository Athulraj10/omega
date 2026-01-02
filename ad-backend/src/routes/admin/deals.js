const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Deal = require('../../models/deal');
const {
  addDeal,
  getAllDeals,
  getDealById,
  updateDeal,
  deleteDeal,
  getActiveDeals,
  getDealStats,
  bulkUpdateDeals
} = require('../../controllers/admin/dealController');
const { adminTokenAuth } = require('../../middlewares/admin');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/deals';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Apply authentication middleware to all routes
// router.use(adminTokenAuth);

// Create new deal
router.post('/add', adminTokenAuth, upload.array('images', 5), addDeal);

// Get all deals with pagination and filters
router.get('/list', adminTokenAuth, getAllDeals);

// Get deal by ID
router.get('/:id', adminTokenAuth, getDealById);

// Update deal
router.put('/:id', adminTokenAuth, upload.array('images', 5), updateDeal);

// Delete deal
router.delete('/:id', adminTokenAuth, deleteDeal);

// Get active deals
router.get('/active/list', adminTokenAuth, getActiveDeals);

// Get deal statistics
router.get('/stats/overview', adminTokenAuth, getDealStats);

// Bulk update deals
router.put('/bulk/update', adminTokenAuth, bulkUpdateDeals);

// Get deals by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const deals = await Deal.find({ 
      category: { $regex: category, $options: 'i' },
      isActive: true 
    })
    .populate('createdBy', 'name email')
    .populate('seller', 'companyName userName')
    .populate('category', 'name description icon')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

    const total = await Deal.countDocuments({ 
      category: { $regex: category, $options: 'i' },
      isActive: true 
    });

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
    res.status(500).json({
      success: false,
      message: 'Error fetching deals by category',
      error: error.message
    });
  }
});

// Get featured deals
router.get('/featured/list', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const deals = await Deal.find({ 
      isFeatured: true,
      isActive: true 
    })
    .populate('createdBy', 'name email')
    .populate('seller', 'companyName userName')
    .populate('category', 'name description icon')
    .sort({ createdAt: -1 })
    .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: deals
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured deals',
      error: error.message
    });
  }
});

// Get expiring deals (deals ending within 7 days)
router.get('/expiring/list', async (req, res) => {
  try {
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const deals = await Deal.find({
      endDate: { $gte: now, $lte: sevenDaysFromNow },
      isActive: true
    })
    .populate('createdBy', 'name email')
    .populate('seller', 'companyName userName')
    .populate('category', 'name description icon')
    .sort({ endDate: 1 });

    res.status(200).json({
      success: true,
      data: deals
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching expiring deals',
      error: error.message
    });
  }
});

// Get upcoming deals (deals starting in the future)
router.get('/upcoming/list', async (req, res) => {
  try {
    const now = new Date();
    
    const deals = await Deal.find({
      startDate: { $gt: now },
      isActive: true
    })
    .populate('createdBy', 'name email')
    .populate('seller', 'companyName userName')
    .populate('category', 'name description icon')
    .sort({ startDate: 1 });

    res.status(200).json({
      success: true,
      data: deals
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching upcoming deals',
      error: error.message
    });
  }
});

// Search deals
router.get('/search/query', async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const deals = await Deal.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { brand: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ],
      isActive: true
    })
    .populate('createdBy', 'name email')
    .populate('seller', 'companyName userName')
    .populate('category', 'name description icon')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

    const total = await Deal.countDocuments({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { brand: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ],
      isActive: true
    });

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
    res.status(500).json({
      success: false,
      message: 'Error searching deals',
      error: error.message
    });
  }
});

// Toggle deal status (active/inactive)
router.patch('/:id/toggle-status', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deal = await Deal.findById(id);
    if (!deal) {
      return res.status(404).json({
        success: false,
        message: 'Deal not found'
      });
    }

    deal.isActive = !deal.isActive;
    await deal.save();

    res.status(200).json({
      success: true,
      message: `Deal ${deal.isActive ? 'activated' : 'deactivated'} successfully`,
      data: deal
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling deal status',
      error: error.message
    });
  }
});

// Toggle featured status
router.patch('/:id/toggle-featured', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deal = await Deal.findById(id);
    if (!deal) {
      return res.status(404).json({
        success: false,
        message: 'Deal not found'
      });
    }

    deal.isFeatured = !deal.isFeatured;
    await deal.save();

    res.status(200).json({
      success: true,
      message: `Deal ${deal.isFeatured ? 'marked as featured' : 'unmarked as featured'} successfully`,
      data: deal
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling featured status',
      error: error.message
    });
  }
});

module.exports = router; 