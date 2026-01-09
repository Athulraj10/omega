/**
 * @swagger
 * /admin/login:
 *   post:
 *     tags: [Admin - Authentication]
 *     summary: Admin login
 *     description: Authenticate admin user with email/password and return JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: admin123
 *               mobile_no:
 *                 type: number
 *                 example: 1234567890
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid credentials
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /admin/profile:
 *   get:
 *     tags: [Admin - Authentication]
 *     summary: Get admin profile
 *     description: Get current authenticated admin user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Profile retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /admin/update-profile:
 *   post:
 *     tags: [Admin - Authentication]
 *     summary: Update admin profile
 *     description: Update current authenticated admin user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               userName:
 *                 type: string
 *                 example: johndoe
 *               first_name:
 *                 type: string
 *                 example: John
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               phoneNumber:
 *                 type: number
 *                 example: 1234567890
 *               password:
 *                 type: string
 *                 format: password
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /admin/reset-password:
 *   post:
 *     tags: [Admin - Authentication]
 *     summary: Reset password
 *     description: Reset admin password using OTP
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, otp, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               otp:
 *                 type: string
 *                 example: "1234"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid OTP or password
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /admin/logout:
 *   post:
 *     tags: [Admin - Authentication]
 *     summary: Admin logout
 *     description: Logout admin user and invalidate token
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id]
 *             properties:
 *               id:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /admin/products:
 *   get:
 *     tags: [Admin - Products]
 *     summary: Get all products
 *     description: Retrieve all products with optional filtering and pagination
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ['1', '0']
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /admin/products:
 *   post:
 *     tags: [Admin - Products]
 *     summary: Create new product
 *     description: Create a new product with images
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, category, price, sku, stock, minimumOrder]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Premium Wireless Headphones
 *               description:
 *                 type: string
 *                 example: High-quality wireless headphones with noise cancellation
 *               category:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *               subcategory:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439012"
 *               price:
 *                 type: number
 *                 example: 199.99
 *               discountPrice:
 *                 type: number
 *                 example: 149.99
 *               stock:
 *                 type: integer
 *                 example: 50
 *               minimumOrder:
 *                 type: integer
 *                 example: 1
 *               sku:
 *                 type: string
 *                 example: WH-001
 *               status:
 *                 type: string
 *                 enum: ['1', '0']
 *                 example: '1'
 *               brand:
 *                 type: string
 *                 example: TechBrand
 *               weight:
 *                 type: string
 *                 example: "250g"
 *               features:
 *                 type: string
 *                 example: "Noise Cancellation,Bluetooth 5.0,30hr Battery"
 *               tags:
 *                 type: string
 *                 example: "electronics,audio,wireless"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /admin/products/{id}:
 *   put:
 *     tags: [Admin - Products]
 *     summary: Update product
 *     description: Update an existing product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               discountPrice:
 *                 type: number
 *               stock:
 *                 type: integer
 *               sku:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /admin/products/{id}:
 *   delete:
 *     tags: [Admin - Products]
 *     summary: Delete product
 *     description: Delete a product by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /admin/products/{id}/status:
 *   patch:
 *     tags: [Admin - Products]
 *     summary: Update product status
 *     description: Update product active/inactive status
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ['1', '0']
 *                 example: '1'
 *     responses:
 *       200:
 *         description: Product status updated successfully
 */

/**
 * @swagger
 * /admin/products/check-sku:
 *   get:
 *     tags: [Admin - Products]
 *     summary: Check SKU availability
 *     description: Check if a SKU is available
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: SKU availability check result
 */

/**
 * @swagger
 * /admin/products/generate-sku:
 *   get:
 *     tags: [Admin - Products]
 *     summary: Generate unique SKU
 *     description: Generate a unique SKU for a product
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Generated SKU
 */

/**
 * @swagger
 * /admin/products/analytics:
 *   get:
 *     tags: [Admin - Products]
 *     summary: Get product analytics
 *     description: Get analytics data for products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product analytics retrieved successfully
 */

/**
 * @swagger
 * /admin/categories:
 *   get:
 *     tags: [Admin - Categories]
 *     summary: Get all categories
 *     description: Retrieve all categories with pagination
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ['1', '0', 'all']
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: ['all', 'main', 'sub']
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     categories:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Category'
 *                     pagination:
 *                       $ref: '#/components/schemas/Pagination'
 */

/**
 * @swagger
 * /admin/categories/hierarchical:
 *   get:
 *     tags: [Admin - Categories]
 *     summary: Get hierarchical categories
 *     description: Get categories in hierarchical structure with subcategories
 *     responses:
 *       200:
 *         description: Hierarchical categories retrieved successfully
 */

/**
 * @swagger
 * /admin/categories/active:
 *   get:
 *     tags: [Admin - Categories]
 *     summary: Get active categories
 *     description: Get all active categories (public endpoint)
 *     responses:
 *       200:
 *         description: Active categories retrieved successfully
 */

/**
 * @swagger
 * /admin/categories/for-product:
 *   get:
 *     tags: [Admin - Categories]
 *     summary: Get categories for product selection
 *     description: Get categories formatted for product selection dropdown
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 */

