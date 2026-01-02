const mongoose = require('mongoose');
const configAll = require('./src/config/configAll');

// Connect to MongoDB
mongoose.connect(configAll.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import models
const Product = require('./src/models/product');
const Category = require('./src/models/category');
const Seller = require('./src/models/seller');

async function listAllData() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connection.asPromise();
    console.log('✅ Connected to MongoDB successfully!\n');

    // Fetch all data
    console.log('📦 Fetching all data...\n');

    // Products
    const products = await Product.find({}).populate('category').populate('seller');
    console.log(`🏪 PRODUCTS (${products.length} total):`);
    console.log('='.repeat(80));
    
    if (products.length === 0) {
      console.log('❌ No products found in database');
    } else {
      products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name}`);
        console.log(`   ID: ${product._id}`);
        console.log(`   Price: $${product.price}`);
        console.log(`   Stock: ${product.stock}`);
        console.log(`   Category: ${product.category ? product.category.name : 'No category'}`);
        console.log(`   Seller: ${product.seller ? (product.seller.companyName || product.seller.userName || 'Unknown') : 'No seller'}`);
        console.log(`   Status: ${product.status === '1' ? 'Active' : 'Inactive'}`);
        console.log(`   Created: ${product.createdAt}`);
        console.log('');
      });
    }

    // Categories
    const categories = await Category.find({}).populate('parentCategory');
    console.log(`📂 CATEGORIES (${categories.length} total):`);
    console.log('='.repeat(80));
    
    if (categories.length === 0) {
      console.log('❌ No categories found in database');
    } else {
      // Separate main categories and subcategories
      const mainCategories = categories.filter(cat => !cat.parentCategory);
      const subcategories = categories.filter(cat => cat.parentCategory);

      console.log(`📁 Main Categories (${mainCategories.length}):`);
      mainCategories.forEach((category, index) => {
        console.log(`${index + 1}. ${category.name}`);
        console.log(`   ID: ${category._id}`);
        console.log(`   Description: ${category.description || 'No description'}`);
        console.log(`   Status: ${category.status}`);
        console.log(`   Created: ${category.createdAt}`);
        console.log('');
      });

      console.log(`📂 Subcategories (${subcategories.length}):`);
      subcategories.forEach((category, index) => {
        console.log(`${index + 1}. ${category.name}`);
        console.log(`   ID: ${category._id}`);
        console.log(`   Parent: ${category.parentCategory ? category.parentCategory.name : 'Unknown'}`);
        console.log(`   Description: ${category.description || 'No description'}`);
        console.log(`   Status: ${category.status}`);
        console.log(`   Created: ${category.createdAt}`);
        console.log('');
      });
    }

    // Sellers
    const sellers = await Seller.find({});
    console.log(`👥 SELLERS (${sellers.length} total):`);
    console.log('='.repeat(80));
    
    if (sellers.length === 0) {
      console.log('❌ No sellers found in database');
    } else {
      sellers.forEach((seller, index) => {
        console.log(`${index + 1}. ${seller.companyName || seller.userName || 'Unknown'}`);
        console.log(`   ID: ${seller._id}`);
        console.log(`   Company: ${seller.companyName || 'N/A'}`);
        console.log(`   User: ${seller.userName || 'N/A'}`);
        console.log(`   Email: ${seller.email || 'N/A'}`);
        console.log(`   Status: ${seller.status}`);
        console.log(`   Created: ${seller.createdAt}`);
        console.log('');
      });
    }

    // Summary
    console.log('📊 SUMMARY:');
    console.log('='.repeat(80));
    console.log(`🏪 Total Products: ${products.length}`);
    console.log(`📁 Total Categories: ${categories.length}`);
    console.log(`   - Main Categories: ${categories.filter(cat => !cat.parentCategory).length}`);
    console.log(`   - Subcategories: ${categories.filter(cat => cat.parentCategory).length}`);
    console.log(`👥 Total Sellers: ${sellers.length}`);
    
    // Products by category
    const productsByCategory = {};
    products.forEach(product => {
      const categoryName = product.category ? product.category.name : 'No Category';
      productsByCategory[categoryName] = (productsByCategory[categoryName] || 0) + 1;
    });

    console.log('\n📦 Products by Category:');
    Object.entries(productsByCategory).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} products`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Run the script
listAllData(); 