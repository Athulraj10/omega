const mongoose = require("mongoose");

const taxRateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    rate: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    country: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    postalCode: {
      type: String,
      trim: true,
    },
    taxType: {
      type: String,
      enum: ["standard", "reduced", "zero", "exempt"],
      default: "standard",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    priority: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const taxSettingsSchema = new mongoose.Schema(
  {
    // Tax Calculation Method
    taxCalculationMethod: {
      type: String,
      enum: ["inclusive", "exclusive", "auto"],
      default: "exclusive",
    },

    // Default Tax Rate
    defaultTaxRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // Tax Rates
    taxRates: [taxRateSchema],

    // Tax Classes
    taxClasses: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        taxRateIds: [{
          type: String,
        }],
      },
    ],

    // Tax Exemptions
    taxExemptUserGroups: [
      {
        type: String,
        enum: ["wholesale", "b2b", "government", "non-profit"],
      },
    ],

    // Tax on Shipping
    taxOnShipping: {
      type: Boolean,
      default: false,
    },
    taxOnShippingRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // Tax Display
    displayPricesWithTax: {
      type: Boolean,
      default: false,
    },
    showTaxInCart: {
      type: Boolean,
      default: true,
    },
    showTaxOnCheckout: {
      type: Boolean,
      default: true,
    },
    showTaxInEmails: {
      type: Boolean,
      default: true,
    },

    // EU VAT Settings
    euVatEnabled: {
      type: Boolean,
      default: false,
    },
    euVatNumber: {
      type: String,
      trim: true,
    },
    validateEuVatNumber: {
      type: Boolean,
      default: false,
    },

    // Tax Reports
    generateTaxReports: {
      type: Boolean,
      default: true,
    },
    taxReportFrequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "quarterly", "yearly"],
      default: "monthly",
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
taxSettingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model("TaxSettings", taxSettingsSchema);

