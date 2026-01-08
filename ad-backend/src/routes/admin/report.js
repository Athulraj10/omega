const express = require("express");
const router = express.Router();
const reportController = require("../../controllers/admin/reportController");
const { adminTokenAuth } = require("../../middlewares/admin");

// Report Routes
router.get("/sales", adminTokenAuth, reportController.getSalesReports);
router.get("/products", adminTokenAuth, reportController.getProductPerformanceReports);
router.get("/customers", adminTokenAuth, reportController.getCustomerAnalyticsReports);
router.get("/inventory", adminTokenAuth, reportController.getInventoryReports);

module.exports = router;

