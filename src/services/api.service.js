/**
 * API Service for KRA eTims SDK
 * Handles all HTTP requests to the KRA eTims API
 */
const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');
const { handleApiResponse, AuthenticationError } = require('../utils/errors');

class ApiService {
  constructor() {
    this.baseURL = config.apiBaseUrl;
    this.username = config.apiUsername;
    this.password = config.apiPassword;
    this.token = null;
    this.tokenExpiry = null;
    
    // Create axios instance with default config
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Add request interceptor for authentication
    this.client.interceptors.request.use(
      async (config) => {
        // Skip auth for token endpoint
        if (config.url === '/oauth2/v1/generate') {
          return config;
        }
        
        // Check if token is valid, if not get a new one
        if (!this.isTokenValid()) {
          await this.authenticate();
        }
        
        // Add token to request
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        
        return config;
      },
      (error) => {
        logger.error(`Request error: ${error.message}`);
        return Promise.reject(error);
      }
    );
  }
  
  /**
   * Check if the current token is valid
   * @returns {boolean} - True if token is valid, false otherwise
   */
  isTokenValid() {
    if (!this.token || !this.tokenExpiry) {
      return false;
    }
    
    // Check if token is expired (with 5 minute buffer)
    const now = new Date();
    return now < new Date(this.tokenExpiry - 5 * 60 * 1000);
  }
  
  /**
   * Authenticate with KRA eTims API
   * @returns {Promise<string>} - Access token
   * @throws {AuthenticationError} - If authentication fails
   */
  async authenticate() {
    try {
      logger.info('Authenticating with KRA eTims API');
      
      // Set basic auth for token request
      const authConfig = {
        auth: {
          username: this.username,
          password: this.password
        },
        params: {
          grant_type: 'client_credentials'
        }
      };
      
      const response = await this.client.post(
        config.endpoints.auth.generateToken,
        null,
        authConfig
      );
      
      if (!response.data || !response.data.access_token) {
        throw new AuthenticationError('Invalid authentication response');
      }
      
      this.token = response.data.access_token;
      
      // Set token expiry (default to 1 hour if not provided)
      const expiresIn = response.data.expires_in || 3600;
      this.tokenExpiry = new Date(Date.now() + expiresIn * 1000);
      
      logger.info('Successfully authenticated with KRA eTims API');
      return this.token;
    } catch (error) {
      logger.error(`Authentication error: ${error.message}`);
      throw new AuthenticationError('Failed to authenticate with KRA eTims API');
    }
  }
  
  /**
   * Make a request to the KRA eTims API
   * @param {string} method - HTTP method
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request data
   * @param {Object} headers - Additional headers
   * @returns {Promise<Object>} - API response
   */
  async request(method, endpoint, data = null, headers = {}) {
    try {
      logger.debug(`Making ${method} request to ${endpoint}`);
      
      const response = await this.client.request({
        method,
        url: endpoint,
        data,
        headers
      });
      
      return handleApiResponse(response);
    } catch (error) {
      logger.error(`API request error: ${error.message}`);
      
      if (error.response) {
        logger.error(`API response error: ${JSON.stringify(error.response.data)}`);
        return handleApiResponse(error.response);
      }
      
      throw error;
    }
  }
  
  /**
   * Make a GET request to the KRA eTims API
   * @param {string} endpoint - API endpoint
   * @param {Object} params - Query parameters
   * @param {Object} headers - Additional headers
   * @returns {Promise<Object>} - API response
   */
  async get(endpoint, params = {}, headers = {}) {
    return this.request('GET', endpoint, null, { ...headers, params });
  }
  
  /**
   * Make a POST request to the KRA eTims API
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request data
   * @param {Object} headers - Additional headers
   * @returns {Promise<Object>} - API response
   */
  async post(endpoint, data = {}, headers = {}) {
    return this.request('POST', endpoint, data, headers);
  }
}

// Export singleton instance
module.exports = new ApiService();