/**
 * @swagger
 * /admin/categories:
 *   post:
 *     tags: [Admin - Categories]
 *     summary: Create new category
 *     description: Create a new category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               description:
 *                 type: string
 *                 example: Electronic devices and accessories
 *               icon:
 *                 type: string
 *                 example: grid
 *               parentCategory:
 *                 type: string
 *                 nullable: true
 *                 example: null
 *               isMainCategory:
 *                 type: boolean
 *                 example: true
 *               sortOrder:
 *                 type: number
 *                 example: 1
 *               status:
 *                 type: string
 *                 enum: ['1', '0']
 *                 example: '1'
 *     responses:
 *       200:
 *         description: Category created successfully
 */

/**
 * @swagger
 * /admin/categories/{id}:
 *   get:
 *     tags: [Admin - Categories]
 *     summary: Get category by ID
 *     description: Get a single category by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /admin/categories/{id}:
 *   put:
 *     tags: [Admin - Categories]
 *     summary: Update category
 *     description: Update an existing category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               icon:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: ['1', '0']
 *     responses:
 *       200:
 *         description: Category updated successfully
 */

/**
 * @swagger
 * /admin/categories/{id}:
 *   delete:
 *     tags: [Admin - Categories]
 *     summary: Delete category
 *     description: Delete a category by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 */

/**
 * @swagger
 * /admin/categories/{id}/status:
 *   patch:
 *     tags: [Admin - Categories]
 *     summary: Update category status
 *     description: Update category active/inactive status
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ['1', '0']
 *     responses:
 *       200:
 *         description: Category status updated successfully
 */

/**
 * @swagger
 * /admin/categories/reorder:
 *   post:
 *     tags: [Admin - Categories]
 *     summary: Reorder categories
 *     description: Update sort order of multiple categories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [categories]
 *             properties:
 *               categories:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     sortOrder:
 *                       type: number
 *     responses:
 *       200:
 *         description: Categories reordered successfully
 */

/**
 * @swagger
 * /admin/orders:
 *   get:
 *     tags: [Admin - Orders]
 *     summary: Get all orders
 *     description: Retrieve all orders with pagination, filtering, and sorting
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, confirmed, processing, shipped, delivered, cancelled, returned]
 *       - in: query
 *         name: paymentStatus
 *         schema:
 *           type: string
 *           enum: [pending, paid, failed, refunded]
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     orders:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Order'
 *                     pagination:
 *                       $ref: '#/components/schemas/Pagination'
 *                     summary:
 *                       type: object
 */

/**
 * @swagger
 * /admin/orders/{id}:
 *   get:
 *     tags: [Admin - Orders]
 *     summary: Get order by ID
 *     description: Get a single order by ID with full details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /admin/orders:
 *   post:
 *     tags: [Admin - Orders]
 *     summary: Create new order
 *     description: Create a new order manually (admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user, items, shippingAddress, total]
 *             properties:
 *               user:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     price:
 *                       type: number
 *               shippingAddress:
 *                 $ref: '#/components/schemas/Order/properties/shippingAddress'
 *               billingAddress:
 *                 $ref: '#/components/schemas/Order/properties/billingAddress'
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash_on_delivery, credit_card, paypal, stripe]
 *               total:
 *                 type: number
 *     responses:
 *       200:
 *         description: Order created successfully
 */

/**
 * @swagger
 * /admin/orders/{id}:
 *   put:
 *     tags: [Admin - Orders]
 *     summary: Update order
 *     description: Update order details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *               shippingAddress:
 *                 type: object
 *               orderStatus:
 *                 type: string
 *               paymentStatus:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order updated successfully
 */

/**
 * @swagger
 * /admin/orders/{id}/status:
 *   patch:
 *     tags: [Admin - Orders]
 *     summary: Update order status
 *     description: Update order status and/or payment status
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, processing, shipped, delivered, cancelled, returned]
 *               paymentStatus:
 *                 type: string
 *                 enum: [pending, paid, failed, refunded]
 *     responses:
 *       200:
 *         description: Order status updated successfully
 */

/**
 * @swagger
 * /admin/orders/{id}:
 *   delete:
 *     tags: [Admin - Orders]
 *     summary: Delete order
 *     description: Delete an order by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 */

/**
 * @swagger
 * /admin/orders/analytics/overview:
 *   get:
 *     tags: [Admin - Orders]
 *     summary: Get order analytics
 *     description: Get comprehensive order analytics and statistics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: timeFrame
 *         schema:
 *           type: string
 *           enum: [7d, 30d, 90d, 1y]
 *           default: 30d
 *     responses:
 *       200:
 *         description: Order analytics retrieved successfully
 */

/**
 * @swagger
 * /admin/orders/bulk/status:
 *   patch:
 *     tags: [Admin - Orders]
 *     summary: Bulk update order statuses
 *     description: Update status of multiple orders at once
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [orderIds]
 *             properties:
 *               orderIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               status:
 *                 type: string
 *               paymentStatus:
 *                 type: string
 *     responses:
 *       200:
 *         description: Orders updated successfully
 */

