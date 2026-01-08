# Database Seeders

This directory contains seeders to populate your database with realistic test data.

## Available Seeders

### 1. **Complete Database Setup** (Recommended)
```bash
node runAllSeeders.js
```
This runs all seeders in the correct order:
- Admin users
- Regular users and sellers
- Categories
- Products
- Orders

### 2. **Individual Seeders**

#### Order Seeder Only
```bash
node runOrderSeeder.js
```
Creates realistic orders using existing users, products, and categories.

#### Other Individual Seeders
```bash
node src/seeders/adminSeeder.js
node src/seeders/userSeeder.js
node src/seeders/categorySeeder.js
node src/seeders/sampleDataSeeder.js
```

## What the Order Seeder Creates

The order seeder generates **200-300 realistic orders** with the following features:

### 📊 Order Distribution
- **200-300 orders** over the last 90 days
- **5-10 orders** for today
- **3-8 orders** for yesterday
- Realistic date distribution

### 🛒 Order Details
- **1-4 items** per order
- **Real products** from your database
- **Real users** from your database
- **Realistic quantities** (1-3 per item)
- **Accurate pricing** (uses discount prices when available)

### 📍 Shipping Addresses
- 8 realistic US addresses
- Mix of home and work addresses
- Complete address information with phone numbers

### 📈 Order Statuses (Realistic Probabilities)
- **40%** Delivered
- **25%** Shipped
- **20%** Processing
- **10%** Pending
- **3%** Cancelled
- **2%** Returned

### 💳 Payment Statuses
- **85%** Paid
- **12%** Pending
- **3%** Failed

### 📅 Smart Date Logic
- **Recent orders** (today): Mostly pending/processing
- **This week**: Mix of processing/shipped/delivered
- **Older orders**: Realistic status distribution

## Prerequisites

Before running the order seeder, make sure you have:
1. ✅ **Users** (run `userSeeder.js` first)
2. ✅ **Products** (run `sampleDataSeeder.js` first)
3. ✅ **Categories** (run `categorySeeder.js` first)

## Database Models Used

- **User**: Real customers who place orders
- **Product**: Real products from your inventory
- **Category**: Product categories
- **Order**: Complete order information
- **Address**: Shipping addresses

## Sample Order Data

```javascript
{
  user: "user_id_from_database",
  items: [
    {
      product: "product_id_from_database",
      quantity: 2,
      priceAtPurchase: 29.99
    }
  ],
  shippingAddress: {
    label: "Home",
    addressLine1: "123 Main Street",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "USA",
    phone: "+1-555-0123"
  },
  status: "delivered",
  paymentStatus: "paid",
  totalAmount: 59.98,
  createdAt: "2024-01-15T10:30:00Z"
}
```

## Running the Seeders

1. **Make sure your backend is running** on port 8001
2. **Ensure MongoDB is connected**
3. **Run the complete seeder:**
   ```bash
   cd ad-backend
   node runAllSeeders.js
   ```

## Expected Output

```
🌱 Starting Complete Database Seeding...
📋 This will create users, categories, products, and orders...

1️⃣ Running Admin Seeder...
2️⃣ Running User Seeder...
3️⃣ Running Category Seeder...
4️⃣ Running Sample Data Seeder (Products)...
5️⃣ Running Order Seeder...

✅ All seeders completed! Your database is now populated with:
   👥 Users (Admin, Sellers, Customers)
   📂 Categories
   📦 Products
   📋 Orders with realistic data

=== Order Seeding Summary ===
Total orders in database: 245
Delivered orders: 98
Pending orders: 15
Total revenue: $12,450.75
```

## Notes

- The seeder uses **real data** from your existing database
- Orders are created with **realistic timestamps** over the last 90 days
- **Recent orders** have more realistic status distributions
- All monetary values are **rounded to 2 decimal places**
- The seeder is **idempotent** - you can run it multiple times safely

## Troubleshooting

If you encounter issues:

1. **Check MongoDB connection** in your `.env` file
2. **Ensure all prerequisite seeders** have been run
3. **Check the logs** for specific error messages
4. **Verify your models** are properly defined

## Customization

You can modify the seeder files to:
- Change the number of orders generated
- Adjust status probabilities
- Add more shipping addresses
- Modify date ranges
- Add custom order logic