const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testOrder = {
  user: '507f1f77bcf86cd799439011', // Replace with actual user ID
  items: [
    {
      product: '507f1f77bcf86cd799439012', // Replace with actual product ID
      title: 'Test Product',
      image: 'https://via.placeholder.com/150',
      price: 29.99,
      quantity: 2,
      totalPrice: 59.98
    }
  ],
  shippingAddress: {
    label: 'Home',
    addressLine1: '123 Test Street',
    city: 'Test City',
    state: 'Test State',
    postalCode: '12345',
    country: 'Test Country',
    phone: '+1234567890'
  },
  billingAddress: {
    label: 'Home',
    addressLine1: '123 Test Street',
    city: 'Test City',
    state: 'Test State',
    postalCode: '12345',
    country: 'Test Country',
    phone: '+1234567890'
  },
  paymentMethod: 'cash_on_delivery',
  paymentStatus: 'pending',
  orderStatus: 'pending',
  shippingMethod: 'free',
  shippingCost: 0,
  subtotal: 59.98,
  tax: 0,
  discount: 0,
  total: 59.98,
  notes: 'Test order'
};

async function testOrderManagement() {
  try {
    console.log('🧪 Testing Order Management System...\n');

    // Test 1: Get all orders
    console.log('1. Testing GET /admin/orders');
    try {
      const response = await axios.get(`${BASE_URL}/admin/orders`);
      console.log('✅ Success:', response.data.message);
      console.log('📊 Orders count:', response.data.data.orders.length);
    } catch (error) {
      console.log('❌ Error:', error.response?.data?.message || error.message);
    }

    // Test 2: Get order analytics
    console.log('\n2. Testing GET /admin/orders/analytics/overview');
    try {
      const response = await axios.get(`${BASE_URL}/admin/orders/analytics/overview?timeFrame=30d`);
      console.log('✅ Success:', response.data.message);
      console.log('📊 Analytics data received');
    } catch (error) {
      console.log('❌ Error:', error.response?.data?.message || error.message);
    }

    // Test 3: Create a new order
    console.log('\n3. Testing POST /admin/orders');
    try {
      const response = await axios.post(`${BASE_URL}/admin/orders`, testOrder);
      console.log('✅ Success:', response.data.message);
      console.log('📦 Order created with ID:', response.data.data._id);
      
      const orderId = response.data.data._id;

      // Test 4: Get order by ID
      console.log('\n4. Testing GET /admin/orders/:id');
      try {
        const getResponse = await axios.get(`${BASE_URL}/admin/orders/${orderId}`);
        console.log('✅ Success:', getResponse.data.message);
        console.log('📦 Order details retrieved');
      } catch (error) {
        console.log('❌ Error:', error.response?.data?.message || error.message);
      }

      // Test 5: Update order status
      console.log('\n5. Testing PATCH /admin/orders/:id/status');
      try {
        const updateResponse = await axios.patch(`${BASE_URL}/admin/orders/${orderId}/status`, {
          status: 'confirmed',
          paymentStatus: 'paid'
        });
        console.log('✅ Success:', updateResponse.data.message);
        console.log('📦 Order status updated');
      } catch (error) {
        console.log('❌ Error:', error.response?.data?.message || error.message);
      }

      // Test 6: Bulk update order statuses
      console.log('\n6. Testing PATCH /admin/orders/bulk/status');
      try {
        const bulkResponse = await axios.patch(`${BASE_URL}/admin/orders/bulk/status`, {
          orderIds: [orderId],
          status: 'processing'
        });
        console.log('✅ Success:', bulkResponse.data.message);
        console.log('📦 Bulk update completed');
      } catch (error) {
        console.log('❌ Error:', error.response?.data?.message || error.message);
      }

      // Test 7: Export orders
      console.log('\n7. Testing GET /admin/orders/export/csv');
      try {
        const exportResponse = await axios.get(`${BASE_URL}/admin/orders/export/csv`);
        console.log('✅ Success:', exportResponse.data.message);
        console.log('📦 Orders exported');
      } catch (error) {
        console.log('❌ Error:', error.response?.data?.message || error.message);
      }

      // Test 8: Delete order
      console.log('\n8. Testing DELETE /admin/orders/:id');
      try {
        const deleteResponse = await axios.delete(`${BASE_URL}/admin/orders/${orderId}`);
        console.log('✅ Success:', deleteResponse.data.message);
        console.log('📦 Order deleted');
      } catch (error) {
        console.log('❌ Error:', error.response?.data?.message || error.message);
      }

    } catch (error) {
      console.log('❌ Error creating order:', error.response?.data?.message || error.message);
    }

    console.log('\n🎉 Order Management System Test Completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testOrderManagement(); 