/**
 * @swagger
 * /admin/orders/export/csv:
 *   get:
 *     tags: [Admin - Orders]
 *     summary: Export orders to CSV
 *     description: Export orders to CSV format
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Orders exported successfully
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /admin/banners:
 *   get:
 *     tags: [Admin - Banners]
 *     summary: Get all banners
 *     description: Retrieve all banners
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Banners retrieved successfully
 */

/**
 * @swagger
 * /admin/banners/public:
 *   get:
 *     tags: [Admin - Banners]
 *     summary: Get public banners
 *     description: Get active banners (public endpoint, no auth required)
 *     responses:
 *       200:
 *         description: Public banners retrieved successfully
 */

/**
 * @swagger
 * /admin/banners:
 *   post:
 *     tags: [Admin - Banners]
 *     summary: Create new banner
 *     description: Create a new banner with image upload
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [image]
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               titleLine1:
 *                 type: string
 *                 example: Summer Sale
 *               titleLine2:
 *                 type: string
 *                 example: Up to 50% Off
 *               offerText:
 *                 type: string
 *                 example: Limited Time Offer
 *               offerHighlight:
 *                 type: string
 *                 example: "50%"
 *               buttonText:
 *                 type: string
 *                 example: Shop Now
 *               device:
 *                 type: string
 *                 enum: [desktop, mobile]
 *                 example: desktop
 *               status:
 *                 type: string
 *                 enum: ['1', '0']
 *                 example: '1'
 *               isDefault:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Banner created successfully
 */

/**
 * @swagger
 * /admin/banners/{id}:
 *   put:
 *     tags: [Admin - Banners]
 *     summary: Update banner
 *     description: Update an existing banner
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titleLine1:
 *                 type: string
 *               titleLine2:
 *                 type: string
 *               offerText:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: ['1', '0']
 *     responses:
 *       200:
 *         description: Banner updated successfully
 */

/**
 * @swagger
 * /admin/banners/{id}/status:
 *   patch:
 *     tags: [Admin - Banners]
 *     summary: Update banner status
 *     description: Update banner active/inactive status
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ['1', '0']
 *     responses:
 *       200:
 *         description: Banner status updated successfully
 */

/**
 * @swagger
 * /admin/banners/{id}/default:
 *   patch:
 *     tags: [Admin - Banners]
 *     summary: Set default banner
 *     description: Set a banner as default for its device type
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Default banner set successfully
 */

/**
 * @swagger
 * /admin/banners/{id}:
 *   delete:
 *     tags: [Admin - Banners]
 *     summary: Delete banner
 *     description: Delete a banner by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Banner deleted successfully
 */

/**
 * @swagger
 * /admin/hero-sliders:
 *   get:
 *     tags: [Admin - Hero Sliders]
 *     summary: Get all hero sliders
 *     description: Retrieve all hero sliders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Hero sliders retrieved successfully
 */

/**
 * @swagger
 * /admin/hero-sliders/public:
 *   get:
 *     tags: [Admin - Hero Sliders]
 *     summary: Get public hero sliders
 *     description: Get active hero sliders (public endpoint, no auth required)
 *     responses:
 *       200:
 *         description: Public hero sliders retrieved successfully
 */

/**
 * @swagger
 * /admin/hero-sliders:
 *   post:
 *     tags: [Admin - Hero Sliders]
 *     summary: Create new hero slider
 *     description: Create a new hero slider with images
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, image]
 *             properties:
 *               title:
 *                 type: string
 *                 example: New Collection Launch
 *               titleLine1:
 *                 type: string
 *                 example: New Collection
 *               titleLine2:
 *                 type: string
 *                 example: Launch
 *               subtitle:
 *                 type: string
 *                 example: Discover our latest products
 *               description:
 *                 type: string
 *                 example: Shop the newest arrivals
 *               offerText:
 *                 type: string
 *                 example: Special Launch Offer
 *               offerHighlight:
 *                 type: string
 *                 example: "30% OFF"
 *               buttonText:
 *                 type: string
 *                 example: Shop Now
 *               buttonLink:
 *                 type: string
 *                 example: /products/new-collection
 *               image:
 *                 type: string
 *                 format: binary
 *               mobileImage:
 *                 type: string
 *                 format: binary
 *               device:
 *                 type: string
 *                 enum: [desktop, mobile, tablet, all]
 *                 example: all
 *               status:
 *                 type: string
 *                 enum: [active, inactive, draft, scheduled]
 *                 example: active
 *     responses:
 *       200:
 *         description: Hero slider created successfully
 */

/**
 * @swagger
 * /admin/hero-sliders/{id}:
 *   get:
 *     tags: [Admin - Hero Sliders]
 *     summary: Get hero slider by ID
 *     description: Get a single hero slider by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hero slider retrieved successfully
 */

