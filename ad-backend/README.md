# Omega Admin Backend

This is the backend API server for the Omega Admin dashboard.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or accessible via connection string)

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Environment Variables
Create a `.env` file in the root directory with the following variables:
```env
NODE_ENV=development
PORT=3000
MONGO_CONNECTION_STRING=mongodb://localhost:27017/omega-admin
```

### 3. Start the Server

**Option 1: Development mode (with auto-restart)**
```bash
npm run dev
```

**Option 2: Production mode**
```bash
npm start
```

**Option 3: Development with auto-setup**
```bash
npm run start-dev
```

## API Endpoints

### Health Check
- `GET /admin/health` - Check if the server is running

### Authentication
- `POST /admin/login` - Admin login
- `POST /admin/logout` - Admin logout

### Users (temporarily without auth for testing)
- `GET /admin/users` - Get all users
- `GET /admin/users/:id` - Get user by ID
- `GET /admin/users/:id/orders` - Get user orders
- `GET /admin/users/:id/reports` - Get user reports
- `PATCH /admin/users/:id/status` - Update user status
- `DELETE /admin/users/:id` - Delete user

### Categories
- `GET /admin/categories` - Get all categories
- `GET /admin/categories/active` - Get active categories
- `GET /admin/categories/for-product` - Get categories for product assignment
- `POST /admin/categories` - Create category
- `PUT /admin/categories/:id` - Update category
- `DELETE /admin/categories/:id` - Delete category

### Currencies
- `GET /admin/currencies` - Get all currencies
- `POST /admin/currencies` - Create currency
- `PUT /admin/currencies/:id` - Update currency
- `DELETE /admin/currencies/:id` - Delete currency

### Products
- `GET /admin/products` - Get all products
- `POST /admin/products` - Create product
- `PUT /admin/products/:id` - Update product
- `DELETE /admin/products/:id` - Delete product

## Database Setup

If you don't have MongoDB running locally, you can:

1. **Install MongoDB locally**
2. **Use MongoDB Atlas (cloud)**
3. **Use Docker:**
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, change the PORT in your `.env` file:
```env
PORT=3001
```

### MongoDB Connection Issues
Make sure MongoDB is running and accessible. Check your connection string in the `.env` file.

### Frontend Connection Issues
Make sure the frontend is configured to connect to the correct backend URL. The default is `http://localhost:3000`.

## Development

The server uses:
- Express.js for the web framework
- Mongoose for MongoDB ODM
- JWT for authentication
- Multer for file uploads
- Winston for logging

## File Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middlewares/     # Express middlewares
├── models/          # Mongoose models
├── routes/          # API routes
├── services/        # Business logic
└── uploads/         # File uploads
``` 