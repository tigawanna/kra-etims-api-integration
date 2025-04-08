/**
 * Tests for KRA eTims SDK API Service
 */
const apiService = require('../src/services/api.service');
const { AuthenticationError } = require('../src/utils/errors');

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    request: jest.fn(),
    post: jest.fn(),
    get: jest.fn(),
    interceptors: {
      request: {
        use: jest.fn()
      }
    }
  }))
}));

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('isTokenValid should return false when token is not set', () => {
    apiService.token = null;
    apiService.tokenExpiry = null;
    expect(apiService.isTokenValid()).toBe(false);
  });

  test('isTokenValid should return false when token is expired', () => {
    apiService.token = 'test-token';
    apiService.tokenExpiry = new Date(Date.now() - 1000); // Expired
    expect(apiService.isTokenValid()).toBe(false);
  });

  test('isTokenValid should return true when token is valid', () => {
    apiService.token = 'test-token';
    apiService.tokenExpiry = new Date(Date.now() + 3600 * 1000); // Valid for 1 hour
    expect(apiService.isTokenValid()).toBe(true);
  });

  test('authenticate should set token and expiry on success', async () => {
    // Mock successful authentication response
    apiService.client.post = jest.fn().mockResolvedValue({
      data: {
        access_token: 'test-token',
        expires_in: 3600
      }
    });

    await apiService.authenticate();

    expect(apiService.token).toBe('test-token');
    expect(apiService.tokenExpiry).toBeDefined();
  });

  test('authenticate should throw AuthenticationError on failure', async () => {
    // Mock failed authentication response
    apiService.client.post = jest.fn().mockRejectedValue(new Error('Auth failed'));

    await expect(apiService.authenticate()).rejects.toThrow(AuthenticationError);
  });

  test('request should call client.request with correct parameters', async () => {
    // Mock successful request response
    const mockResponse = {
      data: {
        resultCd: '0000',
        resultMsg: 'Success'
      }
    };
    apiService.client.request = jest.fn().mockResolvedValue(mockResponse);

    const result = await apiService.request('POST', '/test-endpoint', { test: 'data' }, { test: 'header' });

    expect(apiService.client.request).toHaveBeenCalledWith({
      method: 'POST',
      url: '/test-endpoint',
      data: { test: 'data' },
      headers: { test: 'header' }
    });
    expect(result).toEqual(mockResponse.data);
  });
});