/**
 * @swagger
 * /admin/hero-sliders/{id}:
 *   put:
 *     tags: [Admin - Hero Sliders]
 *     summary: Update hero slider
 *     description: Update an existing hero slider
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               mobileImage:
 *                 type: string
 *                 format: binary
 *               status:
 *                 type: string
 *                 enum: [active, inactive, draft, scheduled]
 *     responses:
 *       200:
 *         description: Hero slider updated successfully
 */

/**
 * @swagger
 * /admin/hero-sliders/{id}:
 *   delete:
 *     tags: [Admin - Hero Sliders]
 *     summary: Delete hero slider
 *     description: Delete a hero slider by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hero slider deleted successfully
 */

/**
 * @swagger
 * /admin/hero-sliders/{id}/status:
 *   patch:
 *     tags: [Admin - Hero Sliders]
 *     summary: Toggle hero slider status
 *     description: Toggle hero slider active/inactive status
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hero slider status updated successfully
 */

/**
 * @swagger
 * /admin/hero-sliders/reorder:
 *   post:
 *     tags: [Admin - Hero Sliders]
 *     summary: Reorder hero sliders
 *     description: Update sort order of hero sliders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [sliders]
 *             properties:
 *               sliders:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     sortOrder:
 *                       type: number
 *     responses:
 *       200:
 *         description: Hero sliders reordered successfully
 */

/**
 * @swagger
 * /admin/hero-sliders/{id}/duplicate:
 *   post:
 *     tags: [Admin - Hero Sliders]
 *     summary: Duplicate hero slider
 *     description: Create a copy of an existing hero slider
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hero slider duplicated successfully
 */

/**
 * @swagger
 * /admin/hero-sliders/{id}/analytics:
 *   get:
 *     tags: [Admin - Hero Sliders]
 *     summary: Get hero slider analytics
 *     description: Get analytics data for a hero slider
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Analytics retrieved successfully
 */

/**
 * @swagger
 * /admin/hero-sliders/{id}/views:
 *   post:
 *     tags: [Admin - Hero Sliders]
 *     summary: Increment hero slider views
 *     description: Increment view count for a hero slider (public endpoint)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: View count incremented
 */

/**
 * @swagger
 * /admin/hero-sliders/{id}/clicks:
 *   post:
 *     tags: [Admin - Hero Sliders]
 *     summary: Increment hero slider clicks
 *     description: Increment click count for a hero slider (public endpoint)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Click count incremented
 */

/**
 * @swagger
 * /admin/deals/add:
 *   post:
 *     tags: [Admin - Deals]
 *     summary: Create new deal
 *     description: Create a new deal with images
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, originalPrice, dealPrice, category, startDate, endDate]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Flash Sale - Electronics
 *               description:
 *                 type: string
 *                 example: Limited time offer on electronics
 *               dealType:
 *                 type: string
 *                 enum: [percentage, fixed, buy_one_get_one, free_shipping, flash_sale]
 *                 example: percentage
 *               discountValue:
 *                 type: number
 *                 example: 30
 *               originalPrice:
 *                 type: number
 *                 example: 199.99
 *               dealPrice:
 *                 type: number
 *                 example: 139.99
 *               category:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *               brand:
 *                 type: string
 *                 example: TechBrand
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-01T00:00:00Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-31T23:59:59Z"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               isFeatured:
 *                 type: boolean
 *                 example: false
 *               tags:
 *                 type: string
 *                 example: "flash-sale,electronics"
 *     responses:
 *       200:
 *         description: Deal created successfully
 */

/**
 * @swagger
 * /admin/deals/list:
 *   get:
 *     tags: [Admin - Deals]
 *     summary: Get all deals
 *     description: Retrieve all deals with pagination and filters
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Deals retrieved successfully
 */

/**
 * @swagger
 * /admin/deals/{id}:
 *   get:
 *     tags: [Admin - Deals]
 *     summary: Get deal by ID
 *     description: Get a single deal by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deal retrieved successfully
 */

/**
 * @swagger
 * /admin/deals/{id}:
 *   put:
 *     tags: [Admin - Deals]
 *     summary: Update deal
 *     description: Update an existing deal
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               originalPrice:
 *                 type: number
 *               dealPrice:
 *                 type: number
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Deal updated successfully
 */

/**
 * @swagger
 * /admin/deals/{id}:
 *   delete:
 *     tags: [Admin - Deals]
 *     summary: Delete deal
 *     description: Delete a deal by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deal deleted successfully
 */

/**
 * @swagger
 * /admin/deals/active/list:
 *   get:
 *     tags: [Admin - Deals]
 *     summary: Get active deals
 *     description: Get all currently active deals
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Active deals retrieved successfully
 */

/**
 * @swagger
 * /admin/deals/stats/overview:
 *   get:
 *     tags: [Admin - Deals]
 *     summary: Get deal statistics
 *     description: Get statistics and analytics for deals
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deal statistics retrieved successfully
 */

/**
 * @swagger
 * /admin/deals/bulk/update:
 *   put:
 *     tags: [Admin - Deals]
 *     summary: Bulk update deals
 *     description: Update multiple deals at once
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [dealIds]
 *             properties:
 *               dealIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               updateData:
 *                 type: object
 *     responses:
 *       200:
 *         description: Deals updated successfully
 */

