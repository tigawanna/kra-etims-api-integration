/**
 * API Controller for KRA eTims SDK
 * Handles business logic for API endpoints
 */
const authService = require('../services/auth.service');
const initializationService = require('../services/initialization.service');
const basicDataService = require('../services/basic-data.service');
const salesService = require('../services/sales.service');
const stockService = require('../services/stock.service');
const purchaseService = require('../services/purchase.service');
const logger = require('../utils/logger');

/**
 * Authentication controller
 */
const authController = {
  /**
   * Get authentication token
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - Express next function
   */
  async getToken(req, res, next) {
    try {
      logger.info('Getting authentication token');
      const result = await authService.getToken(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
};

/**
 * Initialization controller
 */
const initializationController = {
  /**
   * Initialize OSDC Info
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - Express next function
   */
  async selectInitOsdcInfo(req, res, next) {
    try {
      logger.info('Initializing OSDC Info');
      const result = await initializationService.selectInitOsdcInfo(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
};

/**
 * Basic Data controller
 */
const basicDataController = {
  /**
   * Get code list
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - Express next function
   */
  async selectCodeList(req, res, next) {
    try {
      logger.info('Getting code list');
      const result = await basicDataService.selectCodeList(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
  
  /**
   * Get item classification list
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - Express next function
   */
  async selectItemClsList(req, res, next) {
    try {
      logger.info('Getting item classification list');
      const result = await basicDataService.selectItemClsList(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
  
  /**
   * Get branch list
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - Express next function
   */
  async selectBhfList(req, res, next) {
    try {
      logger.info('Getting branch list');
      const result = await basicDataService.selectBhfList(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
  
  /**
   * Get notice list
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - Express next function
   */
  async selectNoticeList(req, res, next) {
    try {
      logger.info('Getting notice list');
      const result = await basicDataService.selectNoticeList(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
  
  /**
   * Get taxpayer info
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - Express next function
   */
  async selectTaxpayerInfo(req, res, next) {
    try {
      logger.info('Getting taxpayer info');
      const result = await basicDataService.selectTaxpayerInfo(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
  
  /**
   * Get customer list
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - Express next function
   */
  async selectCustomerList(req, res, next) {
    try {
      logger.info('Getting customer list');
      const result = await basicDataService.selectCustomerList(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
};

/**
 * Sales controller
 */
const salesController = {
  /**
   * Send sales transaction
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - Express next function
   */
  async sendSalesTrns(req, res, next) {
    try {
      logger.info('Sending sales transaction');
      const result = await salesService.sendSalesTrns(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
  
  /**
   * Get sales transaction
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - Express next function
   */
  async selectSalesTrns(req, res, next) {
    try {
      logger.info('Getting sales transaction');
      const result = await salesService.selectSalesTrns(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
};

/**
 * Stock controller
 */
const stockController = {
  /**
   * Get move list
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - Express next function
   */
  async selectMoveList(req, res, next) {
    try {
      logger.info('Getting move list');
      const result = await stockService.selectMoveList(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
  
  /**
   * Save stock master
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - Express next function
   */
  async saveStockMaster(req, res, next) {
    try {
      logger.info('Saving stock master');
      const result = await stockService.saveStockMaster(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
};

/**
 * Purchase controller
 */
const purchaseController = {
  /**
   * Get purchase transaction
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - Express next function
   */
  async selectPurchaseTrns(req, res, next) {
    try {
      logger.info('Getting purchase transaction');
      const result = await purchaseService.selectPurchaseTrns(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = {
  authController,
  initializationController,
  basicDataController,
  salesController,
  stockController,
  purchaseController
};
