const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

console.log("🌱 Starting Complete Database Seeding...");
console.log("📋 This will create users, categories, products, and orders...");

const runSeeders = async () => {
  try {
    console.log("\n1️⃣ Running Admin Seeder...");
    require("./src/seeders/adminSeeder.js");
    
    // Wait a bit for admin seeder to complete
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("\n2️⃣ Running User Seeder...");
    require("./src/seeders/userSeeder.js");
    
    // Wait a bit for user seeder to complete
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log("\n3️⃣ Running Category Seeder...");
    require("./src/seeders/categorySeeder.js");
    
    // Wait a bit for category seeder to complete
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("\n4️⃣ Running Sample Data Seeder (Products)...");
    require("./src/seeders/sampleDataSeeder.js");
    
    // Wait a bit for product seeder to complete
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log("\n5️⃣ Running Order Seeder...");
    require("./src/seeders/orderSeeder.js");
    
    console.log("\n✅ All seeders completed! Your database is now populated with:");
    console.log("   👥 Users (Admin, Sellers, Customers)");
    console.log("   📂 Categories");
    console.log("   📦 Products");
    console.log("   📋 Orders with realistic data");
    
  } catch (error) {
    console.error("❌ Error running seeders:", error);
  }
};

runSeeders();