/**
 * @swagger
 * /admin/currencies:
 *   get:
 *     tags: [Admin - Currency]
 *     summary: Get all currencies
 *     description: Retrieve all currencies
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Currencies retrieved successfully
 */

/**
 * @swagger
 * /admin/currencies:
 *   post:
 *     tags: [Admin - Currency]
 *     summary: Create new currency
 *     description: Create a new currency
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [code, name, symbol]
 *             properties:
 *               code:
 *                 type: string
 *                 example: USD
 *               name:
 *                 type: string
 *                 example: US Dollar
 *               symbol:
 *                 type: string
 *                 example: "$"
 *               rate:
 *                 type: number
 *                 example: 1.0
 *               isDefault:
 *                 type: boolean
 *                 example: false
 *               status:
 *                 type: string
 *                 enum: ['1', '0']
 *                 example: '1'
 *     responses:
 *       200:
 *         description: Currency created successfully
 */

/**
 * @swagger
 * /admin/currencies/{id}:
 *   put:
 *     tags: [Admin - Currency]
 *     summary: Update currency
 *     description: Update an existing currency
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               name:
 *                 type: string
 *               rate:
 *                 type: number
 *     responses:
 *       200:
 *         description: Currency updated successfully
 */

/**
 * @swagger
 * /admin/currencies/{id}:
 *   delete:
 *     tags: [Admin - Currency]
 *     summary: Delete currency
 *     description: Delete a currency by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Currency deleted successfully
 */

/**
 * @swagger
 * /admin/currencies/{id}/default:
 *   patch:
 *     tags: [Admin - Currency]
 *     summary: Set default currency
 *     description: Set a currency as default
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Default currency set successfully
 */

/**
 * @swagger
 * /admin/currencies/{id}/status:
 *   patch:
 *     tags: [Admin - Currency]
 *     summary: Update currency status
 *     description: Update currency active/inactive status
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ['1', '0']
 *     responses:
 *       200:
 *         description: Currency status updated successfully
 */

/**
 * @swagger
 * /admin/dashboard/overview:
 *   get:
 *     tags: [Admin - Dashboard]
 *     summary: Get dashboard overview
 *     description: Get comprehensive dashboard statistics and metrics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard overview retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     views:
 *                       type: object
 *                       properties:
 *                         value:
 *                           type: number
 *                         growthRate:
 *                           type: number
 *                     profit:
 *                       type: object
 *                     products:
 *                       type: object
 *                     users:
 *                       type: object
 *                     orders:
 *                       type: object
 */

/**
 * @swagger
 * /admin/dashboard/users:
 *   get:
 *     tags: [Admin - Dashboard]
 *     summary: Get recent users
 *     description: Get list of recently registered users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Recent users retrieved successfully
 */

/**
 * @swagger
 * /admin/dashboard/payments:
 *   get:
 *     tags: [Admin - Dashboard]
 *     summary: Get payments overview
 *     description: Get payment statistics and overview
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payments overview retrieved successfully
 */

/**
 * @swagger
 * /admin/dashboard/weekly-profit:
 *   get:
 *     tags: [Admin - Dashboard]
 *     summary: Get weekly profit
 *     description: Get weekly profit data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Weekly profit data retrieved successfully
 */

/**
 * @swagger
 * /admin/dashboard/device-usage:
 *   get:
 *     tags: [Admin - Dashboard]
 *     summary: Get device usage statistics
 *     description: Get statistics on device usage
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Device usage statistics retrieved successfully
 */

/**
 * @swagger
 * /admin/dashboard/campaign-visitors:
 *   get:
 *     tags: [Admin - Dashboard]
 *     summary: Get campaign visitors
 *     description: Get campaign visitor statistics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Campaign visitors data retrieved successfully
 */

/**
 * @swagger
 * /admin/reports/sales:
 *   get:
 *     tags: [Admin - Reports]
 *     summary: Get sales reports
 *     description: Get comprehensive sales reports
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           default: '30'
 *     responses:
 *       200:
 *         description: Sales reports retrieved successfully
 */

/**
 * @swagger
 * /admin/reports/products:
 *   get:
 *     tags: [Admin - Reports]
 *     summary: Get product performance reports
 *     description: Get product performance and analytics reports
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product reports retrieved successfully
 */

/**
 * @swagger
 * /admin/reports/customers:
 *   get:
 *     tags: [Admin - Reports]
 *     summary: Get customer analytics reports
 *     description: Get customer analytics and insights
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customer reports retrieved successfully
 */

/**
 * @swagger
 * /admin/reports/inventory:
 *   get:
 *     tags: [Admin - Reports]
 *     summary: Get inventory reports
 *     description: Get inventory status and reports
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inventory reports retrieved successfully
 */

/**
 * @swagger
 * /admin/settings/products:
 *   get:
 *     tags: [Admin - Settings]
 *     summary: Get product settings
 *     description: Get product-related settings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product settings retrieved successfully
 */

