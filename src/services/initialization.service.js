/**
 * Initialization Service for KRA eTims SDK
 * Handles initialization operations with the KRA eTims API
 */
const apiService = require('./api.service');
const config = require('../config');
const logger = require('../utils/logger');
const { validate, schemas } = require('../utils/validation');

class InitializationService {
  /**
   * Initialize OSDC Info
   * @param {Object} data - Initialization data
   * @param {string} data.tin - Taxpayer Identification Number
   * @param {string} data.bhfId - Branch ID
   * @param {string} data.dvcSrlNo - Device Serial Number
   * @returns {Promise<Object>} - Initialization response
   */
  async selectInitOsdcInfo(data) {
    try {
      logger.info('Initializing OSDC Info');
      
      // Validate data
      const validatedData = validate(data, schemas.initialization);
      
      // Make API request
      const response = await apiService.post(
        config.endpoints.initialization.selectInitOsdcInfo,
        validatedData
      );
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      logger.error(`Initialization error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new InitializationService();
