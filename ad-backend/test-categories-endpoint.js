const fetch = require('node-fetch');

async function testCategoriesEndpoint() {
  try {
    console.log('Testing categories endpoint...');
    
    const response = await fetch('http://localhost:3000/api/admin/categories/for-product');
    const result = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log('✅ API is working!');
      console.log('Main categories:', result.data.mainCategories?.length || 0);
      console.log('Standalone categories:', result.data.standaloneCategories?.length || 0);
      
      if (result.data.mainCategories) {
        result.data.mainCategories.forEach(mainCat => {
          console.log(`- ${mainCat.name} (${mainCat.subcategories?.length || 0} subcategories)`);
        });
      }
    } else {
      console.log('❌ API returned error:', result.message);
    }
    
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testCategoriesEndpoint(); 