const { User } = require("../../models/user");
const Product = require("../../models/product");
const Response = require("../../services/Response");
const { ROLES } = require("../../services/Constants");

const SUCCESS = 200;
const FAIL = 400;
const INTERNAL_SERVER = 500;

const getSellers = async (req, res) => {
  try {
    const sellers = await User.find({ role: ROLES.SELLER.name }).sort({ createdAt: -1 });
    return Response.successResponseData(res, sellers, SUCCESS, "Seller list fetched successfully");
  } catch (err) {
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

const addSeller = async (req, res) => {
  try {
    const { companyName, name, email, phone, address, status } = req.body;

    if (!companyName || !name || !email || !phone) {
      return Response.errorResponseWithoutData(res, "Missing required fields", FAIL);
    }

    // Check for duplicate email
    const existingEmail = await User.findOne({ email, role: ROLES.SELLER.name });
    if (existingEmail) {
      return Response.errorResponseWithoutData(res, "Email already exists for a seller", FAIL);
    }

    // Company name can be repeated - no duplicate check needed

    const seller = new User({
      companyName,
      address,
      userName: name,
      email,
      mobile_no: phone,
      role: ROLES.SELLER.name,
      roleLevel: ROLES.SELLER.level,
      status,
    });

    await seller.save();
    return Response.successResponseData(res, seller, SUCCESS, "Seller added successfully");
  } catch (err) {
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

const editSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyName, userName, email, mobile_no, address, status, password } = req.body;
    
    console.log('Edit seller request:', { id, body: req.body });
    
    // Validate required fields
    if (!companyName || !userName || !email) {
      return Response.errorResponseWithoutData(res, "Company name, user name, and email are required", FAIL);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.errorResponseWithoutData(res, "Invalid email format", FAIL);
    }
    
    // Check if seller exists
    const existingSeller = await User.findById(id);
    if (!existingSeller || existingSeller.role !== ROLES.SELLER.name) {
      return Response.errorResponseWithoutData(res, "Seller not found", FAIL);
    }

    // Check for duplicate email
    console.log('Checking for duplicate email:', { email, id });
    const existingEmail = await User.findOne({
      email,
      role: ROLES.SELLER.name,
      _id: { $ne: id },
    });
    console.log('Existing email found:', existingEmail);
    if (existingEmail) {
      return Response.errorResponseWithoutData(res, "Email already exists for another seller", FAIL);
    }

    // Company name can be repeated - no duplicate check needed

    // Prepare update data
    const updateData = {
      companyName,
      address,
      userName,
      email,
      status,
    };

    // Handle mobile number conversion
    if (mobile_no !== undefined && mobile_no !== null && mobile_no !== '') {
      if (mobile_no.toString().trim()) {
        const mobileNumber = Number(mobile_no);
        if (!isNaN(mobileNumber) && mobileNumber > 0) {
          updateData.mobile_no = mobileNumber;
        } else {
          return Response.errorResponseWithoutData(res, "Invalid mobile number format", FAIL);
        }
      } else {
        // If empty string, set to null/undefined to remove the field
        updateData.mobile_no = undefined;
      }
    }

    // Hash password if provided
    if (password && password.trim()) {
      const bcrypt = require('bcrypt');
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
      updateData.passwordText = password; // Store plain text for reference
    }

    console.log('Update data:', updateData);

    const seller = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!seller) {
      return Response.errorResponseWithoutData(res, "Failed to update seller", FAIL);
    }

    return Response.successResponseData(res, seller, SUCCESS, "Seller updated successfully");
  } catch (err) {
    console.error('Edit seller error:', err);
    
    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors).map((error) => error.message);
      return Response.errorResponseWithoutData(res, `Validation error: ${validationErrors.join(', ')}`, FAIL);
    }
    
    // Handle duplicate key errors
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return Response.errorResponseWithoutData(res, `${field} already exists`, FAIL);
    }
    
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

const deleteSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await User.findByIdAndDelete(id);

    if (!seller || seller.role !== ROLES.SELLER.name) {
      return Response.errorResponseWithoutData(res, "Seller not found", FAIL);
    }

    return Response.successResponseWithoutData(res, "Seller deleted successfully", SUCCESS);
  } catch (err) {
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

const getSellerProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.find({ seller: id });

    return Response.successResponseData(res, products, SUCCESS, "Seller products fetched successfully");
  } catch (err) {
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

const getSellerReports = async (req, res) => {
  try {
    // TODO: Add logic for actual reports
    return Response.successResponseData(res, {}, SUCCESS, "Seller reports fetched successfully");
  } catch (err) {
    return Response.errorResponseData(res, err.message, INTERNAL_SERVER);
  }
};

module.exports = {
  getSellers,
  addSeller,
  editSeller,
  deleteSeller,
  getSellerProducts,
  getSellerReports,
};
