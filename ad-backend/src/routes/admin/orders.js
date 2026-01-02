const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/admin/orderController");
const { adminTokenAuth } = require("../../middlewares/admin");

// Apply admin middleware to all routes
router.use(adminTokenAuth);

// Get all orders with pagination, filtering, and sorting
router.get("/", orderController.getOrders);

// Get single order by ID
router.get("/:id", orderController.getOrderById);

// Create new order (admin can create orders manually)
router.post("/", orderController.createOrder);

// Update order status
router.patch("/:id/status", orderController.updateOrderStatus);

// Update order details
router.put("/:id", orderController.updateOrder);

// Delete order
router.delete("/:id", orderController.deleteOrder);

// Get order analytics
router.get("/analytics/overview", orderController.getOrderAnalytics);

// Bulk update order statuses
router.patch("/bulk/status", orderController.bulkUpdateOrderStatus);

// Export orders to CSV
router.get("/export/csv", orderController.exportOrders);

module.exports = router;