/**
 * @swagger
 * /admin/settings/products:
 *   put:
 *     tags: [Admin - Settings]
 *     summary: Update product settings
 *     description: Update product-related settings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               allowBackorders:
 *                 type: boolean
 *               lowStockThreshold:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product settings updated successfully
 */

/**
 * @swagger
 * /admin/settings/tax:
 *   get:
 *     tags: [Admin - Settings]
 *     summary: Get tax settings
 *     description: Get tax configuration settings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tax settings retrieved successfully
 */

/**
 * @swagger
 * /admin/settings/tax:
 *   put:
 *     tags: [Admin - Settings]
 *     summary: Update tax settings
 *     description: Update tax configuration settings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enabled:
 *                 type: boolean
 *               defaultRate:
 *                 type: number
 *     responses:
 *       200:
 *         description: Tax settings updated successfully
 */

/**
 * @swagger
 * /admin/settings/tax/rates:
 *   post:
 *     tags: [Admin - Settings]
 *     summary: Add tax rate
 *     description: Add a new tax rate
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, rate]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Standard Tax
 *               rate:
 *                 type: number
 *                 example: 8.5
 *               country:
 *                 type: string
 *                 example: USA
 *     responses:
 *       200:
 *         description: Tax rate added successfully
 */

/**
 * @swagger
 * /admin/settings/tax/rates/{rateId}:
 *   put:
 *     tags: [Admin - Settings]
 *     summary: Update tax rate
 *     description: Update an existing tax rate
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rateId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               rate:
 *                 type: number
 *     responses:
 *       200:
 *         description: Tax rate updated successfully
 */

/**
 * @swagger
 * /admin/settings/tax/rates/{rateId}:
 *   delete:
 *     tags: [Admin - Settings]
 *     summary: Delete tax rate
 *     description: Delete a tax rate
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rateId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tax rate deleted successfully
 */

/**
 * @swagger
 * /admin/settings/shipping:
 *   get:
 *     tags: [Admin - Settings]
 *     summary: Get shipping settings
 *     description: Get shipping configuration settings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Shipping settings retrieved successfully
 */

/**
 * @swagger
 * /admin/settings/shipping:
 *   put:
 *     tags: [Admin - Settings]
 *     summary: Update shipping settings
 *     description: Update shipping configuration settings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               freeShippingThreshold:
 *                 type: number
 *               defaultShippingCost:
 *                 type: number
 *     responses:
 *       200:
 *         description: Shipping settings updated successfully
 */

/**
 * @swagger
 * /admin/settings/shipping/zones:
 *   post:
 *     tags: [Admin - Settings]
 *     summary: Add shipping zone
 *     description: Add a new shipping zone
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, countries]
 *             properties:
 *               name:
 *                 type: string
 *                 example: North America
 *               countries:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["USA", "Canada", "Mexico"]
 *               cost:
 *                 type: number
 *                 example: 10.00
 *     responses:
 *       200:
 *         description: Shipping zone added successfully
 */

/**
 * @swagger
 * /admin/settings/shipping/zones/{zoneId}:
 *   put:
 *     tags: [Admin - Settings]
 *     summary: Update shipping zone
 *     description: Update an existing shipping zone
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: zoneId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               countries:
 *                 type: array
 *               cost:
 *                 type: number
 *     responses:
 *       200:
 *         description: Shipping zone updated successfully
 */

/**
 * @swagger
 * /admin/settings/shipping/zones/{zoneId}:
 *   delete:
 *     tags: [Admin - Settings]
 *     summary: Delete shipping zone
 *     description: Delete a shipping zone
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: zoneId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shipping zone deleted successfully
 */

/**
 * @swagger
 * /admin/settings/shipping/methods:
 *   post:
 *     tags: [Admin - Settings]
 *     summary: Add shipping method
 *     description: Add a new shipping method
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, cost]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Express Shipping
 *               cost:
 *                 type: number
 *                 example: 25.00
 *               estimatedDays:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Shipping method added successfully
 */

/**
 * @swagger
 * /admin/settings/shipping/methods/{methodId}:
 *   put:
 *     tags: [Admin - Settings]
 *     summary: Update shipping method
 *     description: Update an existing shipping method
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: methodId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cost:
 *                 type: number
 *     responses:
 *       200:
 *         description: Shipping method updated successfully
 */

/**
 * @swagger
 * /admin/settings/shipping/methods/{methodId}:
 *   delete:
 *     tags: [Admin - Settings]
 *     summary: Delete shipping method
 *     description: Delete a shipping method
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: methodId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shipping method deleted successfully
 */

/**
 * @swagger
 * /admin/reviews:
 *   get:
 *     tags: [Admin - Reviews]
 *     summary: Get all reviews
 *     description: Retrieve all reviews with pagination and filtering
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: productId
 *         schema:
 *           type: string
 *       - in: query
 *         name: rating
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *     responses:
 *       200:
 *         description: Reviews retrieved successfully
 */

/**
 * @swagger
 * /admin/reviews/{id}:
 *   get:
 *     tags: [Admin - Reviews]
 *     summary: Get review by ID
 *     description: Get a single review by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review retrieved successfully
 */

