/**
 * Basic Data Service for KRA eTims SDK
 * Handles basic data operations with the KRA eTims API
 */
const apiService = require('./api.service');
const config = require('../config');
const logger = require('../utils/logger');
const { validate, schemas } = require('../utils/validation');

class BasicDataService {
  /**
   * Get code list
   * @param {Object} data - Request data
   * @param {string} data.tin - Taxpayer Identification Number
   * @param {string} data.bhfId - Branch ID
   * @param {string} data.lastReqDt - Last Request Date
   * @returns {Promise<Object>} - Code list response
   */
  async selectCodeList(data) {
    try {
      logger.info('Getting code list');
      
      // Validate data
      const validatedData = validate(data, schemas.codeList);
      
      // Make API request
      const response = await apiService.post(
        config.endpoints.basicData.selectCodeList,
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
      logger.error(`Get code list error: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Get item classification list
   * @param {Object} data - Request data
   * @param {string} data.tin - Taxpayer Identification Number
   * @param {string} data.bhfId - Branch ID
   * @param {string} data.lastReqDt - Last Request Date
   * @returns {Promise<Object>} - Item classification list response
   */
  async selectItemClsList(data) {
    try {
      logger.info('Getting item classification list');
      
      // Validate data
      const validatedData = validate(data, schemas.itemClsList);
      
      // Make API request
      const response = await apiService.post(
        config.endpoints.basicData.selectItemClsList,
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
      logger.error(`Get item classification list error: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Get branch list
   * @param {Object} data - Request data
   * @param {string} data.lastReqDt - Last Request Date
   * @returns {Promise<Object>} - Branch list response
   */
  async selectBhfList(data) {
    try {
      logger.info('Getting branch list');
      
      // Validate data
      const validatedData = validate(data, schemas.bhfList);
      
      // Make API request
      const response = await apiService.post(
        config.endpoints.basicData.selectBhfList,
        validatedData
      );
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      logger.error(`Get branch list error: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Get notice list
   * @param {Object} data - Request data
   * @param {string} data.tin - Taxpayer Identification Number
   * @param {string} data.bhfId - Branch ID
   * @param {string} data.lastReqDt - Last Request Date
   * @returns {Promise<Object>} - Notice list response
   */
  async selectNoticeList(data) {
    try {
      logger.info('Getting notice list');
      
      // Validate data
      const validatedData = validate(data, schemas.noticeList);
      
      // Make API request
      const response = await apiService.post(
        config.endpoints.basicData.selectNoticeList,
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
      logger.error(`Get notice list error: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Get taxpayer info
   * @param {Object} data - Request data
   * @param {string} data.tin - Taxpayer Identification Number
   * @param {string} data.bhfId - Branch ID
   * @param {string} data.lastReqDt - Last Request Date
   * @returns {Promise<Object>} - Taxpayer info response
   */
  async selectTaxpayerInfo(data) {
    try {
      logger.info('Getting taxpayer info');
      
      // Validate data
      const validatedData = validate(data, schemas.taxpayerInfo);
      
      // Make API request
      const response = await apiService.post(
        config.endpoints.basicData.selectTaxpayerInfo,
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
      logger.error(`Get taxpayer info error: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Get customer list
   * @param {Object} data - Request data
   * @param {string} data.tin - Taxpayer Identification Number
   * @param {string} data.bhfId - Branch ID
   * @param {string} data.lastReqDt - Last Request Date
   * @returns {Promise<Object>} - Customer list response
   */
  async selectCustomerList(data) {
    try {
      logger.info('Getting customer list');
      
      // Validate data
      const validatedData = validate(data, schemas.customerList);
      
      // Make API request
      const response = await apiService.post(
        config.endpoints.basicData.selectCustomerList,
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
      logger.error(`Get customer list error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new BasicDataService();
