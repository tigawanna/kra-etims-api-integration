/**
 * API Routes for KRA eTims SDK
 * Defines routes for the Express server
 */
const express = require('express');
const { 
  authController,
  initializationController,
  basicDataController,
  salesController,
  stockController,
  purchaseController
} = require('../controllers/api.controller');
const { requireAuth } = require('../middleware/auth.middleware');

const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Auth routes
router.post('/auth/token', authController.getToken);

// Protected routes (require authentication)
// Initialization routes
router.post('/initialization/osdc-info', requireAuth, initializationController.selectInitOsdcInfo);

// Basic data routes
router.post('/basic-data/code-list', requireAuth, basicDataController.selectCodeList);
router.post('/basic-data/item-cls-list', requireAuth, basicDataController.selectItemClsList);
router.post('/basic-data/bhf-list', requireAuth, basicDataController.selectBhfList);
router.post('/basic-data/notice-list', requireAuth, basicDataController.selectNoticeList);
router.post('/basic-data/taxpayer-info', requireAuth, basicDataController.selectTaxpayerInfo);
router.post('/basic-data/customer-list', requireAuth, basicDataController.selectCustomerList);

// Sales routes
router.post('/sales/send', requireAuth, salesController.sendSalesTrns);
router.post('/sales/select', requireAuth, salesController.selectSalesTrns);

// Stock routes
router.post('/stock/move-list', requireAuth, stockController.selectMoveList);
router.post('/stock/save-master', requireAuth, stockController.saveStockMaster);

// Purchase routes
router.post('/purchase/select', requireAuth, purchaseController.selectPurchaseTrns);

module.exports = router;
