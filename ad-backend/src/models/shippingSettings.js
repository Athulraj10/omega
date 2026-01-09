const mongoose = require("mongoose");

const shippingZoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    countries: [{
      type: String,
      trim: true,
    }],
    states: [{
      type: String,
      trim: true,
    }],
    postalCodes: [{
      type: String,
      trim: true,
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const shippingMethodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    methodType: {
      type: String,
      enum: ["free", "flat_rate", "weight_based", "price_based", "local_pickup", "express"],
      default: "flat_rate",
    },
    zone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShippingZone",
    },
    cost: {
      type: Number,
      default: 0,
      min: 0,
    },
    freeShippingThreshold: {
      type: Number,
      default: 0,
      min: 0,
    },
    weightRanges: [{
      minWeight: { type: Number, default: 0 },
      maxWeight: { type: Number },
      cost: { type: Number, required: true },
    }],
    priceRanges: [{
      minPrice: { type: Number, default: 0 },
      maxPrice: { type: Number },
      cost: { type: Number, required: true },
    }],
    estimatedDeliveryDays: {
      min: { type: Number, default: 3 },
      max: { type: Number, default: 7 },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const shippingSettingsSchema = new mongoose.Schema(
  {
    // Shipping Zones
    shippingZones: [shippingZoneSchema],

    // Shipping Methods
    shippingMethods: [shippingMethodSchema],

    // Default Settings
    defaultShippingMethod: {
      type: String,
      enum: ["free", "standard", "express"],
      default: "free",
    },
    defaultShippingCost: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Free Shipping
    enableFreeShipping: {
      type: Boolean,
      default: true,
    },
    freeShippingMinimumOrder: {
      type: Number,
      default: 0,
      min: 0,
    },
    freeShippingForAll: {
      type: Boolean,
      default: false,
    },

    // Weight-based Shipping
    enableWeightBasedShipping: {
      type: Boolean,
      default: false,
    },
    weightUnit: {
      type: String,
      enum: ["kg", "g", "lb", "oz"],
      default: "kg",
    },
    baseWeight: {
      type: Number,
      default: 1,
      min: 0,
    },
    baseShippingCost: {
      type: Number,
      default: 0,
      min: 0,
    },
    additionalWeightCost: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Price-based Shipping
    enablePriceBasedShipping: {
      type: Boolean,
      default: false,
    },
    priceBasedShippingRates: [{
      minOrderValue: { type: Number, default: 0 },
      maxOrderValue: { type: Number },
      shippingCost: { type: Number, required: true },
    }],

    // Packaging
    defaultPackageWeight: {
      type: Number,
      default: 0.5,
      min: 0,
    },
    defaultPackageDimensions: {
      length: { type: Number, default: 20 },
      width: { type: Number, default: 15 },
      height: { type: Number, default: 10 },
      unit: { type: String, enum: ["cm", "inch"], default: "cm" },
    },

    // Processing Time
    defaultProcessingTime: {
      type: Number,
      default: 1,
      min: 0,
    },
    processingTimeUnit: {
      type: String,
      enum: ["hours", "days"],
      default: "days",
    },

    // Delivery Settings
    showEstimatedDelivery: {
      type: Boolean,
      default: true,
    },
    deliveryTimeBuffer: {
      type: Number,
      default: 1,
      min: 0,
    },

    // International Shipping
    enableInternationalShipping: {
      type: Boolean,
      default: true,
    },
    internationalShippingMultiplier: {
      type: Number,
      default: 1.5,
      min: 1,
    },
    restrictedCountries: [{
      type: String,
      trim: true,
    }],

    // Local Pickup
    enableLocalPickup: {
      type: Boolean,
      default: false,
    },
    localPickupLocations: [{
      name: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String },
      hours: { type: String },
      cost: { type: Number, default: 0 },
    }],

    // Shipping Restrictions
    restrictByWeight: {
      type: Boolean,
      default: false,
    },
    maxShippingWeight: {
      type: Number,
      default: 0,
    },
    restrictByDimensions: {
      type: Boolean,
      default: false,
    },
    maxDimensions: {
      length: { type: Number, default: 0 },
      width: { type: Number, default: 0 },
      height: { type: Number, default: 0 },
    },

    // Notification Settings
    notifyOnShipment: {
      type: Boolean,
      default: true,
    },
    trackingNumberRequired: {
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

// Create a singleton document
shippingSettingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model("ShippingSettings", shippingSettingsSchema);

