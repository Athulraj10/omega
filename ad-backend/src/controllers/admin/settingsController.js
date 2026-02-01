const ProductSettings = require("../../models/productSettings");
const TaxSettings = require("../../models/taxSettings");
const ShippingSettings = require("../../models/shippingSettings");
const Response = require("../../services/Response");
const Constants = require("../../services/Constants");

// ==================== PRODUCT SETTINGS ====================

// Get Product Settings
const getProductSettings = async (req, res) => {
  try {
    const settings = await ProductSettings.getSettings();
    return Response.successResponseData(
      res,
      settings,
      Constants.SUCCESS,
      "Product settings retrieved successfully"
    );
  } catch (error) {
    console.error("❌ Get product settings error:", error);
    return Response.errorResponseWithoutData(
      res,
      "Failed to retrieve product settings",
      Constants.INTERNAL_SERVER
    );
  }
};

// Update Product Settings
const updateProductSettings = async (req, res) => {
  try {
    const updateData = req.body;
    updateData.updatedBy = req.authAdminId;

    let settings = await ProductSettings.findOne();
    if (!settings) {
      settings = await ProductSettings.create(updateData);
    } else {
      settings = await ProductSettings.findByIdAndUpdate(
        settings._id,
        updateData,
        { new: true, runValidators: true }
      );
    }

    return Response.successResponseData(
      res,
      settings,
      Constants.SUCCESS,
      "Product settings updated successfully"
    );
  } catch (error) {
    console.error("❌ Update product settings error:", error);
    return Response.errorResponseWithoutData(
      res,
      error.message || "Failed to update product settings",
      Constants.INTERNAL_SERVER
    );
  }
};

// ==================== TAX SETTINGS ====================

// Get Tax Settings
const getTaxSettings = async (req, res) => {
  try {
    const settings = await TaxSettings.getSettings();
    return Response.successResponseData(
      res,
      settings,
      Constants.SUCCESS,
      "Tax settings retrieved successfully"
    );
  } catch (error) {
    console.error("❌ Get tax settings error:", error);
    return Response.errorResponseWithoutData(
      res,
      "Failed to retrieve tax settings",
      Constants.INTERNAL_SERVER
    );
  }
};

// Update Tax Settings
const updateTaxSettings = async (req, res) => {
  try {
    const updateData = req.body;
    updateData.updatedBy = req.authAdminId;

    let settings = await TaxSettings.findOne();
    if (!settings) {
      settings = await TaxSettings.create(updateData);
    } else {
      settings = await TaxSettings.findByIdAndUpdate(
        settings._id,
        updateData,
        { new: true, runValidators: true }
      );
    }

    return Response.successResponseData(
      res,
      settings,
      Constants.SUCCESS,
      "Tax settings updated successfully"
    );
  } catch (error) {
    console.error("❌ Update tax settings error:", error);
    return Response.errorResponseWithoutData(
      res,
      error.message || "Failed to update tax settings",
      Constants.INTERNAL_SERVER
    );
  }
};

// Add Tax Rate
const addTaxRate = async (req, res) => {
  try {
    const taxRateData = req.body;
    const settings = await TaxSettings.getSettings();
    
    settings.taxRates.push(taxRateData);
    await settings.save();

    return Response.successResponseData(
      res,
      settings,
      Constants.SUCCESS,
      "Tax rate added successfully"
    );
  } catch (error) {
    console.error("❌ Add tax rate error:", error);
    return Response.errorResponseWithoutData(
      res,
      error.message || "Failed to add tax rate",
      Constants.INTERNAL_SERVER
    );
  }
};

// Update Tax Rate
const updateTaxRate = async (req, res) => {
  try {
    const { rateId } = req.params;
    const updateData = req.body;
    
    const settings = await TaxSettings.getSettings();
    const taxRate = settings.taxRates.id(rateId);
    
    if (!taxRate) {
      return Response.errorResponseWithoutData(
        res,
        "Tax rate not found",
        Constants.NOT_FOUND
      );
    }

    Object.assign(taxRate, updateData);
    await settings.save();

    return Response.successResponseData(
      res,
      settings,
      Constants.SUCCESS,
      "Tax rate updated successfully"
    );
  } catch (error) {
    console.error("❌ Update tax rate error:", error);
    return Response.errorResponseWithoutData(
      res,
      error.message || "Failed to update tax rate",
      Constants.INTERNAL_SERVER
    );
  }
};

// Delete Tax Rate
const deleteTaxRate = async (req, res) => {
  try {
    const { rateId } = req.params;
    const settings = await TaxSettings.getSettings();
    
    settings.taxRates.id(rateId).remove();
    await settings.save();

    return Response.successResponseData(
      res,
      settings,
      Constants.SUCCESS,
      "Tax rate deleted successfully"
    );
  } catch (error) {
    console.error("❌ Delete tax rate error:", error);
    return Response.errorResponseWithoutData(
      res,
      error.message || "Failed to delete tax rate",
      Constants.INTERNAL_SERVER
    );
  }
};

// ==================== SHIPPING SETTINGS ====================

// Get Shipping Settings
const getShippingSettings = async (req, res) => {
  try {
    const settings = await ShippingSettings.getSettings();
    return Response.successResponseData(
      res,
      settings,
      Constants.SUCCESS,
      "Shipping settings retrieved successfully"
    );
  } catch (error) {
    console.error("❌ Get shipping settings error:", error);
    return Response.errorResponseWithoutData(
      res,
      "Failed to retrieve shipping settings",
      Constants.INTERNAL_SERVER
    );
  }
};

