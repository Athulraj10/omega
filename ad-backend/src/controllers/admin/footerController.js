const { Footer } = require('../../models');
const Constants = require('../../services/Constants');
const Response = require('../../services/Response');
const { mediaUrl } = require('../../services/S3Bucket');

module.exports = {
  // Get Footer (Public endpoint - no auth required)
  async getFooter(req, res) {
    try {
      const footer = await Footer.getFooter();
      
      if (!footer) {
        return Response.errorResponseWithoutData(
          res,
          "Footer not found",
          Constants.NOT_FOUND
        );
      }

      // Format response
      const footerData = {
        address: footer.address,
        email: footer.email,
        phone: footer.phone,
        quickLinks: footer.quickLinks || [],
        menuItems: footer.menuItems || [],
        operatingHours: footer.operatingHours || {},
        copyrightText: footer.copyrightText,
        companyName: footer.companyName,
        backgroundImage: footer.backgroundImage,
        status: footer.status,
      };

      return Response.successResponseData(
        res,
        footerData,
        Constants.SUCCESS,
        "Footer data retrieved successfully"
      );
    } catch (error) {
      console.error('Error getting footer:', error);
      return Response.errorResponseWithoutData(
        res,
        "Failed to retrieve footer data",
        Constants.INTERNAL_SERVER
      );
    }
  },

  // Get Footer for Admin (with full details)
  async getFooterAdmin(req, res) {
    try {
      const footer = await Footer.getFooter();
      
      if (!footer) {
        return Response.errorResponseWithoutData(
          res,
          "Footer not found",
          Constants.NOT_FOUND
        );
      }

      return Response.successResponseData(
        res,
        footer,
        Constants.SUCCESS,
        "Footer data retrieved successfully"
      );
    } catch (error) {
      console.error('Error getting footer:', error);
      return Response.errorResponseWithoutData(
        res,
        "Failed to retrieve footer data",
        Constants.INTERNAL_SERVER
      );
    }
  },

  // Update Footer
  async updateFooter(req, res) {
    try {
      const requestParams = req.body;
      const footer = await Footer.getFooter();

      if (!footer) {
        return Response.errorResponseWithoutData(
          res,
          "Footer not found",
          Constants.NOT_FOUND
        );
      }

      // Update fields
      if (requestParams.address !== undefined) {
        footer.address = requestParams.address;
      }
      if (requestParams.email !== undefined) {
        footer.email = requestParams.email;
      }
      if (requestParams.phone !== undefined) {
        footer.phone = requestParams.phone;
      }
      if (requestParams.quickLinks !== undefined) {
        footer.quickLinks = requestParams.quickLinks;
      }
      if (requestParams.menuItems !== undefined) {
        footer.menuItems = requestParams.menuItems;
      }
      if (requestParams.operatingHours !== undefined) {
        footer.operatingHours = requestParams.operatingHours;
      }
      if (requestParams.copyrightText !== undefined) {
        footer.copyrightText = requestParams.copyrightText;
      }
      if (requestParams.companyName !== undefined) {
        footer.companyName = requestParams.companyName;
      }
      if (requestParams.backgroundImage !== undefined) {
        footer.backgroundImage = requestParams.backgroundImage;
      }
      if (requestParams.status !== undefined) {
        footer.status = requestParams.status;
      }

      await footer.save();

      return Response.successResponseData(
        res,
        footer,
        Constants.SUCCESS,
        "Footer updated successfully"
      );
    } catch (error) {
      console.error('Error updating footer:', error);
      return Response.errorResponseWithoutData(
        res,
        "Failed to update footer",
        Constants.INTERNAL_SERVER
      );
    }
  },
};

