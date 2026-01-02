const Order = require("../../models/order");
const User = require("../../models/user");
const Product = require("../../models/product");
const Response = require("../../services/Response");

const SUCCESS = 200;
const FAIL = 400;
const INTERNAL_SERVER = 500;

// Get all orders with pagination, filtering, and sorting
const getOrders = async (req, res) => {
  try {
    console.log('🔄 Fetching orders...');
    
    const {
      page = 1,
      limit = 10,
      status,
      paymentStatus,
      search,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (status) {
      filter.orderStatus = status;
    }
    
    if (paymentStatus) {
      filter.paymentStatus = paymentStatus;
    }
    
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // Build search query
    if (search) {
      filter.$or = [
        { 'shippingAddress.addressLine1': { $regex: search, $options: 'i' } },
        { 'shippingAddress.city': { $regex: search, $options: 'i' } },
        { 'shippingAddress.state': { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Get orders with populated data
    const orders = await Order.find(filter)
      .populate('user', 'first_name last_name email userName')
      .populate('items.product', 'name price images sku')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalOrders = await Order.countDocuments(filter);
    const totalPages = Math.ceil(totalOrders / parseInt(limit));

    // Calculate summary statistics
    const summary = await Order.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$total' },
          averageOrderValue: { $avg: '$total' }
        }
      }
    ]);

    const result = {
      orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalOrders,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      },
      summary: summary[0] || {
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0
      }
    };

    console.log('📋 Fetched orders:', orders.length);
    return Response.successResponseData(res, result, SUCCESS, "Orders fetched successfully");
  } catch (err) {
    console.error('❌ Error fetching orders:', err);
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

// Get single order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findById(id)
      .populate('user', 'first_name last_name email userName mobile_no')
      .populate('items.product', 'name price images sku description category')
      .populate('items.product.category', 'name');

    if (!order) {
      return Response.errorResponseWithoutData(res, "Order not found", FAIL);
    }

    return Response.successResponseData(res, order, SUCCESS, "Order fetched successfully");
  } catch (err) {
    console.error('❌ Error fetching order:', err);
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

// Create new order (admin can create orders manually)
const createOrder = async (req, res) => {
  try {
    const {
      user,
      items,
      shippingAddress,
      billingAddress,
      paymentMethod = 'cash_on_delivery',
      paymentStatus = 'pending',
      orderStatus = 'pending',
      shippingMethod = 'free',
      shippingCost = 0,
      subtotal,
      tax = 0,
      discount = 0,
      total,
      notes
    } = req.body;

    // Validate required fields
    if (!user || !items || !shippingAddress || !total) {
      return Response.errorResponseWithoutData(res, "Missing required fields", FAIL);
    }

    // Validate user exists
    const userExists = await User.findById(user);
    if (!userExists) {
      return Response.errorResponseWithoutData(res, "User not found", FAIL);
    }

    // Validate items and products
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return Response.errorResponseWithoutData(res, `Product with ID ${item.product} not found`, FAIL);
      }
      
      if (product.stock < item.quantity) {
        return Response.errorResponseWithoutData(res, `Insufficient stock for product ${product.name}`, FAIL);
      }
    }

    // Create order
    const order = new Order({
      user,
      items,
      shippingAddress,
      billingAddress,
      paymentMethod,
      paymentStatus,
      orderStatus,
      shippingMethod,
      shippingCost,
      subtotal,
      tax,
      discount,
      total,
      notes
    });

    await order.save();

    // Update product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    // Populate the order for response
    const populatedOrder = await Order.findById(order._id)
      .populate('user', 'first_name last_name email userName')
      .populate('items.product', 'name price images sku');

    return Response.successResponseData(res, populatedOrder, SUCCESS, "Order created successfully");
  } catch (err) {
    console.error('❌ Error creating order:', err);
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus } = req.body;

    const updateData = {};
    if (status) updateData.orderStatus = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const order = await Order.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('user', 'first_name last_name email userName')
     .populate('items.product', 'name price images sku');

    if (!order) {
      return Response.errorResponseWithoutData(res, "Order not found", FAIL);
    }

    return Response.successResponseData(res, order, SUCCESS, "Order status updated successfully");
  } catch (err) {
    console.error('❌ Error updating order status:', err);
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

// Update order details
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      items,
      shippingAddress,
      billingAddress,
      total,
      orderStatus,
      paymentStatus
    } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return Response.errorResponseWithoutData(res, "Order not found", FAIL);
    }

    // If items are being updated, handle stock changes
    if (items) {
      // Restore original stock
      for (const originalItem of order.items) {
        await Product.findByIdAndUpdate(originalItem.product, {
          $inc: { stock: originalItem.quantity }
        });
      }

      // Validate new items and update stock
      for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product) {
          return Response.errorResponseWithoutData(res, `Product with ID ${item.product} not found`, FAIL);
        }
        
        if (product.stock < item.quantity) {
          return Response.errorResponseWithoutData(res, `Insufficient stock for product ${product.name}`, FAIL);
        }

        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity }
        });
      }
    }

    // Update order
    const updateData = {};
    if (items) updateData.items = items;
    if (shippingAddress) updateData.shippingAddress = shippingAddress;
    if (billingAddress) updateData.billingAddress = billingAddress;
    if (total) updateData.total = parseFloat(total);
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('user', 'first_name last_name email userName')
     .populate('items.product', 'name price images sku');

    return Response.successResponseData(res, updatedOrder, SUCCESS, "Order updated successfully");
  } catch (err) {
    console.error('❌ Error updating order:', err);
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return Response.errorResponseWithoutData(res, "Order not found", FAIL);
    }

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity }
      });
    }

    await Order.findByIdAndDelete(id);

    return Response.successResponseWithoutData(res, "Order deleted successfully", SUCCESS);
  } catch (err) {
    console.error('❌ Error deleting order:', err);
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

// Get order analytics
const getOrderAnalytics = async (req, res) => {
  try {
    const { timeFrame = '30d' } = req.query;
    console.log('📊 Order analytics request:', { timeFrame });

    // Calculate date range
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

    // Get basic metrics
    const [
      totalOrders,
      totalRevenue,
      averageOrderValue,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders
    ] = await Promise.all([
      Order.countDocuments({ createdAt: { $gte: startDate } }),
      Order.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ]),
      Order.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        { $group: { _id: null, average: { $avg: '$total' } } }
      ]),
      Order.countDocuments({ orderStatus: 'pending', createdAt: { $gte: startDate } }),
      Order.countDocuments({ orderStatus: 'processing', createdAt: { $gte: startDate } }),
      Order.countDocuments({ orderStatus: 'shipped', createdAt: { $gte: startDate } }),
      Order.countDocuments({ orderStatus: 'delivered', createdAt: { $gte: startDate } }),
      Order.countDocuments({ orderStatus: 'cancelled', createdAt: { $gte: startDate } })
    ]);

    // Get daily order trend
    const dailyOrders = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
              {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            orders: { $sum: 1 },
            revenue: { $sum: '$total' }
          }
        },
      { $sort: { _id: 1 } }
    ]);

    // Get status distribution
    const statusDistribution = [
      { status: 'Pending', count: pendingOrders, percentage: (pendingOrders / totalOrders) * 100 },
      { status: 'Processing', count: processingOrders, percentage: (processingOrders / totalOrders) * 100 },
      { status: 'Shipped', count: shippedOrders, percentage: (shippedOrders / totalOrders) * 100 },
      { status: 'Delivered', count: deliveredOrders, percentage: (deliveredOrders / totalOrders) * 100 },
      { status: 'Cancelled', count: cancelledOrders, percentage: (cancelledOrders / totalOrders) * 100 }
    ];

    // Get top customers
    const topCustomers = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
              {
          $group: {
            _id: '$user',
            totalOrders: { $sum: 1 },
            totalSpent: { $sum: '$total' }
          }
        },
      { $sort: { totalSpent: -1 } },
      { $limit: 5 },
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
          user: { $arrayElemAt: ['$userData', 0] },
          totalOrders: 1,
          totalSpent: 1
        }
      }
    ]);

    // Get top products by order count
    const topProducts = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      { $unwind: '$items' },
              {
          $group: {
            _id: '$items.product',
            orderCount: { $sum: '$items.quantity' },
            totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
          }
        },
      { $sort: { orderCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productData'
        }
      },
      {
        $project: {
          product: { $arrayElemAt: ['$productData', 0] },
          orderCount: 1,
          totalRevenue: 1
        }
      }
    ]);

    const analytics = {
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      averageOrderValue: averageOrderValue[0]?.average || 0,
      statusDistribution,
      dailyOrders,
      topCustomers,
      topProducts
    };

    console.log('✅ Order analytics calculated');
    return Response.successResponseData(res, analytics, SUCCESS, "Order analytics retrieved successfully");

  } catch (error) {
    console.error('❌ Error in getOrderAnalytics:', error);
    return Response.errorResponseWithoutData(res, "Failed to retrieve order analytics", INTERNAL_SERVER);
  }
};

