/**
 * Configuration module for KRA eTims SDK
 * Loads and validates environment variables
 */
require('dotenv').config();

// Determine which API base URL to use based on environment
const getApiBaseUrl = () => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  if (nodeEnv === 'production') {
    return process.env.PROD_API_BASE_URL || 'https://etims-api.kra.go.ke/etims-api';
  }
  return process.env.DEV_API_BASE_URL || 'https://etims-api-sbx.kra.go.ke';
};

const config = {
  apiBaseUrl: getApiBaseUrl(),
  apiUsername: process.env.API_USERNAME,
  apiPassword: process.env.API_PASSWORD,
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  
  // API endpoints
  endpoints: {
    // Authentication
    auth: {
      generateToken: '/oauth2/v1/generate'
    },
    
    // OSCU Initialization
    initialization: {
      selectInitOsdcInfo: '/etims-oscu/v1/selectInitOsdcInfo'
    },
    
    // Basic Data Management
    basicData: {
      selectCodeList: '/etims-oscu/v1/selectCodeList',
      selectItemClsList: '/etims-oscu/v1/selectItemClsList',
      selectBhfList: '/etims-oscu/v1/selectBhfList',
      selectNoticeList: '/etims-oscu/v1/selectNoticeList',
      selectTaxpayerInfo: '/etims-oscu/v1/selectTaxpayerInfo',
      selectCustomerList: '/etims-oscu/v1/selectCustomerList'
    },
    
    // Branch Information Management
    branchInfo: {
      // Add branch info endpoints
    },
    
    // Item Management
    itemManagement: {
      saveItem: '/etims-oscu/v1/saveItem'
    },
    
    // Sales Management
    salesManagement: {
      sendSalesTrns: '/etims-oscu/v1/sendSalesTrns',
      selectSalesTrns: '/etims-oscu/v1/selectSalesTrns'
    },
    
    // Stock Information Management
    stockManagement: {
      selectMoveList: '/etims-oscu/v1/selectMoveList',
      saveStockMaster: '/etims-oscu/v1/saveStockMaster'
    },
    
    // Purchase Management
    purchaseManagement: {
      selectPurchaseTrns: '/etims-oscu/v1/selectPurchaseTrns'
    },
    
    // Imports Item Management
    importsManagement: {
      selectImportItemList: '/etims-oscu/v1/selectImportItemList'
    }
  }
};

module.exports = config;
