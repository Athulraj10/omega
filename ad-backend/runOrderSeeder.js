const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

console.log("🚀 Starting Order Seeder...");
console.log("📅 Creating realistic orders with real products, categories, and users...");

// Run the order seeder
require("./src/seeders/orderSeeder.js");