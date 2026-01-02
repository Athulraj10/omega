const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/omega-admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Category = require('./src/models/category');

async function testCategories() {
  try {
    console.log('Testing categories...');
    
    // Check if categories exist
    const categories = await Category.find({});
    console.log('Total categories found:', categories.length);
    
    // Get main categories
    const mainCategories = await Category.find({ 
      isMainCategory: true, 
      status: '1',
      parentCategory: null 
    });
    console.log('Main categories found:', mainCategories.length);
    mainCategories.forEach(cat => {
      console.log('-', cat.name);
    });
    
    // Get subcategories
    const subcategories = await Category.find({
      status: '1',
      parentCategory: { $ne: null },
      isMainCategory: false
    });
    console.log('Subcategories found:', subcategories.length);
    subcategories.forEach(cat => {
      console.log('-', cat.name, '(parent:', cat.parentCategory, ')');
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.disconnect();
  }
}

testCategories(); 