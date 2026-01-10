# Swagger API Documentation

Complete OpenAPI (Swagger) documentation for the Omega E-commerce Platform backend API.

## Accessing the Documentation

Once the server is running, access the Swagger UI at:

```
http://localhost:3000/api-docs
```

## Features

- **Complete API Documentation**: All admin and user-side endpoints are documented
- **Interactive Testing**: Test all APIs directly from the Swagger UI
- **Request/Response Examples**: Pre-filled example values for easy testing
- **Authentication Support**: JWT token authentication is integrated
- **Schema Definitions**: Complete request and response schemas

## Authentication

Most admin endpoints require JWT authentication. To authenticate:

1. Use the `/admin/login` endpoint to get a JWT token
2. Click the "Authorize" button in Swagger UI
3. Enter: `Bearer {your_token}` (include the word "Bearer" followed by a space and your token)
4. Click "Authorize" and then "Close"

The token will be automatically included in all subsequent requests.

## Endpoint Categories

### Admin Endpoints

- **Authentication**: Login, logout, profile management, password reset
- **Products**: CRUD operations, status management, SKU validation, analytics
- **Categories**: CRUD operations, hierarchical structure, reordering
- **Orders**: Order management, status updates, analytics, bulk operations, CSV export
- **Users**: User management, status updates, order history, reports
- **Banners**: Banner management with image uploads
- **Hero Sliders**: Hero slider management with desktop/mobile images
- **Deals**: Deal management, active deals, statistics
- **Currency**: Currency management, default currency setting
- **Dashboard**: Overview statistics, user metrics, payment analytics
- **Reports**: Sales, product performance, customer analytics, inventory reports
- **Settings**: Product settings, tax configuration, shipping zones and methods
- **Reviews**: Review management and moderation
- **Sellers**: Seller account management

### User-Side Endpoints (Designed for Implementation)

- **Authentication**: Registration, login, logout
- **Products**: Browse products, search, filter, view details
- **Categories**: Browse categories and category products
- **Cart**: Add/remove items, update quantities, clear cart
- **Orders**: View orders, create orders, cancel orders
- **Wishlist**: Add/remove items from wishlist
- **Profile**: View and update user profile
- **Addresses**: Manage shipping addresses
- **Reviews**: View and submit product reviews
- **Public Content**: Banners, hero sliders, deals, currencies

## Testing APIs

### Example: Testing Product Creation

1. Navigate to `POST /admin/products`
2. Click "Try it out"
3. Fill in the required fields with example values:
   - `name`: "Premium Wireless Headphones"
   - `category`: "507f1f77bcf86cd799439011"
   - `price`: 199.99
   - `sku`: "WH-001"
   - `stock`: 50
   - `minimumOrder`: 1
4. Upload product images using the file upload field
5. Click "Execute"
6. Review the response

### Example: Testing with Authentication

1. First, authenticate using `/admin/login`
2. Copy the token from the response
3. Click "Authorize" button in Swagger UI
4. Enter: `Bearer {your_token}`
5. Now all authenticated endpoints will work automatically

## Request/Response Examples

All endpoints include:
- **Request Examples**: Pre-filled with realistic example values
- **Response Schemas**: Complete structure of success and error responses
- **Status Codes**: All possible HTTP status codes with descriptions
- **Validation Rules**: Required fields, data types, and constraints

## File Upload Endpoints

Several endpoints support file uploads (multipart/form-data):
- Product images: `/admin/products` (POST, PUT)
- Banner images: `/admin/banners` (POST)
- Hero slider images: `/admin/hero-sliders` (POST, PUT)
- Deal images: `/admin/deals/add` (POST)

When testing file uploads in Swagger UI:
1. Select the file upload field
2. Choose an image file
3. Fill in other form fields
4. Execute the request

## Query Parameters

Many GET endpoints support query parameters for:
- **Pagination**: `page`, `limit`
- **Filtering**: `status`, `search`, `category`, etc.
- **Sorting**: `sortBy`, `sortOrder`
- **Date Ranges**: `startDate`, `endDate`

Examples are provided in the Swagger UI for each endpoint.

## Error Handling

All endpoints document possible error responses:
- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Missing or invalid authentication
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side errors

Error responses follow a consistent format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

## User-Side API Design

The user-side APIs are designed based on the admin APIs but adapted for:
- Public access (no authentication required for browsing)
- User-specific data (cart, orders, wishlist require authentication)
- Simplified responses (only necessary data for frontend)
- Optimized for performance (pagination, filtering, caching)

## Implementation Notes

### Admin APIs (Implemented)
All admin endpoints are fully implemented and documented.

### User APIs (Designed, To Be Implemented)
User-side endpoints are documented with:
- Complete request/response schemas
- Authentication requirements
- Example values
- Expected behavior

These can be implemented following the documented specifications.

## Updating Documentation

To add or update endpoint documentation:

1. Edit `/src/config/swagger-docs.js`
2. Add JSDoc comments following the OpenAPI 3.0 format
3. Use the existing patterns for consistency
4. Include examples for all request/response fields
5. Restart the server to see changes

## Schema Definitions

All reusable schemas are defined in `/src/config/swagger.js`:
- User, Product, Category, Order, Banner, HeroSlider, Deal, Currency
- Common responses: SuccessResponse, ErrorResponse
- Pagination schema

These can be referenced using `$ref: '#/components/schemas/SchemaName'`

## Best Practices

1. **Always authenticate** before testing protected endpoints
2. **Use example values** provided in the documentation
3. **Check response schemas** to understand the data structure
4. **Test error cases** by providing invalid data
5. **Review validation rules** before submitting requests

## Troubleshooting

### Swagger UI not loading
- Ensure the server is running
- Check that port 3000 is accessible
- Verify `/api-docs` route is registered

### Authentication not working
- Verify token format: `Bearer {token}` (include "Bearer" and space)
- Check token expiration
- Ensure token is from the correct environment

### File uploads not working
- Use multipart/form-data content type
- Ensure file size is within limits (5MB)
- Check file type is supported (images)

### Endpoints not appearing
- Verify JSDoc comments are properly formatted
- Check that files are included in swagger.js `apis` array
- Restart the server after changes

## Support

For issues or questions about the API documentation:
- Review the endpoint documentation in Swagger UI
- Check the request/response examples
- Verify authentication is properly configured
- Review server logs for detailed error messages



