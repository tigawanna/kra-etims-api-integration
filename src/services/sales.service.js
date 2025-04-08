/**
 * Sales Service for KRA eTims SDK
 * Handles sales operations with the KRA eTims API
 */
const apiService = require('./api.service');
const config = require('../config');
const logger = require('../utils/logger');
const { validate, schemas } = require('../utils/validation');

class SalesService {
  /**
   * Send sales transaction information
   * @param {Object} data - Sales transaction data
   * @param {string} data.tin - Taxpayer Identification Number
   * @param {string} data.bhfId - Branch ID
   * @param {string} data.invcNo - Invoice Number
   * @param {Array} data.salesTrnsItems - Sales transaction items
   * @returns {Promise<Object>} - Sales transaction response
   */
  async sendSalesTrns(data) {
    try {
      logger.info('Sending sales transaction information');
      
      // Validate data
      const validatedData = validate(data, schemas.salesTrns);
      
      // Make API request
      const response = await apiService.post(
        config.endpoints.salesManagement.sendSalesTrns,
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
      logger.error(`Send sales transaction error: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Get sales transaction information
   * @param {Object} data - Request data
   * @param {string} data.tin - Taxpayer Identification Number
   * @param {string} data.bhfId - Branch ID
   * @param {string} data.lastReqDt - Last Request Date
   * @param {string} data.invcNo - Invoice Number (optional)
   * @returns {Promise<Object>} - Sales transaction response
   */
  async selectSalesTrns(data) {
    try {
      logger.info('Getting sales transaction information');
      
      // Validate data
      const validatedData = validate(data, schemas.selectSalesTrns);
      
      // Make API request
      const response = await apiService.post(
        config.endpoints.salesManagement.selectSalesTrns,
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
      logger.error(`Get sales transaction error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new SalesService();
