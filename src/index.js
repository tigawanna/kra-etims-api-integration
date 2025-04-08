/**
 * KRA eTims Integration SDK
 * Main entry point for the SDK
 */
const express = require('express');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const { formatError } = require('./utils/errors');
const config = require('./config');

// Load environment variables
dotenv.config();

// Import services
const authService = require('./services/auth.service');
const initializationService = require('./services/initialization.service');
const basicDataService = require('./services/basic-data.service');
const salesService = require('./services/sales.service');
const stockService = require('./services/stock.service');
const purchaseService = require('./services/purchase.service');

// CORS middleware
const { configureCors } = require('./middleware/cors.middleware');

// Import routes
const apiRoutes = require('./routes/api.routes');

/**
 * KRA eTims SDK class
 * Provides a unified interface to interact with the KRA eTims API
 */
class KRAeTimsSDK {
  constructor(options = {}) {
    this.options = options;
    
    // Initialize services
    this.auth = authService;
    this.initialization = initializationService;
    this.basicData = basicDataService;
    this.sales = salesService;
    this.stock = stockService;
    this.purchase = purchaseService;
    
    // Create express app if server is enabled
    if (options.server) {
      this.initializeServer();
    }
  }
  
  /**
   * Initialize Express server
   * @private
   */
  initializeServer() {
    this.app = express();
    
    // Apply CORS middleware with domain whitelisting
    this.app.use(configureCors());
    
    // Configure middleware
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    // Add request logging middleware
    this.app.use((req, res, next) => {
      logger.info(`${req.method} ${req.path}`);
      next();
    });
    
    // Add API routes
    this.app.use('/api', apiRoutes);
    
    // Add 404 handler
    this.app.use((req, res) => {
      res.status(404).json({
        success: false,
        error: {
          message: 'Resource not found'
        }
      });
    });
    
    // Add error handling middleware
    this.app.use((err, req, res, next) => {
      logger.error(`Error processing request: ${err.message}`);
      const formattedError = formatError(err);
      res.status(formattedError.statusCode || 500).json(formattedError);
    });
  }
  
  /**
   * Start the Express server
   * @param {number} port - Port to listen on
   * @returns {Promise<void>}
   */
  async start(port = process.env.PORT || 5000) {
    if (!this.app) {
      throw new Error('Server not initialized. Set server: true in options.');
    }
    
    return new Promise((resolve) => {
      this.server = this.app.listen(port, () => {
        logger.info(`KRA eTims SDK server running on port ${port}`);
        resolve();
      });
    });
  }
  
  /**
   * Stop the Express server
   * @returns {Promise<void>}
   */
  async stop() {
    if (!this.server) {
      return Promise.resolve();
    }
    
    return new Promise((resolve, reject) => {
      this.server.close((err) => {
        if (err) {
          logger.error(`Error stopping server: ${err.message}`);
          return reject(err);
        }
        
        logger.info('KRA eTims SDK server stopped');
        resolve();
      });
    });
  }
}

// Export the SDK class
module.exports = KRAeTimsSDK;

// If this file is run directly, start the server
if (require.main === module) {
  const sdk = new KRAeTimsSDK({ server: true });
  sdk.start().catch((err) => {
    logger.error(`Failed to start server: ${err.message}`);
    process.exit(1);
  });
}
