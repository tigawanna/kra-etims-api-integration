/**
 * Authentication Service for KRA eTims SDK
 * Handles authentication with the KRA eTims API
 */
const apiService = require('./api.service');
const config = require('../config');
const logger = require('../utils/logger');
const { validate, schemas } = require('../utils/validation');

class AuthService {
  /**
   * Get authentication token
   * @param {Object} credentials - Authentication credentials
   * @param {string} credentials.username - API username
   * @param {string} credentials.password - API password
   * @returns {Promise<Object>} - Authentication response with token
   */
  async getToken(credentials) {
    try {
      // Validate credentials
      const validatedData = validate(credentials, schemas.auth);
      
      // Store credentials for future use
      apiService.username = validatedData.username;
      apiService.password = validatedData.password;
      
      // Get token
      const token = await apiService.authenticate();
      
      return {
        success: true,
        data: {
          access_token: token,
          expires_at: apiService.tokenExpiry
        }
      };
    } catch (error) {
      logger.error(`Authentication error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new AuthService();