/**
 * @swagger
 * /admin/reviews/{id}:
 *   delete:
 *     tags: [Admin - Reviews]
 *     summary: Delete review
 *     description: Delete a review by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully
 */

/**
 * @swagger
 * /admin/sellers:
 *   get:
 *     tags: [Admin - Sellers]
 *     summary: Get all sellers
 *     description: Retrieve all sellers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sellers retrieved successfully
 */

/**
 * @swagger
 * /admin/seller:
 *   post:
 *     tags: [Admin - Sellers]
 *     summary: Create new seller
 *     description: Create a new seller account
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [companyName, name, email, phone]
 *             properties:
 *               companyName:
 *                 type: string
 *                 example: Tech Solutions Inc
 *               name:
 *                 type: string
 *                 example: John Seller
 *               email:
 *                 type: string
 *                 format: email
 *                 example: seller@example.com
 *               phone:
 *                 type: number
 *                 example: 1234567890
 *               address:
 *                 type: string
 *                 example: 123 Business St
 *               status:
 *                 type: string
 *                 enum: ['1', '0']
 *                 example: '1'
 *     responses:
 *       200:
 *         description: Seller created successfully
 */

/**
 * @swagger
 * /admin/seller/{id}:
 *   put:
 *     tags: [Admin - Sellers]
 *     summary: Update seller
 *     description: Update an existing seller
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile_no:
 *                 type: number
 *     responses:
 *       200:
 *         description: Seller updated successfully
 */

/**
 * @swagger
 * /admin/seller/{id}:
 *   delete:
 *     tags: [Admin - Sellers]
 *     summary: Delete seller
 *     description: Delete a seller by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seller deleted successfully
 */

/**
 * @swagger
 * /admin/seller/{id}/products:
 *   get:
 *     tags: [Admin - Sellers]
 *     summary: Get seller products
 *     description: Get all products for a specific seller
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seller products retrieved successfully
 */

/**
 * @swagger
 * /admin/seller/{id}/reports:
 *   get:
 *     tags: [Admin - Sellers]
 *     summary: Get seller reports
 *     description: Get reports and analytics for a specific seller
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seller reports retrieved successfully
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     tags: [Admin - Users]
 *     summary: Get all users
 *     description: Retrieve all users with pagination
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 */

/**
 * @swagger
 * /admin/users/{id}:
 *   get:
 *     tags: [Admin - Users]
 *     summary: Get user by ID
 *     description: Get a single user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 */

/**
 * @swagger
 * /admin/users/{id}/orders:
 *   get:
 *     tags: [Admin - Users]
 *     summary: Get user orders
 *     description: Get all orders for a specific user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User orders retrieved successfully
 */

/**
 * @swagger
 * /admin/users/{id}/reports:
 *   get:
 *     tags: [Admin - Users]
 *     summary: Get user reports
 *     description: Get reports and analytics for a specific user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User reports retrieved successfully
 */

/**
 * @swagger
 * /admin/users/{id}/status:
 *   patch:
 *     tags: [Admin - Users]
 *     summary: Update user status
 *     description: Update user active/inactive status
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ['1', '0', '2', '3']
 *                 example: '1'
 *     responses:
 *       200:
 *         description: User status updated successfully
 */

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     tags: [Admin - Users]
 *     summary: Delete user
 *     description: Delete a user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */

// User-side API endpoints (to be implemented)
// These are designed based on admin APIs but for user-facing functionality

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags: [User - Products]
 *     summary: Get products (User)
 *     description: Get all active products for users with filtering, sorting, and pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [price, rating, createdAt, popularity]
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Product'
 *                     pagination:
 *                       $ref: '#/components/schemas/Pagination'
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags: [User - Products]
 *     summary: Get product by ID (User)
 *     description: Get detailed information about a single product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags: [User - Categories]
 *     summary: Get categories (User)
 *     description: Get all active categories for users
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 */

/**
 * @swagger
 * /api/categories/{id}/products:
 *   get:
 *     tags: [User - Categories]
 *     summary: Get products by category (User)
 *     description: Get all products in a specific category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Category products retrieved successfully
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [User - Authentication]
 *     summary: User registration
 *     description: Register a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, first_name, last_name]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *               first_name:
 *                 type: string
 *                 example: John
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               mobile_no:
 *                 type: number
 *                 example: 1234567890
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [User - Authentication]
 *     summary: User login
 *     description: Authenticate user and return JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     tags: [User - Cart]
 *     summary: Get user cart
 *     description: Get current user's shopping cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 */

/**
 * @swagger
 * /api/cart:
 *   post:
 *     tags: [User - Cart]
 *     summary: Add item to cart
 *     description: Add a product to the shopping cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, quantity]
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *               quantity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 */

/**
 * @swagger
 * /api/cart/{productId}:
 *   put:
 *     tags: [User - Cart]
 *     summary: Update cart item quantity
 *     description: Update quantity of an item in the cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quantity]
 *             properties:
 *               quantity:
 *                 type: number
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 */

/**
 * @swagger
 * /api/cart/{productId}:
 *   delete:
 *     tags: [User - Cart]
 *     summary: Remove item from cart
 *     description: Remove a product from the shopping cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 */

