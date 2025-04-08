/**
 * Server usage example for KRA eTims SDK
 * Demonstrates how to use the SDK as an Express server
 */
require('dotenv').config();
const KRAeTimsSDK = require('../src');

// Initialize the SDK with server option
const sdk = new KRAeTimsSDK({ server: true });

// Start the server
const port = process.env.PORT || 5000;

sdk.start(port)
  .then(() => {
    console.log(`KRA eTims SDK server running on port ${port}`);
    console.log('Available endpoints:');
    console.log('- POST /api/auth/token - Get authentication token');
    console.log('- POST /api/initialization/osdc-info - Initialize OSDC Info');
    console.log('- POST /api/basic-data/code-list - Get code list');
    console.log('- POST /api/basic-data/item-cls-list - Get item classification list');
    console.log('- POST /api/basic-data/bhf-list - Get branch list');
    console.log('- POST /api/basic-data/notice-list - Get notice list');
    console.log('- POST /api/basic-data/taxpayer-info - Get taxpayer info');
    console.log('- POST /api/basic-data/customer-list - Get customer list');
    console.log('- POST /api/sales/send - Send sales transaction');
    console.log('- POST /api/sales/select - Get sales transaction');
    console.log('- POST /api/stock/move-list - Get move list');
    console.log('- POST /api/stock/save-master - Save stock master');
    console.log('- POST /api/purchase/select - Get purchase transaction');
    console.log('- GET /api/health - Health check');
  })
  .catch(err => {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  try {
    await sdk.stop();
    console.log('Server stopped');
    process.exit(0);
  } catch (error) {
    console.error('Error stopping server:', error.message);
    process.exit(1);
  }
});
