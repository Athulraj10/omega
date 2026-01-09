const express = require('express');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const http = require("http");
const cors = require("cors");
const path = require('path');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();

const { config } = require('./src/config/configAll.js');
const swaggerSpec = require('./src/config/swagger.js');

const createApp = () => {

  const app = express();
  const server = http.createServer(app);
  const port = config.port;

  // import i18n
  const i18n = require("./src/i18n/i18n");

  // Middleware setup
  // Increase body size limit to handle base64 images (50MB limit)
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
  app.use(i18n);

  // CORS setup
  app.use(
    cors({
      origin: ["http://localhost:3001", "http://localhost:3000", "http://localhost:8001"],
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
      preflightContinue: false,
      optionsSuccessStatus: 204
    })
  );
  
  // Handle preflight requests
  app.options('*', cors());

  // Database connection (but don't connect immediately)
  const { connect } = require("./src/config/dbConnection");

  // Socket.io setup
  // const { createSocketServer } = require("./src/socket/index");
  // const io = createSocketServer(server);

  // Swagger Documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Omega E-commerce API Documentation',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      tryItOutEnabled: true
    }
  }));

  // Routes
  const indexRoute = require("./src/routes");
  app.use("/", indexRoute);

  // Static files
  app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads'), {
    setHeaders: (res, path, stat) => {
      res.set('Access-Control-Allow-Origin', '*');
    }
  }));

  return {
    app,
    server,
    connectDB: connect,
    start: () => {
      return new Promise((resolve) => {
        server.listen(port, () => {
          console.log(`Server running on port ${port}`);
          resolve(server);
        });
      });
    },
    stop: () => {
      return new Promise((resolve) => {
        server.close(() => {
          console.log('Server stopped');
          resolve();
        });
      });
    }
  };
};

if (require.main === module) {
  const { start, connectDB } = createApp();
  connectDB();
  start();
}

module.exports = createApp;