/**
 * @swagger
 * /api/cart/clear:
 *   delete:
 *     tags: [User - Cart]
 *     summary: Clear cart
 *     description: Clear all items from the shopping cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags: [User - Orders]
 *     summary: Get user orders
 *     description: Get all orders for the current user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags: [User - Orders]
 *     summary: Create order
 *     description: Create a new order from cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [shippingAddress, paymentMethod]
 *             properties:
 *               shippingAddress:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *               billingAddress:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash_on_delivery, credit_card, paypal, stripe]
 *                 example: cash_on_delivery
 *               notes:
 *                 type: string
 *                 example: Please deliver before 5 PM
 *     responses:
 *       200:
 *         description: Order created successfully
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     tags: [User - Orders]
 *     summary: Get order by ID
 *     description: Get detailed information about a specific order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /api/orders/{id}/cancel:
 *   post:
 *     tags: [User - Orders]
 *     summary: Cancel order
 *     description: Cancel an order (if allowed)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 example: Changed my mind
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 */

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     tags: [User - Wishlist]
 *     summary: Get user wishlist
 *     description: Get current user's wishlist
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist retrieved successfully
 */

/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     tags: [User - Wishlist]
 *     summary: Add to wishlist
 *     description: Add a product to the wishlist
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId]
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Product added to wishlist successfully
 */

/**
 * @swagger
 * /api/wishlist/{productId}:
 *   delete:
 *     tags: [User - Wishlist]
 *     summary: Remove from wishlist
 *     description: Remove a product from the wishlist
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed from wishlist successfully
 */

/**
 * @swagger
 * /api/profile:
 *   get:
 *     tags: [User - Profile]
 *     summary: Get user profile
 *     description: Get current user's profile information
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 */

/**
 * @swagger
 * /api/profile:
 *   put:
 *     tags: [User - Profile]
 *     summary: Update user profile
 *     description: Update current user's profile information
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               mobile_no:
 *                 type: number
 *               profile_pic:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */

/**
 * @swagger
 * /api/addresses:
 *   get:
 *     tags: [User - Addresses]
 *     summary: Get user addresses
 *     description: Get all addresses for the current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Addresses retrieved successfully
 */

/**
 * @swagger
 * /api/addresses:
 *   post:
 *     tags: [User - Addresses]
 *     summary: Add address
 *     description: Add a new address for the current user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [label, address, country, firstName, lastName, mobileNo]
 *             properties:
 *               label:
 *                 type: string
 *                 example: Home
 *               address:
 *                 type: string
 *                 example: 123 Main St, New York, NY 10001
 *               country:
 *                 type: string
 *                 example: USA
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               mobileNo:
 *                 type: string
 *                 example: "+1234567890"
 *               isDefault:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Address added successfully
 */

/**
 * @swagger
 * /api/addresses/{id}:
 *   put:
 *     tags: [User - Addresses]
 *     summary: Update address
 *     description: Update an existing address
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *               address:
 *                 type: string
 *               isDefault:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Address updated successfully
 */

/**
 * @swagger
 * /api/addresses/{id}:
 *   delete:
 *     tags: [User - Addresses]
 *     summary: Delete address
 *     description: Delete an address
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address deleted successfully
 */

/**
 * @swagger
 * /api/products/{id}/reviews:
 *   get:
 *     tags: [User - Reviews]
 *     summary: Get product reviews
 *     description: Get all reviews for a specific product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Reviews retrieved successfully
 */

/**
 * @swagger
 * /api/products/{id}/reviews:
 *   post:
 *     tags: [User - Reviews]
 *     summary: Add product review
 *     description: Add a review for a product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [rating]
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: Great product, highly recommended!
 *     responses:
 *       200:
 *         description: Review added successfully
 */

/**
 * @swagger
 * /api/banners:
 *   get:
 *     tags: [User - Products]
 *     summary: Get active banners
 *     description: Get all active banners for display (public endpoint)
 *     responses:
 *       200:
 *         description: Banners retrieved successfully
 */

/**
 * @swagger
 * /api/hero-sliders:
 *   get:
 *     tags: [User - Products]
 *     summary: Get active hero sliders
 *     description: Get all active hero sliders for display (public endpoint)
 *     responses:
 *       200:
 *         description: Hero sliders retrieved successfully
 */

/**
 * @swagger
 * /api/deals:
 *   get:
 *     tags: [User - Products]
 *     summary: Get active deals
 *     description: Get all active deals for users
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deals retrieved successfully
 */

/**
 * @swagger
 * /api/deals/{id}:
 *   get:
 *     tags: [User - Products]
 *     summary: Get deal by ID
 *     description: Get detailed information about a specific deal
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deal retrieved successfully
 */

/**
 * @swagger
 * /api/currencies:
 *   get:
 *     tags: [User - Products]
 *     summary: Get currencies
 *     description: Get all available currencies (public endpoint)
 *     responses:
 *       200:
 *         description: Currencies retrieved successfully
 */

module.exports = {};


