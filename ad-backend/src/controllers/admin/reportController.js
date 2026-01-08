const Order = require("../../models/order");
const Product = require("../../models/product");
const { User } = require("../../models/user");
const Category = require("../../models/category");
const Response = require("../../services/Response");
const Constants = require("../../services/Constants");
const { ROLES } = require("../../services/Constants");
const mongoose = require("mongoose");

// Get Sales Reports
const getSalesReports = async (req, res) => {
  try {
    const { startDate, endDate, period = '30' } = req.query;
    
    let dateFilter = {};
    
    if (startDate && endDate) {
      dateFilter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    } else {
      // Default to last N days
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - parseInt(period));
      dateFilter.createdAt = { $gte: daysAgo };
    }

    // Total Sales Summary
    const salesSummary = await Order.aggregate([
      { $match: { ...dateFilter, status: 'completed' } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
          totalOrders: { $sum: 1 },
          averageOrderValue: { $avg: '$totalAmount' },
          minOrderValue: { $min: '$totalAmount' },
          maxOrderValue: { $max: '$totalAmount' }
        }
      }
    ]);

    // Sales by Status
    const salesByStatus = await Order.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: '$orderStatus',
          count: { $sum: 1 },
          totalAmount: { $sum: '$totalAmount' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Sales by Payment Method
    const salesByPayment = await Order.aggregate([
      { $match: { ...dateFilter, status: 'completed' } },
      {
        $group: {
          _id: '$paymentMethod',
          count: { $sum: 1 },
          totalAmount: { $sum: '$totalAmount' }
        }
      },
      { $sort: { totalAmount: -1 } }
    ]);

    // Daily Sales Trend
    const dailyTrend = await Order.aggregate([
      { $match: { ...dateFilter, status: 'completed' } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    // Monthly Sales Trend
    const monthlyTrend = await Order.aggregate([
      { $match: { ...dateFilter, status: 'completed' } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Top Customers
    const topCustomers = await Order.aggregate([
      { $match: { ...dateFilter, status: 'completed' } },
      {
        $group: {
          _id: '$user',
          totalSpent: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userData'
        }
      },
      {
        $project: {
          userId: '$_id',
          totalSpent: 1,
          orderCount: 1,
          name: { $arrayElemAt: ['$userData.first_name', 0] },
          email: { $arrayElemAt: ['$userData.email', 0] }
        }
      }
    ]);

    return Response.successResponseData(
      res,
      {
        summary: salesSummary[0] || {
          totalRevenue: 0,
          totalOrders: 0,
          averageOrderValue: 0,
          minOrderValue: 0,
          maxOrderValue: 0
        },
        salesByStatus: salesByStatus,
        salesByPayment: salesByPayment,
        dailyTrend: dailyTrend.map(item => ({
          date: `${item._id.year}-${String(item._id.month).padStart(2, '0')}-${String(item._id.day).padStart(2, '0')}`,
          revenue: item.revenue,
          orders: item.orders
        })),
        monthlyTrend: monthlyTrend.map(item => ({
          month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
          revenue: item.revenue,
          orders: item.orders
        })),
        topCustomers: topCustomers
      },
      Constants.SUCCESS,
      "Sales reports retrieved successfully"
    );

  } catch (error) {
    console.error('❌ Sales reports error:', error);
    return Response.errorResponseWithoutData(
      res,
      "Failed to retrieve sales reports",
      Constants.INTERNAL_SERVER
    );
  }
};

// Get Product Performance Reports
const getProductPerformanceReports = async (req, res) => {
  try {
    const { startDate, endDate, period = '30', category, sortBy = 'revenue' } = req.query;
    
    let dateFilter = {};
    
    if (startDate && endDate) {
      dateFilter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    } else {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - parseInt(period));
      dateFilter.createdAt = { $gte: daysAgo };
    }

    // Get completed orders with products
    const orders = await Order.find({
      ...dateFilter,
      status: 'completed'
    }).populate('items.product', 'name category price images');

    // Calculate product performance
    const productMap = new Map();
    
    orders.forEach(order => {
      order.items.forEach(item => {
        if (item.product) {
          const productId = item.product._id.toString();
          
          if (!productMap.has(productId)) {
            productMap.set(productId, {
              productId: item.product._id,
              productName: item.product.name,
              category: item.product.category,
              images: item.product.images,
              revenue: 0,
              unitsSold: 0,
              orderCount: 0,
              averagePrice: item.product.price || 0
            });
          }
          
          const productData = productMap.get(productId);
          productData.revenue += item.price * item.quantity;
          productData.unitsSold += item.quantity;
          productData.orderCount += 1;
        }
      });
    });

    // Convert map to array and sort
    let products = Array.from(productMap.values());
    
    // Filter by category if provided
    if (category) {
      products = products.filter(p => 
        p.category && p.category.toString() === category
      );
    }

    // Sort products
    products.sort((a, b) => {
      if (sortBy === 'revenue') return b.revenue - a.revenue;
      if (sortBy === 'units') return b.unitsSold - a.unitsSold;
      if (sortBy === 'orders') return b.orderCount - a.orderCount;
      return b.revenue - a.revenue;
    });

    // Top Products
    const topProducts = products.slice(0, 10);

    // Performance by Category
    const categoryMap = new Map();
    products.forEach(product => {
      const categoryId = product.category ? product.category.toString() : 'uncategorized';
      if (!categoryMap.has(categoryId)) {
        categoryMap.set(categoryId, {
          categoryId: product.category,
          revenue: 0,
          unitsSold: 0,
          productCount: 0
        });
      }
      const catData = categoryMap.get(categoryId);
      catData.revenue += product.revenue;
      catData.unitsSold += product.unitsSold;
      catData.productCount += 1;
    });

    const categoryPerformance = Array.from(categoryMap.values());

    // Product Trends (top 10 products over time)
    const productTrends = await Order.aggregate([
      { $match: { ...dateFilter, status: 'completed' } },
      { $unwind: '$items' },
      {
        $group: {
          _id: {
            product: '$items.product',
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
          units: { $sum: '$items.quantity' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, revenue: -1 } },
      { $limit: 100 }
    ]);

    return Response.successResponseData(
      res,
      {
        topProducts: topProducts,
        categoryPerformance: categoryPerformance,
        productTrends: productTrends.map(item => ({
          productId: item._id.product,
          month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
          revenue: item.revenue,
          units: item.units
        })),
        totalProducts: products.length,
        summary: {
          totalRevenue: products.reduce((sum, p) => sum + p.revenue, 0),
          totalUnitsSold: products.reduce((sum, p) => sum + p.unitsSold, 0),
          averageRevenuePerProduct: products.length > 0 
            ? products.reduce((sum, p) => sum + p.revenue, 0) / products.length 
            : 0
        }
      },
      Constants.SUCCESS,
      "Product performance reports retrieved successfully"
    );

  } catch (error) {
    console.error('❌ Product performance reports error:', error);
    return Response.errorResponseWithoutData(
      res,
      "Failed to retrieve product performance reports",
      Constants.INTERNAL_SERVER
    );
  }
};

// Get Customer Analytics Reports
const getCustomerAnalyticsReports = async (req, res) => {
  try {
    const { startDate, endDate, period = '30' } = req.query;
    
    let dateFilter = {};
    
    if (startDate && endDate) {
      dateFilter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    } else {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - parseInt(period));
      dateFilter.createdAt = { $gte: daysAgo };
    }

    // Total Customers Summary
    const totalCustomers = await User.countDocuments({ 
      role: ROLES.USER.name,
      status: '1'
    });

    const newCustomers = await User.countDocuments({
      role: ROLES.USER.name,
      status: '1',
      ...dateFilter
    });

    // Customer Lifetime Value
    const customerLTV = await Order.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: '$user',
          totalSpent: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 },
          averageOrderValue: { $avg: '$totalAmount' },
          firstOrder: { $min: '$createdAt' },
          lastOrder: { $max: '$createdAt' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userData'
        }
      },
      {
        $project: {
          userId: '$_id',
          totalSpent: 1,
          orderCount: 1,
          averageOrderValue: 1,
          firstOrder: 1,
          lastOrder: 1,
          name: { $concat: [{ $arrayElemAt: ['$userData.first_name', 0] }, ' ', { $arrayElemAt: ['$userData.last_name', 0] }] },
          email: { $arrayElemAt: ['$userData.email', 0] },
          joinedDate: { $arrayElemAt: ['$userData.createdAt', 0] }
        }
      },
      { $sort: { totalSpent: -1 } }
    ]);

    // Top Customers
    const topCustomers = customerLTV.slice(0, 10);

    // Customer Segmentation
    const segments = {
      vip: customerLTV.filter(c => c.totalSpent >= 10000).length,
      regular: customerLTV.filter(c => c.totalSpent >= 1000 && c.totalSpent < 10000).length,
      new: customerLTV.filter(c => c.totalSpent < 1000).length
    };

    // Customer Acquisition Trend
    const acquisitionTrend = await User.aggregate([
      {
        $match: {
          role: ROLES.USER.name,
          status: '1',
          ...dateFilter
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Customer Order Distribution
    const orderDistribution = await Order.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: '$user',
          orderCount: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $lte: ['$orderCount', 1] }, '1',
              { $cond: [
                { $lte: ['$orderCount', 3] }, '2-3',
                { $cond: [
                  { $lte: ['$orderCount', 5] }, '4-5',
                  '6+'
                ]}
              ]}
            ]
          },
          customerCount: { $sum: 1 }
        }
      }
    ]);

    // Customer Retention (customers who ordered in both periods)
    const retentionData = await Order.aggregate([
      {
        $match: { status: 'completed' }
      },
      {
        $group: {
          _id: '$user',
          orderDates: { $push: '$createdAt' },
          orderCount: { $sum: 1 }
        }
      },
      {
        $project: {
          userId: '$_id',
          isReturning: { $gt: ['$orderCount', 1] },
          orderCount: 1
        }
      }
    ]);

    const returningCustomers = retentionData.filter(c => c.isReturning).length;
    const oneTimeCustomers = retentionData.filter(c => !c.isReturning).length;

    return Response.successResponseData(
      res,
      {
        summary: {
          totalCustomers,
          newCustomers,
          returningCustomers,
          oneTimeCustomers,
          averageLTV: customerLTV.length > 0
            ? customerLTV.reduce((sum, c) => sum + c.totalSpent, 0) / customerLTV.length
            : 0
        },
        topCustomers: topCustomers,
        segments: segments,
        acquisitionTrend: acquisitionTrend.map(item => ({
          month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
          count: item.count
        })),
        orderDistribution: orderDistribution,
        retention: {
          returningRate: retentionData.length > 0
            ? (returningCustomers / retentionData.length) * 100
            : 0,
          returningCustomers,
          oneTimeCustomers
        }
      },
      Constants.SUCCESS,
      "Customer analytics reports retrieved successfully"
    );

  } catch (error) {
    console.error('❌ Customer analytics reports error:', error);
    return Response.errorResponseWithoutData(
      res,
      "Failed to retrieve customer analytics reports",
      Constants.INTERNAL_SERVER
    );
  }
};

