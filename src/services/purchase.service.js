/**
 * Purchase Service for KRA eTims SDK
 * Handles purchase operations with the KRA eTims API
 */
const apiService = require('./api.service');
const config = require('../config');
const logger = require('../utils/logger');
const { validate, schemas } = require('../utils/validation');

class PurchaseService {
  /**
   * Get purchase transaction information
   * @param {Object} data - Request data
   * @param {string} data.tin - Taxpayer Identification Number
   * @param {string} data.bhfId - Branch ID
   * @param {string} data.lastReqDt - Last Request Date
   * @returns {Promise<Object>} - Purchase transaction response
   */
  async selectPurchaseTrns(data) {
    try {
      logger.info('Getting purchase transaction information');
      
      // Validate data
      const validatedData = validate(data, schemas.taxpayerInfo); // Reusing schema as structure is similar
      
      // Make API request
      const response = await apiService.post(
        config.endpoints.purchaseManagement.selectPurchaseTrns,
        validatedData,
        {
          tin: validatedData.tin,
          bhfId: validatedData.bhfId,
          cmcKey: data.cmcKey // Optional
        }
      );
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      logger.error(`Get purchase transaction error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new PurchaseService();
