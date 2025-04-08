/**
 * Stock Service for KRA eTims SDK
 * Handles stock operations with the KRA eTims API
 */
const apiService = require('./api.service');
const config = require('../config');
const logger = require('../utils/logger');
const { validate, schemas } = require('../utils/validation');

class StockService {
  /**
   * Get move list
   * @param {Object} data - Request data
   * @param {string} data.tin - Taxpayer Identification Number
   * @param {string} data.bhfId - Branch ID
   * @param {string} data.lastReqDt - Last Request Date
   * @returns {Promise<Object>} - Move list response
   */
  async selectMoveList(data) {
    try {
      logger.info('Getting move list');
      
      // Validate data
      const validatedData = validate(data, schemas.moveList);
      
      // Make API request
      const response = await apiService.post(
        config.endpoints.stockManagement.selectMoveList,
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
      logger.error(`Get move list error: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Save stock master
   * @param {Object} data - Stock master data
   * @param {string} data.tin - Taxpayer Identification Number
   * @param {string} data.bhfId - Branch ID
   * @param {string} data.itemCd - Item Code
   * @param {string} data.itemClsCd - Item Classification Code
   * @param {string} data.itemNm - Item Name
   * @param {string} data.pkgUnitCd - Package Unit Code
   * @param {string} data.qtyUnitCd - Quantity Unit Code
   * @param {number} data.splyAmt - Supply Amount
   * @param {string} data.vatTyCd - VAT Type Code
   * @returns {Promise<Object>} - Stock master response
   */
  async saveStockMaster(data) {
    try {
      logger.info('Saving stock master');
      
      // Validate data
      const validatedData = validate(data, schemas.stockMaster);
      
      // Make API request
      const response = await apiService.post(
        config.endpoints.stockManagement.saveStockMaster,
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
      logger.error(`Save stock master error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new StockService();
