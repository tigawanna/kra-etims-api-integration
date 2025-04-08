/**
 * Error handling utilities for KRA eTims SDK
 * Provides custom error classes and error handling functions
 */
const logger = require('./logger');

/**
 * Custom API Error class
 */
class ApiError extends Error {
  constructor(message, statusCode, errorCode = null, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Custom Validation Error class
 */
class ValidationError extends Error {
  constructor(message, errors = []) {
    super(message);
    this.errors = errors;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Custom Authentication Error class
 */
class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error handler for API responses
 * @param {Object} response - API response object
 * @param {string} operation - Operation name for logging
 */
const handleApiResponse = (response) => {
  if (!response || !response.data) {
    throw new ApiError('Invalid API response', 500);
  }

  // Check for KRA API specific error codes
  if (response.data.resultCd && response.data.resultCd !== '0000') {
    logger.error(`API Error: ${response.data.resultMsg || 'Unknown error'}`);
    throw new ApiError(
      response.data.resultMsg || 'API Error',
      response.status || 400,
      response.data.resultCd
    );
  }

  return response.data;
};

/**
 * Format error for consistent response
 * @param {Error} err - Error object
 */
const formatError = (err) => {
  if (err instanceof ApiError) {
    return {
      success: false,
      error: {
        message: err.message,
        code: err.errorCode,
        details: err.details
      },
      statusCode: err.statusCode
    };
  }

  if (err instanceof ValidationError) {
    return {
      success: false,
      error: {
        message: err.message,
        validationErrors: err.errors
      },
      statusCode: 400
    };
  }

  if (err instanceof AuthenticationError) {
    return {
      success: false,
      error: {
        message: err.message
      },
      statusCode: 401
    };
  }

  // Default error format
  return {
    success: false,
    error: {
      message: err.message || 'Internal Server Error'
    },
    statusCode: 500
  };
};

module.exports = {
  ApiError,
  ValidationError,
  AuthenticationError,
  handleApiResponse,
  formatError
};
