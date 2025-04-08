/**
 * Authentication middleware for KRA eTims SDK
 * Validates authentication for API requests
 */
const { AuthenticationError } = require('../utils/errors');
const logger = require('../utils/logger');

/**
 * Middleware to check if request is authenticated
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const requireAuth = (req, res, next) => {
  try {
    // Check for authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('Authentication required');
    }
    
    // Extract token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      throw new AuthenticationError('Invalid authentication token');
    }
    
    // Add token to request
    req.token = token;
    
    // Continue to next middleware
    next();
  } catch (error) {
    logger.error(`Authentication middleware error: ${error.message}`);
    next(error);
  }
};

module.exports = {
  requireAuth
};
