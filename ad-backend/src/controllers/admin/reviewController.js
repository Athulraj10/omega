const Review = require("../../models/review");
const Product = require("../../models/product");
const User = require("../../models/user");
const Response = require("../../services/Response");

const SUCCESS = 200;
const FAIL = 400;
const INTERNAL_SERVER = 500;

// Get all reviews with pagination, filtering, and sorting
const getReviews = async (req, res) => {
  try {
    console.log('🔄 Fetching reviews...');
    
    const {
      page = 1,
      limit = 10,
      productId,
      rating,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (productId) {
      filter.product = productId;
    }
    
    if (rating) {
      filter.rating = parseInt(rating);
    }
    
    if (search) {
      filter.$or = [
        { comment: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Get reviews with populated data
    const reviews = await Review.find(filter)
      .populate('user', 'first_name last_name email userName profile_pic')
      .populate('product', 'name sku images price')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalReviews = await Review.countDocuments(filter);
    const totalPages = Math.ceil(totalReviews / parseInt(limit));

    // Calculate summary statistics
    const stats = await Review.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalReviews: { $sum: 1 },
          averageRating: { $avg: '$rating' },
          ratingCounts: {
            $push: '$rating'
          }
        }
      }
    ]);

    // Calculate rating breakdown
    const ratingBreakdown = await Review.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } }
    ]);

    const breakdown = {};
    ratingBreakdown.forEach(item => {
      breakdown[item._id] = item.count;
    });

    const result = {
      reviews,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalReviews,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      },
      stats: {
        totalReviews: stats[0]?.totalReviews || 0,
        averageRating: stats[0]?.averageRating ? parseFloat(stats[0].averageRating.toFixed(2)) : 0,
        ratingBreakdown: breakdown
      }
    };

    console.log('📋 Fetched reviews:', reviews.length);
    return Response.successResponseData(res, result, SUCCESS, "Reviews fetched successfully");
  } catch (err) {
    console.error('❌ Error fetching reviews:', err);
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

// Get single review by ID
const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const review = await Review.findById(id)
      .populate('user', 'first_name last_name email userName profile_pic')
      .populate('product', 'name sku images price');
    
    if (!review) {
      return Response.errorResponseWithoutData(res, "Review not found", FAIL);
    }
    
    return Response.successResponseData(res, review, SUCCESS, "Review fetched successfully");
  } catch (err) {
    console.error('❌ Error fetching review:', err);
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

// Delete review
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    
    const review = await Review.findById(id);
    if (!review) {
      return Response.errorResponseWithoutData(res, "Review not found", FAIL);
    }
    
    await Review.findByIdAndDelete(id);
    
    return Response.successResponseWithoutData(res, "Review deleted successfully", SUCCESS);
  } catch (err) {
    console.error('❌ Error deleting review:', err);
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

module.exports = {
  getReviews,
  getReviewById,
  deleteReview
};

