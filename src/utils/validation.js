/**
 * Validation utilities for KRA eTims SDK
 * Provides schemas and validation functions for API requests
 */
const Joi = require('joi');
const { ValidationError } = require('./errors');

// Common validation schemas
const schemas = {
  // Common fields
  tin: Joi.string().required().description('Taxpayer Identification Number'),
  bhfId: Joi.string().required().description('Branch ID'),
  lastReqDt: Joi.string().required().description('Last Request Date in format YYYYMMDDHHMMSS'),
  dvcSrlNo: Joi.string().required().description('Device Serial Number'),
  
  // Authentication
  auth: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  }),
  
  // Initialization
  initialization: Joi.object({
    tin: Joi.string().required(),
    bhfId: Joi.string().required(),
    dvcSrlNo: Joi.string().required()
  }),
  
  // Basic Data
  codeList: Joi.object({
    tin: Joi.string().required(),
    bhfId: Joi.string().required(),
    lastReqDt: Joi.string().required()
  }),
  
  itemClsList: Joi.object({
    tin: Joi.string().required(),
    bhfId: Joi.string().required(),
    lastReqDt: Joi.string().required()
  }),
  
  bhfList: Joi.object({
    lastReqDt: Joi.string().required()
  }),
  
  noticeList: Joi.object({
    tin: Joi.string().required(),
    bhfId: Joi.string().required(),
    lastReqDt: Joi.string().required()
  }),
  
  taxpayerInfo: Joi.object({
    tin: Joi.string().required(),
    bhfId: Joi.string().required(),
    lastReqDt: Joi.string().required()
  }),
  
  customerList: Joi.object({
    tin: Joi.string().required(),
    bhfId: Joi.string().required(),
    lastReqDt: Joi.string().required()
  }),
  
  // Sales Management
  salesTrns: Joi.object({
    tin: Joi.string().required(),
    bhfId: Joi.string().required(),
    invcNo: Joi.string().required().description('Invoice Number'),
    salesTrnsItems: Joi.array().items(
      Joi.object({
        itemCd: Joi.string().required().description('Item Code'),
        itemNm: Joi.string().required().description('Item Name'),
        qty: Joi.number().required().description('Quantity'),
        prc: Joi.number().required().description('Price'),
        splyAmt: Joi.number().required().description('Supply Amount'),
        dcRt: Joi.number().description('Discount Rate'),
        dcAmt: Joi.number().description('Discount Amount'),
        taxTyCd: Joi.string().required().description('Tax Type Code'),
        taxAmt: Joi.number().required().description('Tax Amount')
      })
    ).required()
  }),
  
  selectSalesTrns: Joi.object({
    tin: Joi.string().required(),
    bhfId: Joi.string().required(),
    lastReqDt: Joi.string().required(),
    invcNo: Joi.string().description('Invoice Number')
  }),
  
  // Stock Management
  moveList: Joi.object({
    tin: Joi.string().required(),
    bhfId: Joi.string().required(),
    lastReqDt: Joi.string().required()
  }),
  
  stockMaster: Joi.object({
    tin: Joi.string().required(),
    bhfId: Joi.string().required(),
    itemCd: Joi.string().required(),
    itemClsCd: Joi.string().required(),
    itemNm: Joi.string().required(),
    pkgUnitCd: Joi.string().required(),
    qtyUnitCd: Joi.string().required(),
    splyAmt: Joi.number().required(),
    vatTyCd: Joi.string().required()
  })
};

/**
 * Validate data against schema
 * @param {Object} data - Data to validate
 * @param {Object} schema - Joi schema to validate against
 * @returns {Object} - Validated data
 * @throws {ValidationError} - If validation fails
 */
const validate = (data, schema) => {
  const { error, value } = schema.validate(data, { 
    abortEarly: false,
    stripUnknown: true
  });
  
  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));
    
    throw new ValidationError('Validation failed', errors);
  }
  
  return value;
};

module.exports = {
  schemas,
  validate
};
