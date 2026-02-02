const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema(
  {
    // Contact Information
    address: {
      type: String,
      maxLength: 255,
      default: "Abu Dhabi, UAE",
    },
    email: {
      type: String,
      maxLength: 255,
      default: "omegaseafoods.general@gmail.com",
    },
    phone: {
      type: String,
      maxLength: 50,
      default: "+971 55 545 1188",
    },
    // Quick Links
    quickLinks: [
      {
        title: {
          type: String,
          required: true,
          maxLength: 100,
        },
        url: {
          type: String,
          required: true,
          maxLength: 255,
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],
    // Menu Items
    menuItems: [
      {
        title: {
          type: String,
          required: true,
          maxLength: 100,
        },
        url: {
          type: String,
          required: true,
          maxLength: 255,
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],
    operatingHours: {
      weekdays: {
        type: String,
        maxLength: 100,
        default: "24 Hours",
      },
    },
    // Footer Bottom
    copyrightText: {
      type: String,
      maxLength: 255,
      default: "© All Copyright 2024 by Omega Foods",
    },
    companyName: {
      type: String,
      maxLength: 100,
      default: "Omega Foods",
    },
    // Background Image
    backgroundImage: {
      type: String,
      maxLength: 255,
      default: "/assets/img/footer/footer.png",
    },
    // Status
    status: {
      type: String,
      enum: ["1", "0"],
      default: "1", // 1 = active, 0 = inactive
    },
    createDate: "date",
    updatedDate: "date",
  },
  { timestamps: { createDate: "createdAt", updatedDate: "updated_at" } }
);

// Ensure only one footer document exists
footerSchema.statics.getFooter = async function() {
  let footer = await this.findOne();
  if (!footer) {
    // Create default footer if none exists
    footer = await this.create({
      quickLinks: [
        { title: "About Us", url: "/about", order: 1 },
        { title: "FAQ'S", url: "/faq", order: 2 },
        { title: "Contact Us", url: "/contact", order: 3 },
      ],
      menuItems: [
        { title: "Seafood", url: "/shop", order: 1 },
        { title: "Fruits", url: "/shop", order: 2 },
        { title: "Spices", url: "/shop", order: 3 },
        { title: "Vegetable", url: "/shop", order: 4 },
      ],
    });
  }
  return footer;
};

module.exports = mongoose.model("Footer", footerSchema);

