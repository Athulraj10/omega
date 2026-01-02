const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const { User, Order, Product, Category, Address } = require("./../models");
const logger = require("../logger/logger");
const { ACTIVE } = require("../services/Constants");

const createOrders = async () => {
  try {
    const url = process.env.MONGO_CONNECTION_STRING;
    logger.info("Connecting to database for order seeding...");

    const mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(url, mongooseOptions);

    mongoose.connection.once("open", async () => {
      logger.info("Connected to database for order seeding");

      // Get real users, products, and categories from database
      const users = await User.find({ role: "user", status: ACTIVE }).limit(10);
      const products = await Product.find({ status: ACTIVE }).populate('category');
      const categories = await Category.find({ status: ACTIVE });

      if (users.length === 0) {
        logger.error("No users found. Please run userSeeder first.");
        return;
      }

      if (products.length === 0) {
        logger.error("No products found. Please run product seeder first.");
        return;
      }

      logger.info(`Found ${users.length} users, ${products.length} products, ${categories.length} categories`);

      // Create realistic shipping addresses for users
      const shippingAddresses = [
        {
          label: "Home",
          addressLine1: "123 Main Street",
          addressLine2: "Apt 4B",
          city: "New York",
          state: "NY",
          postalCode: "10001",
          country: "USA",
          phone: "+1-555-0123"
        },
        {
          label: "Work",
          addressLine1: "456 Business Ave",
          addressLine2: "Suite 200",
          city: "Los Angeles",
          state: "CA",
          postalCode: "90210",
          country: "USA",
          phone: "+1-555-0456"
        },
        {
          label: "Home",
          addressLine1: "789 Oak Drive",
          addressLine2: "",
          city: "Chicago",
          state: "IL",
          postalCode: "60601",
          country: "USA",
          phone: "+1-555-0789"
        },
        {
          label: "Home",
          addressLine1: "321 Pine Street",
          addressLine2: "Unit 15",
          city: "Miami",
          state: "FL",
          postalCode: "33101",
          country: "USA",
          phone: "+1-555-0321"
        },
        {
          label: "Work",
          addressLine1: "654 Tech Boulevard",
          addressLine2: "Floor 3",
          city: "San Francisco",
          state: "CA",
          postalCode: "94102",
          country: "USA",
          phone: "+1-555-0654"
        },
        {
          label: "Home",
          addressLine1: "987 Maple Lane",
          addressLine2: "",
          city: "Seattle",
          state: "WA",
          postalCode: "98101",
          country: "USA",
          phone: "+1-555-0987"
        },
        {
          label: "Home",
          addressLine1: "147 Elm Court",
          addressLine2: "Apt 7C",
          city: "Boston",
          state: "MA",
          postalCode: "02101",
          country: "USA",
          phone: "+1-555-0147"
        },
        {
          label: "Work",
          addressLine1: "258 Commerce Street",
          addressLine2: "Office 12",
          city: "Dallas",
          state: "TX",
          postalCode: "75201",
          country: "USA",
          phone: "+1-555-0258"
        }
      ];

      // Order statuses with realistic probabilities
      const orderStatuses = [
        { status: 'delivered', weight: 0.4 },
        { status: 'shipped', weight: 0.25 },
        { status: 'processing', weight: 0.2 },
        { status: 'pending', weight: 0.1 },
        { status: 'cancelled', weight: 0.03 },
        { status: 'returned', weight: 0.02 }
      ];

      // Payment statuses
      const paymentStatuses = [
        { status: 'paid', weight: 0.85 },
        { status: 'pending', weight: 0.12 },
        { status: 'failed', weight: 0.03 }
      ];

      // Helper function to get weighted random choice
      const getWeightedRandom = (options) => {
        const totalWeight = options.reduce((sum, option) => sum + option.weight, 0);
        let random = Math.random() * totalWeight;
        
        for (const option of options) {
          random -= option.weight;
          if (random <= 0) {
            return option.status;
          }
        }
        return options[0].status;
      };

      // Helper function to get random date within range
      const getRandomDate = (start, end) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      };

      // Generate orders for the last 90 days
      const orders = [];
      const now = new Date();
      const startDate = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000)); // 90 days ago

      // Generate 200-300 orders over the last 90 days
      const totalOrders = Math.floor(Math.random() * 100) + 200;
      
      for (let i = 0; i < totalOrders; i++) {
        const orderDate = getRandomDate(startDate, now);
        const user = users[Math.floor(Math.random() * users.length)];
        const shippingAddress = shippingAddresses[Math.floor(Math.random() * shippingAddresses.length)];
        
        // Generate 1-4 items per order
        const numItems = Math.floor(Math.random() * 4) + 1;
        const orderItems = [];
        let totalAmount = 0;

        // Create order items
        for (let j = 0; j < numItems; j++) {
          const product = products[Math.floor(Math.random() * products.length)];
          const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 items
          const priceAtPurchase = product.discountPrice || product.price;
          
          orderItems.push({
            product: product._id,
            quantity: quantity,
            priceAtPurchase: priceAtPurchase
          });
          
          totalAmount += priceAtPurchase * quantity;
        }

        // Determine order status based on date
        let orderStatus, paymentStatus;
        const daysSinceOrder = Math.floor((now - orderDate) / (24 * 60 * 60 * 1000));
        
        if (daysSinceOrder < 1) {
          // Recent orders are more likely to be pending/processing
          orderStatus = Math.random() < 0.7 ? 'pending' : 'processing';
          paymentStatus = Math.random() < 0.8 ? 'pending' : 'paid';
        } else if (daysSinceOrder < 7) {
          // Orders from this week
          orderStatus = getWeightedRandom([
            { status: 'processing', weight: 0.4 },
            { status: 'shipped', weight: 0.4 },
            { status: 'delivered', weight: 0.15 },
            { status: 'pending', weight: 0.05 }
          ]);
          paymentStatus = Math.random() < 0.9 ? 'paid' : 'pending';
        } else {
          // Older orders
          orderStatus = getWeightedRandom(orderStatuses);
          paymentStatus = getWeightedRandom(paymentStatuses);
        }

        const order = {
          user: user._id,
          items: orderItems,
          shippingAddress: shippingAddress,
          status: orderStatus,
          paymentStatus: paymentStatus,
          totalAmount: Math.round(totalAmount * 100) / 100, // Round to 2 decimal places
          createdAt: orderDate,
          updatedAt: orderDate
        };

        orders.push(order);
      }

      // Clear existing orders (optional - comment out if you want to keep existing orders)
      // await Order.deleteMany({});
      // logger.info("Cleared existing orders");

      // Insert orders
      await Order.insertMany(orders);
      logger.info(`Created ${orders.length} realistic orders`);

      // Create some recent orders for today and yesterday
      const recentOrders = [];
      const today = new Date();
      const yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));

      // 5-10 orders for today
      const todayOrders = Math.floor(Math.random() * 6) + 5;
      for (let i = 0; i < todayOrders; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const product = products[Math.floor(Math.random() * products.length)];
        const quantity = Math.floor(Math.random() * 2) + 1;
        const priceAtPurchase = product.discountPrice || product.price;
        const totalAmount = priceAtPurchase * quantity;

        const order = {
          user: user._id,
          items: [{
            product: product._id,
            quantity: quantity,
            priceAtPurchase: priceAtPurchase
          }],
          shippingAddress: shippingAddresses[Math.floor(Math.random() * shippingAddresses.length)],
          status: 'pending',
          paymentStatus: 'pending',
          totalAmount: Math.round(totalAmount * 100) / 100,
          createdAt: getRandomDate(today, new Date(today.getTime() + 24 * 60 * 60 * 1000)),
          updatedAt: today
        };

        recentOrders.push(order);
      }

      // 3-8 orders for yesterday
      const yesterdayOrders = Math.floor(Math.random() * 6) + 3;
      for (let i = 0; i < yesterdayOrders; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const product = products[Math.floor(Math.random() * products.length)];
        const quantity = Math.floor(Math.random() * 2) + 1;
        const priceAtPurchase = product.discountPrice || product.price;
        const totalAmount = priceAtPurchase * quantity;

        const order = {
          user: user._id,
          items: [{
            product: product._id,
            quantity: quantity,
            priceAtPurchase: priceAtPurchase
          }],
          shippingAddress: shippingAddresses[Math.floor(Math.random() * shippingAddresses.length)],
          status: Math.random() < 0.7 ? 'processing' : 'pending',
          paymentStatus: Math.random() < 0.8 ? 'paid' : 'pending',
          totalAmount: Math.round(totalAmount * 100) / 100,
          createdAt: getRandomDate(yesterday, today),
          updatedAt: yesterday
        };

        recentOrders.push(order);
      }

      await Order.insertMany(recentOrders);
      logger.info(`Created ${recentOrders.length} recent orders for today and yesterday`);

      // Log summary
      const totalOrderCount = await Order.countDocuments();
      const deliveredOrders = await Order.countDocuments({ status: 'delivered' });
      const pendingOrders = await Order.countDocuments({ status: 'pending' });
      const totalRevenue = await Order.aggregate([
        { $match: { status: { $in: ['delivered', 'shipped', 'processing'] } } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]);

      logger.info("=== Order Seeding Summary ===");
      logger.info(`Total orders in database: ${totalOrderCount}`);
      logger.info(`Delivered orders: ${deliveredOrders}`);
      logger.info(`Pending orders: ${pendingOrders}`);
      logger.info(`Total revenue: $${totalRevenue[0]?.total?.toFixed(2) || '0.00'}`);
      logger.info("Orders created successfully!");

      // Close the connection
      mongoose.connection.close();
    });
  } catch (error) {
    logger.error("Error creating orders:", error);
  }
};

createOrders();