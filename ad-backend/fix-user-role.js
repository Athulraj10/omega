const mongoose = require('mongoose');
const { User } = require('./src/models/user');
const { ROLES } = require('./src/services/Constants');

async function fixUserRole() {
  try {
    // Connect to database
    const url = process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/omega-admin';
    await mongoose.connect(url);
    console.log('✅ Connected to database');

    // Find all users
    const users = await User.find({});
    console.log(`📊 Found ${users.length} users in database`);

    // Check each user's role level
    users.forEach(user => {
      console.log(`👤 User: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Role Level: ${user.roleLevel}`);
      console.log(`   Status: ${user.status}`);
      console.log('---');
    });

    // Find users with insufficient role level
    const lowLevelUsers = users.filter(user => user.roleLevel <= 1);
    
    if (lowLevelUsers.length > 0) {
      console.log(`⚠️ Found ${lowLevelUsers.length} users with insufficient role level:`);
      lowLevelUsers.forEach(user => {
        console.log(`   - ${user.email}: roleLevel = ${user.roleLevel}`);
      });

      // Ask if user wants to fix them
      console.log('\n🔧 To fix this, run one of these commands:');
      console.log('\n1. Update specific user to admin:');
      console.log('   await User.findOneAndUpdate(');
      console.log('     { email: "your-email@example.com" },');
      console.log('     { role: "admin", roleLevel: 5 }');
      console.log('   );');
      
      console.log('\n2. Update all users with low role level:');
      console.log('   await User.updateMany(');
      console.log('     { roleLevel: { $lte: 1 } },');
      console.log('     { role: "admin", roleLevel: 5 }');
      console.log('   );');
    } else {
      console.log('✅ All users have sufficient role levels');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from database');
  }
}

// Run the script
fixUserRole(); 