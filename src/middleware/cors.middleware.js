/**
 * CORS middleware for KRA eTims SDK
 * Configures CORS with domain whitelisting
 */
const cors = require('cors');
const config = require('../config');
const logger = require('../utils/logger');

/**
 * Create CORS middleware with whitelist configuration
 * @returns {Function} - CORS middleware
 */
const configureCors = () => {
  const whitelist = config.cors.allowedOrigins;
  
  // Log the whitelist configuration
  logger.info(`CORS whitelist configured with: ${whitelist.join(', ')}`);
  
  const corsOptions = {
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) {
        logger.debug('CORS: Request with no origin allowed');
        return callback(null, true);
      }
      
      // Check if the origin is in the whitelist
      if (whitelist.includes('*') || whitelist.includes(origin)) {
        logger.debug(`CORS: Origin ${origin} allowed`);
        return callback(null, true);
      }
      
      // Origin not in whitelist
      logger.warn(`CORS: Origin ${origin} blocked by whitelist`);
      callback(new Error('Not allowed by CORS'));
    },
    methods: config.cors.methods,
    allowedHeaders: config.cors.allowedHeaders,
    exposedHeaders: config.cors.exposedHeaders,
    credentials: config.cors.credentials,
    maxAge: config.cors.maxAge,
    preflightContinue: false,
    optionsSuccessStatus: 204
  };
  
  return cors(corsOptions);
};

module.exports = {
  configureCors
};
