const mongoose = require("mongoose");

const productSettingsSchema = new mongoose.Schema(
  {
    // Inventory Defaults
    defaultLowStockThreshold: {
      type: Number,
      default: 5,
      min: 0,
    },
    defaultTrackInventory: {
      type: Boolean,
      default: true,
    },
    defaultMinimumOrder: {
      type: Number,
      default: 1,
      min: 1,
    },
    defaultStock: {
      type: Number,
      default: 0,
      min: 0,
    },

    // SKU Settings
    skuPrefix: {
      type: String,
      default: "",
      maxLength: 10,
    },
    autoGenerateSku: {
      type: Boolean,
      default: false,
    },
    skuFormat: {
      type: String,
      enum: ["sequential", "random", "category-prefix"],
      default: "sequential",
    },

    // Image Settings
    maxImagesPerProduct: {
      type: Number,
      default: 10,
      min: 1,
      max: 20,
    },
    maxImageSize: {
      type: Number,
      default: 5242880, // 5MB in bytes
    },
    allowedImageFormats: {
      type: [String],
      default: ["jpg", "jpeg", "png", "gif", "webp"],
    },

    // Product Defaults
    defaultStatus: {
      type: String,
      enum: ["1", "0"],
      default: "1",
    },
    defaultAvailability: {
      type: String,
      enum: ["Available", "Out of Stock", "Pre-order"],
      default: "Available",
    },
    defaultLocation: {
      type: String,
      default: "Online",
    },

    // SEO Defaults
    autoGenerateMetaTitle: {
      type: Boolean,
      default: false,
    },
    metaTitleTemplate: {
      type: String,
      default: "{productName} - {categoryName}",
    },
    autoGenerateMetaDescription: {
      type: Boolean,
      default: false,
    },

    // Review Settings
    allowReviews: {
      type: Boolean,
      default: true,
    },
    requireApprovalForReviews: {
      type: Boolean,
      default: false,
    },
    minimumRating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },

    // Discount Settings
    allowDiscountPercentage: {
      type: Boolean,
      default: true,
    },
    maxDiscountPercentage: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },
    allowSaleDates: {
      type: Boolean,
      default: true,
    },

    // Category Settings
    requireCategory: {
      type: Boolean,
      default: true,
    },
    allowMultipleCategories: {
      type: Boolean,
      default: false,
    },

    // Brand Settings
    requireBrand: {
      type: Boolean,
      default: false,
    },
    allowCustomBrand: {
      type: Boolean,
      default: true,
    },

    // Weight and Dimensions
    requireWeight: {
      type: Boolean,
      default: false,
    },
    weightUnit: {
      type: String,
      enum: ["kg", "g", "lb", "oz"],
      default: "kg",
    },

    // Product Features
    maxFeatures: {
      type: Number,
      default: 10,
      min: 0,
    },
    maxTags: {
      type: Number,
      default: 10,
      min: 0,
    },

    // Notification Settings
    notifyOnLowStock: {
      type: Boolean,
      default: true,
    },
    notifyOnOutOfStock: {
      type: Boolean,
      default: true,
    },
    lowStockEmailRecipients: {
      type: [String],
      default: [],
    },

    // Audit Settings
    trackInventoryChanges: {
      type: Boolean,
      default: true,
    },
    trackPriceChanges: {
      type: Boolean,
      default: false,
    },

    // Last updated by
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Create a singleton document - only one settings document exists
productSettingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model("ProductSettings", productSettingsSchema);













