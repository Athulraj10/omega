const express = require("express");
const router = express.Router();
const settingsController = require("../../controllers/admin/settingsController");
const { adminTokenAuth } = require("../../middlewares/admin");

// Product Settings Routes
router.get("/products", adminTokenAuth, settingsController.getProductSettings);
router.put("/products", adminTokenAuth, settingsController.updateProductSettings);

// Tax Settings Routes
router.get("/tax", adminTokenAuth, settingsController.getTaxSettings);
router.put("/tax", adminTokenAuth, settingsController.updateTaxSettings);
router.post("/tax/rates", adminTokenAuth, settingsController.addTaxRate);
router.put("/tax/rates/:rateId", adminTokenAuth, settingsController.updateTaxRate);
router.delete("/tax/rates/:rateId", adminTokenAuth, settingsController.deleteTaxRate);

// Shipping Settings Routes
router.get("/shipping", adminTokenAuth, settingsController.getShippingSettings);
router.put("/shipping", adminTokenAuth, settingsController.updateShippingSettings);
router.post("/shipping/zones", adminTokenAuth, settingsController.addShippingZone);
router.put("/shipping/zones/:zoneId", adminTokenAuth, settingsController.updateShippingZone);
router.delete("/shipping/zones/:zoneId", adminTokenAuth, settingsController.deleteShippingZone);
router.post("/shipping/methods", adminTokenAuth, settingsController.addShippingMethod);
router.put("/shipping/methods/:methodId", adminTokenAuth, settingsController.updateShippingMethod);
router.delete("/shipping/methods/:methodId", adminTokenAuth, settingsController.deleteShippingMethod);

module.exports = router;