// Get Inventory Reports
const getInventoryReports = async (req, res) => {
  try {
    const { category, status, stockFilter } = req.query;
    
    let filter = {};
    
    if (category) {
      filter.category = new mongoose.Types.ObjectId(category);
    }
    
    if (status) {
      filter.status = status;
    }

    if (stockFilter === 'low') {
      filter.$expr = { $lte: ['$stock', '$lowStockThreshold'] };
    } else if (stockFilter === 'out') {
      filter.stock = { $lte: 0 };
    } else if (stockFilter === 'in') {
      filter.$expr = { $gt: ['$stock', '$lowStockThreshold'] };
    }

    // Get all products with inventory data
    const products = await Product.find(filter)
      .populate('category', 'name')
      .populate('seller', 'companyName')
      .select('name sku stock lowStockThreshold price category seller status updatedAt');

    // Inventory Summary
    const inventorySummary = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          totalStock: { $sum: '$stock' },
          totalValue: { $sum: { $multiply: ['$stock', '$price'] } },
          lowStockCount: {
            $sum: {
              $cond: [
                { $lte: ['$stock', { $ifNull: ['$lowStockThreshold', 5] }] },
                1,
                0
              ]
            }
          },
          outOfStockCount: {
            $sum: {
              $cond: [
                { $lte: ['$stock', 0] },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    // Inventory by Category
    const inventoryByCategory = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          productCount: { $sum: 1 },
          totalStock: { $sum: '$stock' },
          totalValue: { $sum: { $multiply: ['$stock', '$price'] } },
          lowStockCount: {
            $sum: {
              $cond: [
                { $lte: ['$stock', { $ifNull: ['$lowStockThreshold', 5] }] },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'categoryData'
        }
      },
      {
        $project: {
          categoryId: '$_id',
          categoryName: { $arrayElemAt: ['$categoryData.name', 0] },
          productCount: 1,
          totalStock: 1,
          totalValue: 1,
          lowStockCount: 1
        }
      },
      { $sort: { totalValue: -1 } }
    ]);

    // Low Stock Products
    const lowStockProducts = await Product.find({
      $expr: { $lte: ['$stock', { $ifNull: ['$lowStockThreshold', 5] }] }
    })
      .populate('category', 'name')
      .select('name sku stock lowStockThreshold price category')
      .sort({ stock: 1 })
      .limit(20);

    // Out of Stock Products
    const outOfStockProducts = await Product.find({
      stock: { $lte: 0 }
    })
      .populate('category', 'name')
      .select('name sku stock price category')
      .limit(20);

    // Stock Movement Trend (requires order history)
    const stockMovement = await Order.aggregate([
      {
        $match: { status: 'completed' }
      },
      { $unwind: '$items' },
      {
        $group: {
          _id: {
            product: '$items.product',
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          unitsSold: { $sum: '$items.quantity' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 50 }
    ]);

    return Response.successResponseData(
      res,
      {
        summary: inventorySummary[0] || {
          totalProducts: 0,
          totalStock: 0,
          totalValue: 0,
          lowStockCount: 0,
          outOfStockCount: 0
        },
        inventoryByCategory: inventoryByCategory,
        lowStockProducts: lowStockProducts.map(p => ({
          _id: p._id,
          name: p.name,
          sku: p.sku,
          stock: p.stock,
          lowStockThreshold: p.lowStockThreshold || 5,
          price: p.price,
          category: p.category
        })),
        outOfStockProducts: outOfStockProducts.map(p => ({
          _id: p._id,
          name: p.name,
          sku: p.sku,
          stock: p.stock,
          price: p.price,
          category: p.category
        })),
        stockMovement: stockMovement.map(item => ({
          productId: item._id.product,
          month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
          unitsSold: item.unitsSold
        })),
        products: products.map(p => ({
          _id: p._id,
          name: p.name,
          sku: p.sku,
          stock: p.stock,
          lowStockThreshold: p.lowStockThreshold || 5,
          price: p.price,
          category: p.category,
          seller: p.seller,
          status: p.status,
          isLowStock: (p.stock || 0) <= (p.lowStockThreshold || 5),
          isOutOfStock: (p.stock || 0) <= 0,
          lastUpdated: p.updatedAt
        }))
      },
      Constants.SUCCESS,
      "Inventory reports retrieved successfully"
    );

  } catch (error) {
    console.error('❌ Inventory reports error:', error);
    return Response.errorResponseWithoutData(
      res,
      "Failed to retrieve inventory reports",
      Constants.INTERNAL_SERVER
    );
  }
};

module.exports = {
  getSalesReports,
  getProductPerformanceReports,
  getCustomerAnalyticsReports,
  getInventoryReports
};

