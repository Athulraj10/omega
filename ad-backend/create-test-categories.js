const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/omega-admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Category = require('./src/models/category');

async function createTestCategories() {
  try {
    console.log('Creating test categories...');
    
    // Clear existing categories
    await Category.deleteMany({});
    console.log('Cleared existing categories');
    
    // Create main categories
    const mainCategories = [
      {
        name: 'Electronics',
        description: 'Electronic devices and gadgets',
        icon: 'smartphone',
        isMainCategory: true,
        parentCategory: null,
        sortOrder: 1,
        status: '1'
      },
      {
        name: 'Fashion',
        description: 'Clothing and accessories',
        icon: 'shirt',
        isMainCategory: true,
        parentCategory: null,
        sortOrder: 2,
        status: '1'
      },
      {
        name: 'Home & Garden',
        description: 'Home improvement and garden items',
        icon: 'home',
        isMainCategory: true,
        parentCategory: null,
        sortOrder: 3,
        status: '1'
      }
    ];
    
    const createdMainCategories = [];
    for (const mainCat of mainCategories) {
      const category = new Category(mainCat);
      const saved = await category.save();
      createdMainCategories.push(saved);
      console.log('Created main category:', saved.name);
    }
    
    // Create subcategories
    const subcategories = [
      {
        name: 'Smartphones',
        description: 'Mobile phones and accessories',
        parentCategory: createdMainCategories[0]._id,
        isMainCategory: false,
        sortOrder: 1,
        status: '1'
      },
      {
        name: 'Laptops',
        description: 'Portable computers',
        parentCategory: createdMainCategories[0]._id,
        isMainCategory: false,
        sortOrder: 2,
        status: '1'
      },
      {
        name: 'Men\'s Clothing',
        description: 'Clothing for men',
        parentCategory: createdMainCategories[1]._id,
        isMainCategory: false,
        sortOrder: 1,
        status: '1'
      },
      {
        name: 'Women\'s Clothing',
        description: 'Clothing for women',
        parentCategory: createdMainCategories[1]._id,
        isMainCategory: false,
        sortOrder: 2,
        status: '1'
      },
      {
        name: 'Furniture',
        description: 'Home furniture',
        parentCategory: createdMainCategories[2]._id,
        isMainCategory: false,
        sortOrder: 1,
        status: '1'
      },
      {
        name: 'Garden Tools',
        description: 'Tools for gardening',
        parentCategory: createdMainCategories[2]._id,
        isMainCategory: false,
        sortOrder: 2,
        status: '1'
      }
    ];
    
    for (const subCat of subcategories) {
      const category = new Category(subCat);
      const saved = await category.save();
      console.log('Created subcategory:', saved.name, 'under', saved.parentCategory);
    }
    
    console.log('✅ Test categories created successfully!');
    
  } catch (error) {
    console.error('Error creating categories:', error);
  } finally {
    mongoose.disconnect();
  }
}

createTestCategories(); 