// Bulk update order statuses
const bulkUpdateOrderStatus = async (req, res) => {
  try {
    const { orderIds, status, paymentStatus } = req.body;

    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
      return Response.errorResponseWithoutData(res, "Order IDs are required", FAIL);
    }

    const updateData = {};
    if (status) updateData.orderStatus = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const result = await Order.updateMany(
      { _id: { $in: orderIds } },
      updateData
    );

    return Response.successResponseData(res, {
      updatedCount: result.modifiedCount,
      totalRequested: orderIds.length
    }, SUCCESS, `${result.modifiedCount} orders updated successfully`);
  } catch (err) {
    console.error('❌ Error in bulk update:', err);
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

// Export orders to CSV
const exportOrders = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;

    const filter = {};
    if (status) filter.orderStatus = status;
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const orders = await Order.find(filter)
      .populate('user', 'first_name last_name email')
      .populate('items.product', 'name sku')
      .sort({ createdAt: -1 });

    // Convert to CSV format
    const csvData = orders.map(order => ({
      'Order ID': order._id,
      'Customer Name': `${order.user?.first_name || ''} ${order.user?.last_name || ''}`,
      'Customer Email': order.user?.email || '',
      'Status': order.orderStatus,
      'Payment Status': order.paymentStatus,
      'Total Amount': order.total,
      'Items': order.items.map(item => `${item.product?.name} (${item.quantity})`).join('; '),
      'Shipping Address': `${order.shippingAddress.addressLine1}, ${order.shippingAddress.city}, ${order.shippingAddress.state}`,
      'Order Date': order.createdAt.toISOString().split('T')[0]
    }));

    return Response.successResponseData(res, csvData, SUCCESS, "Orders exported successfully");
  } catch (err) {
    console.error('❌ Error exporting orders:', err);
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  updateOrder,
  deleteOrder,
  getOrderAnalytics,
  bulkUpdateOrderStatus,
  exportOrders
};