/**
 * Basic usage example for KRA eTims SDK
 * Demonstrates how to use the SDK for common operations
 */
require('dotenv').config();
const KRAeTimsSDK = require('../src');

// Initialize the SDK
const sdk = new KRAeTimsSDK();

// Example functions
async function authenticate() {
  try {
    console.log('Authenticating with KRA eTims API...');
    const result = await sdk.auth.getToken({
      username: process.env.API_USERNAME,
      password: process.env.API_PASSWORD
    });
    console.log('Authentication successful:', result);
    return result.data.access_token;
  } catch (error) {
    console.error('Authentication failed:', error.message);
    throw error;
  }
}

async function initializeOsdc() {
  try {
    console.log('Initializing OSDC Info...');
    const result = await sdk.initialization.selectInitOsdcInfo({
      tin: 'P000000045R',
      bhfId: '00',
      dvcSrlNo: 'MOVA22'
    });
    console.log('Initialization successful:', result);
    return result;
  } catch (error) {
    console.error('Initialization failed:', error.message);
    throw error;
  }
}

async function getCodeList() {
  try {
    console.log('Getting code list...');
    const result = await sdk.basicData.selectCodeList({
      tin: 'P000000045R',
      bhfId: '00',
      lastReqDt: '20220101010101'
    });
    console.log('Code list retrieved:', result);
    return result;
  } catch (error) {
    console.error('Failed to retrieve code list:', error.message);
    throw error;
  }
}

async function sendSalesTrns() {
  try {
    console.log('Sending sales transaction...');
    const result = await sdk.sales.sendSalesTrns({
      tin: 'P000000045R',
      bhfId: '00',
      invcNo: 'INV001',
      salesTrnsItems: [
        {
          itemCd: 'ITEM001',
          itemNm: 'Test Item',
          qty: 1,
          prc: 100,
          splyAmt: 100,
          taxTyCd: 'V',
          taxAmt: 16
        }
      ]
    });
    console.log('Sales transaction sent:', result);
    return result;
  } catch (error) {
    console.error('Failed to send sales transaction:', error.message);
    throw error;
  }
}

// Run the examples
async function runExamples() {
  try {
    // auth
    await authenticate();
    
    // Then run other examples
    await initializeOsdc();
    await getCodeList();
    await sendSalesTrns();
    
    console.log('All examples completed successfully');
  } catch (error) {
    console.error('Example execution failed:', error.message);
  }
}

// Run the examples if this file is executed directly
if (require.main === module) {
  runExamples();
}

module.exports = {
  authenticate,
  initializeOsdc,
  getCodeList,
  sendSalesTrns,
  runExamples
};
