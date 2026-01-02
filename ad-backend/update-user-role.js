const mongoose = require('mongoose');

async function updateUserRole() {
  try {
    // Connect to database
    const url = process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/omega-admin';
    await mongoose.connect(url);
    console.log('✅ Connected to database');

    // Update user role level (replace with your email)
    const userEmail = 'admin@gmail.com'; // Change this to your email
    
    const result = await mongoose.connection.db.collection('users').updateOne(
      { email: userEmail },
      { 
        $set: { 
          role: 'admin',
          roleLevel: 5 
        } 
      }
    );

    if (result.matchedCount > 0) {
      console.log(`✅ Updated user ${userEmail} to admin role (level 5)`);
    } else {
      console.log(`❌ User ${userEmail} not found`);
    }

    // Show all users
    const users = await mongoose.connection.db.collection('users').find({}).toArray();
    console.log('\n📊 All users in database:');
    users.forEach(user => {
      console.log(`   ${user.email}: role=${user.role}, level=${user.roleLevel}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from database');
  }
}

updateUserRole(); 