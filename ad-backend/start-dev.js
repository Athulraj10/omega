const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Omega Admin Backend...');
console.log('📁 Working directory:', process.cwd());

// Check if .env file exists
const fs = require('fs');
const envPath = path.join(__dirname, '.env');

if (!fs.existsSync(envPath)) {
  console.log('⚠️  No .env file found. Creating basic .env file...');
  
  const envContent = `NODE_ENV=development
PORT=3000
MONGO_CONNECTION_STRING=mongodb://localhost:27017/omega-admin
`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env file with basic configuration');
}

// Start the server
const server = spawn('node', ['server.js'], {
  stdio: 'inherit',
  shell: true
});

server.on('error', (error) => {
  console.error('❌ Failed to start server:', error);
});

server.on('close', (code) => {
  console.log(`🔚 Server process exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down server...');
  server.kill('SIGTERM');
}); 