// Update Shipping Settings
const updateShippingSettings = async (req, res) => {
  try {
    const updateData = req.body;
    updateData.updatedBy = req.authAdminId;

    let settings = await ShippingSettings.findOne();
    if (!settings) {
      settings = await ShippingSettings.create(updateData);
    } else {
      settings = await ShippingSettings.findByIdAndUpdate(
        settings._id,
        updateData,
        { new: true, runValidators: true }
      );
    }

    return Response.successResponseData(
      res,
      settings,
      Constants.SUCCESS,
      "Shipping settings updated successfully"
    );
  } catch (error) {
    console.error("❌ Update shipping settings error:", error);
    return Response.errorResponseWithoutData(
      res,
      error.message || "Failed to update shipping settings",
      Constants.INTERNAL_SERVER
    );
  }
};

// Add Shipping Zone
const addShippingZone = async (req, res) => {
  try {
    const zoneData = req.body;
    const settings = await ShippingSettings.getSettings();
    
    settings.shippingZones.push(zoneData);
    await settings.save();

    return Response.successResponseData(
      res,
      settings,
      Constants.SUCCESS,
      "Shipping zone added successfully"
    );
  } catch (error) {
    console.error("❌ Add shipping zone error:", error);
    return Response.errorResponseWithoutData(
      res,
      error.message || "Failed to add shipping zone",
      Constants.INTERNAL_SERVER
    );
  }
};

// Update Shipping Zone
const updateShippingZone = async (req, res) => {
  try {
    const { zoneId } = req.params;
    const updateData = req.body;
    
    const settings = await ShippingSettings.getSettings();
    const zone = settings.shippingZones.id(zoneId);
    
    if (!zone) {
      return Response.errorResponseWithoutData(
        res,
        "Shipping zone not found",
        Constants.NOT_FOUND
      );
    }

    Object.assign(zone, updateData);
    await settings.save();

    return Response.successResponseData(
      res,
      settings,
      Constants.SUCCESS,
      "Shipping zone updated successfully"
    );
  } catch (error) {
    console.error("❌ Update shipping zone error:", error);
    return Response.errorResponseWithoutData(
      res,
      error.message || "Failed to update shipping zone",
      Constants.INTERNAL_SERVER
    );
  }
};

// Delete Shipping Zone
const deleteShippingZone = async (req, res) => {
  try {
    const { zoneId } = req.params;
    const settings = await ShippingSettings.getSettings();
    
    settings.shippingZones.id(zoneId).remove();
    await settings.save();

    return Response.successResponseData(
      res,
      settings,
      Constants.SUCCESS,
      "Shipping zone deleted successfully"
    );
  } catch (error) {
    console.error("❌ Delete shipping zone error:", error);
    return Response.errorResponseWithoutData(
      res,
      error.message || "Failed to delete shipping zone",
      Constants.INTERNAL_SERVER
    );
  }
};

// Add Shipping Method
const addShippingMethod = async (req, res) => {
  try {
    const methodData = req.body;
    const settings = await ShippingSettings.getSettings();
    
    settings.shippingMethods.push(methodData);
    await settings.save();

    return Response.successResponseData(
      res,
      settings,
      Constants.SUCCESS,
      "Shipping method added successfully"
    );
  } catch (error) {
    console.error("❌ Add shipping method error:", error);
    return Response.errorResponseWithoutData(
      res,
      error.message || "Failed to add shipping method",
      Constants.INTERNAL_SERVER
    );
  }
};

// Update Shipping Method
const updateShippingMethod = async (req, res) => {
  try {
    const { methodId } = req.params;
    const updateData = req.body;
    
    const settings = await ShippingSettings.getSettings();
    const method = settings.shippingMethods.id(methodId);
    
    if (!method) {
      return Response.errorResponseWithoutData(
        res,
        "Shipping method not found",
        Constants.NOT_FOUND
      );
    }

    Object.assign(method, updateData);
    await settings.save();

    return Response.successResponseData(
      res,
      settings,
      Constants.SUCCESS,
      "Shipping method updated successfully"
    );
  } catch (error) {
    console.error("❌ Update shipping method error:", error);
    return Response.errorResponseWithoutData(
      res,
      error.message || "Failed to update shipping method",
      Constants.INTERNAL_SERVER
    );
  }
};

// Delete Shipping Method
const deleteShippingMethod = async (req, res) => {
  try {
    const { methodId } = req.params;
    const settings = await ShippingSettings.getSettings();
    
    settings.shippingMethods.id(methodId).remove();
    await settings.save();

    return Response.successResponseData(
      res,
      settings,
      Constants.SUCCESS,
      "Shipping method deleted successfully"
    );
  } catch (error) {
    console.error("❌ Delete shipping method error:", error);
    return Response.errorResponseWithoutData(
      res,
      error.message || "Failed to delete shipping method",
      Constants.INTERNAL_SERVER
    );
  }
};

module.exports = {
  // Product Settings
  getProductSettings,
  updateProductSettings,
  
  // Tax Settings
  getTaxSettings,
  updateTaxSettings,
  addTaxRate,
  updateTaxRate,
  deleteTaxRate,
  
  // Shipping Settings
  getShippingSettings,
  updateShippingSettings,
  addShippingZone,
  updateShippingZone,
  deleteShippingZone,
  addShippingMethod,
  updateShippingMethod,
  deleteShippingMethod,
};




























