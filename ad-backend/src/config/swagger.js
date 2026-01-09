const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Omega E-commerce API',
      version: '1.0.0',
      description: 'Complete API documentation for Omega E-commerce Platform. This includes all admin and user-side endpoints with detailed request/response schemas and examples.',
      contact: {
        name: 'API Support',
        email: 'support@omega.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://api.omega.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token obtained from login endpoint. Format: Bearer {token}'
        }
      },
      schemas: {
        // Common Response Schemas
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Operation successful' },
            data: { type: 'object' },
            meta: { type: 'object' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message' },
            error: { type: 'string' }
          }
        },
        BadRequest: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Bad request' }
          }
        },
        Unauthorized: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Unauthorized' }
          }
        },
        NotFound: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Resource not found' }
          }
        },
        InternalServerError: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Internal server error' }
          }
        },
        Pagination: {
          type: 'object',
          properties: {
            currentPage: { type: 'integer', example: 1 },
            totalPages: { type: 'integer', example: 10 },
            totalItems: { type: 'integer', example: 100 },
            itemsPerPage: { type: 'integer', example: 10 },
            hasNextPage: { type: 'boolean', example: true },
            hasPrevPage: { type: 'boolean', example: false }
          }
        },
        
        // User Schemas
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            first_name: { type: 'string', example: 'John' },
            last_name: { type: 'string', example: 'Doe' },
            userName: { type: 'string', example: 'johndoe' },
            email: { type: 'string', example: 'john.doe@example.com' },
            mobile_no: { type: 'number', example: 1234567890 },
            profile_pic: { type: 'string', example: '/uploads/profile/user.jpg' },
            role: { type: 'string', example: 'admin' },
            roleLevel: { type: 'number', example: 1 },
            status: { type: 'string', example: '1' },
            currency_id: { type: 'object' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        
        // Product Schemas
        Product: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Premium Wireless Headphones' },
            description: { type: 'string', example: 'High-quality wireless headphones with noise cancellation' },
            category: { type: 'string', example: '507f1f77bcf86cd799439011' },
            subcategory: { type: 'string', example: '507f1f77bcf86cd799439012' },
            price: { type: 'number', example: 199.99 },
            discountPrice: { type: 'number', example: 149.99 },
            images: { 
              type: 'array', 
              items: { type: 'string' },
              example: ['/uploads/products/headphone1.jpg', '/uploads/products/headphone2.jpg']
            },
            stock: { type: 'number', example: 50 },
            minimumOrder: { type: 'number', example: 1 },
            sku: { type: 'string', example: 'WH-001' },
            status: { type: 'string', enum: ['1', '0'], example: '1' },
            brand: { type: 'string', example: 'TechBrand' },
            weight: { type: 'string', example: '250g' },
            rating: { type: 'number', example: 4.5 },
            availability: { type: 'string', enum: ['Available', 'Out of Stock', 'Pre-order'], example: 'Available' },
            features: { 
              type: 'array', 
              items: { type: 'string' },
              example: ['Noise Cancellation', 'Bluetooth 5.0', '30hr Battery']
            },
            tags: { 
              type: 'array', 
              items: { type: 'string' },
              example: ['electronics', 'audio', 'wireless']
            },
            seller: { type: 'string', example: '507f1f77bcf86cd799439013' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        
        // Category Schemas
        Category: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'Electronics' },
            description: { type: 'string', example: 'Electronic devices and accessories' },
            icon: { type: 'string', example: 'grid' },
            parentCategory: { type: 'string', nullable: true, example: null },
            isMainCategory: { type: 'boolean', example: true },
            sortOrder: { type: 'number', example: 1 },
            status: { type: 'string', enum: ['1', '0'], example: '1' },
            image: { type: 'string', example: '/uploads/categories/electronics.jpg' },
            slug: { type: 'string', example: 'electronics' },
            productCount: { type: 'number', example: 150 },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        
        // Order Schemas
        Order: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            orderNumber: { type: 'string', example: 'ORD2412010001' },
            user: { type: 'string', example: '507f1f77bcf86cd799439011' },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  product: { type: 'string', example: '507f1f77bcf86cd799439011' },
                  title: { type: 'string', example: 'Premium Wireless Headphones' },
                  image: { type: 'string', example: '/uploads/products/headphone1.jpg' },
                  price: { type: 'number', example: 149.99 },
                  quantity: { type: 'number', example: 2 },
                  totalPrice: { type: 'number', example: 299.98 }
                }
              }
            },
            shippingAddress: {
              type: 'object',
              properties: {
                label: { type: 'string', example: 'Home' },
                addressLine1: { type: 'string', example: '123 Main St' },
                city: { type: 'string', example: 'New York' },
                state: { type: 'string', example: 'NY' },
                postalCode: { type: 'string', example: '10001' },
                country: { type: 'string', example: 'USA' },
                phone: { type: 'string', example: '+1234567890' }
              }
            },
            billingAddress: {
              type: 'object',
              properties: {
                label: { type: 'string', example: 'Home' },
                addressLine1: { type: 'string', example: '123 Main St' },
                city: { type: 'string', example: 'New York' },
                state: { type: 'string', example: 'NY' },
                postalCode: { type: 'string', example: '10001' },
                country: { type: 'string', example: 'USA' },
                phone: { type: 'string', example: '+1234567890' }
              }
            },
            paymentMethod: { 
              type: 'string', 
              enum: ['cash_on_delivery', 'credit_card', 'paypal', 'stripe'],
              example: 'cash_on_delivery'
            },
            paymentStatus: { 
              type: 'string', 
              enum: ['pending', 'paid', 'failed', 'refunded'],
              example: 'pending'
            },
            orderStatus: { 
              type: 'string', 
              enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
              example: 'pending'
            },
            shippingMethod: { 
              type: 'string', 
              enum: ['free', 'standard', 'express'],
              example: 'free'
            },
            shippingCost: { type: 'number', example: 0 },
            subtotal: { type: 'number', example: 299.98 },
            tax: { type: 'number', example: 24.00 },
            discount: { type: 'number', example: 0 },
            total: { type: 'number', example: 323.98 },
            notes: { type: 'string', example: 'Please deliver before 5 PM' },
            trackingNumber: { type: 'string', example: 'TRACK123456' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        
        // Banner Schemas
        Banner: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            image: { type: 'string', example: '/uploads/banners/banner1.jpg' },
            titleLine1: { type: 'string', example: 'Summer Sale' },
            titleLine2: { type: 'string', example: 'Up to 50% Off' },
            offerText: { type: 'string', example: 'Limited Time Offer' },
            offerHighlight: { type: 'string', example: '50%' },
            buttonText: { type: 'string', example: 'Shop Now' },
            device: { type: 'string', enum: ['desktop', 'mobile'], example: 'desktop' },
            status: { type: 'string', enum: ['1', '0'], example: '1' },
            isDefault: { type: 'boolean', example: false },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        
        // Hero Slider Schemas
        HeroSlider: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            title: { type: 'string', example: 'New Collection Launch' },
            titleLine1: { type: 'string', example: 'New Collection' },
            titleLine2: { type: 'string', example: 'Launch' },
            subtitle: { type: 'string', example: 'Discover our latest products' },
            description: { type: 'string', example: 'Shop the newest arrivals' },
            offerText: { type: 'string', example: 'Special Launch Offer' },
            offerHighlight: { type: 'string', example: '30% OFF' },
            buttonText: { type: 'string', example: 'Shop Now' },
            buttonLink: { type: 'string', example: '/products/new-collection' },
            image: { type: 'string', example: '/uploads/hero-sliders/slider1.jpg' },
            imageUrl: { type: 'string', example: 'https://cdn.example.com/slider1.jpg' },
            mobileImage: { type: 'string', example: '/uploads/hero-sliders/slider1-mobile.jpg' },
            mobileImageUrl: { type: 'string', example: 'https://cdn.example.com/slider1-mobile.jpg' },
            device: { type: 'string', enum: ['desktop', 'mobile', 'tablet', 'all'], example: 'all' },
            status: { type: 'string', enum: ['active', 'inactive', 'draft', 'scheduled'], example: 'active' },
            isDefault: { type: 'boolean', example: false },
            priority: { type: 'number', example: 1 },
            sortOrder: { type: 'number', example: 1 },
            views: { type: 'number', example: 1000 },
            clicks: { type: 'number', example: 150 },
            ctr: { type: 'number', example: 15.0 },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        
        // Deal Schemas
        Deal: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            title: { type: 'string', example: 'Flash Sale - Electronics' },
            description: { type: 'string', example: 'Limited time offer on electronics' },
            dealType: { 
              type: 'string', 
              enum: ['percentage', 'fixed', 'buy_one_get_one', 'free_shipping', 'flash_sale'],
              example: 'percentage'
            },
            discountValue: { type: 'number', example: 30 },
            originalPrice: { type: 'number', example: 199.99 },
            dealPrice: { type: 'number', example: 139.99 },
            category: { type: 'string', example: '507f1f77bcf86cd799439011' },
            brand: { type: 'string', example: 'TechBrand' },
            images: { 
              type: 'array', 
              items: { type: 'string' },
              example: ['/uploads/deals/deal1.jpg']
            },
            isActive: { type: 'boolean', example: true },
            isFeatured: { type: 'boolean', example: false },
            startDate: { type: 'string', format: 'date-time', example: '2024-12-01T00:00:00Z' },
            endDate: { type: 'string', format: 'date-time', example: '2024-12-31T23:59:59Z' },
            maxUses: { type: 'number', example: 100 },
            usedCount: { type: 'number', example: 25 },
            tags: { 
              type: 'array', 
              items: { type: 'string' },
              example: ['flash-sale', 'electronics']
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        
        // Currency Schemas
        Currency: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            code: { type: 'string', example: 'USD' },
            name: { type: 'string', example: 'US Dollar' },
            symbol: { type: 'string', example: '$' },
            rate: { type: 'number', example: 1.0 },
            isDefault: { type: 'boolean', example: true },
            status: { type: 'string', enum: ['1', '0'], example: '1' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        }
      },
      responses: {
        BadRequest: {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/BadRequest'
              }
            }
          }
        },
        Unauthorized: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Unauthorized'
              }
            }
          }
        },
        NotFound: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/NotFound'
              }
            }
          }
        },
        InternalServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/InternalServerError'
              }
            }
          }
        }
      }
    },
    tags: [
      { name: 'Admin - Authentication', description: 'Admin authentication endpoints' },
      { name: 'Admin - Products', description: 'Product management endpoints' },
      { name: 'Admin - Categories', description: 'Category management endpoints' },
      { name: 'Admin - Orders', description: 'Order management endpoints' },
      { name: 'Admin - Users', description: 'User management endpoints' },
      { name: 'Admin - Banners', description: 'Banner management endpoints' },
      { name: 'Admin - Hero Sliders', description: 'Hero slider management endpoints' },
      { name: 'Admin - Deals', description: 'Deal management endpoints' },
      { name: 'Admin - Currency', description: 'Currency management endpoints' },
      { name: 'Admin - Dashboard', description: 'Dashboard and analytics endpoints' },
      { name: 'Admin - Reports', description: 'Reporting endpoints' },
      { name: 'Admin - Settings', description: 'System settings endpoints' },
      { name: 'Admin - Reviews', description: 'Review management endpoints' },
      { name: 'Admin - Sellers', description: 'Seller management endpoints' },
      { name: 'User - Authentication', description: 'User authentication endpoints' },
      { name: 'User - Products', description: 'User product browsing endpoints' },
      { name: 'User - Categories', description: 'User category browsing endpoints' },
      { name: 'User - Cart', description: 'Shopping cart endpoints' },
      { name: 'User - Orders', description: 'User order endpoints' },
      { name: 'User - Wishlist', description: 'Wishlist endpoints' },
      { name: 'User - Profile', description: 'User profile endpoints' },
      { name: 'User - Addresses', description: 'User address management endpoints' },
      { name: 'User - Reviews', description: 'User review endpoints' }
    ]
  },
  apis: ['./src/routes/**/*.js', './server.js', './src/config/swagger-docs.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

