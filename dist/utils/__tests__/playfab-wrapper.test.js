"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests for PlayFab API wrapper utilities
 */
const playfab_wrapper_1 = require("../playfab-wrapper");
const playfab_1 = require("../../config/playfab");
const errors_1 = require("../errors");
const errors_2 = require("../errors");
// Mock dependencies
jest.mock('../../config/playfab');
jest.mock('../errors');
const mockGetEntityToken = playfab_1.PlayFabAuthenticationAPI.GetEntityToken;
const mockWrapPlayFabError = errors_2.wrapPlayFabError;
describe('PlayFab Wrapper', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.useRealTimers();
    });
    describe('callPlayFabApi', () => {
        const mockApiMethod = jest.fn();
        const mockRequest = { test: 'request' };
        beforeEach(() => {
            // Mock successful entity token fetch
            mockGetEntityToken.mockImplementation((req, callback) => {
                callback(null, {
                    data: {
                        EntityToken: 'mock-token',
                        TokenExpiration: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                    },
                });
            });
        });
        it('should call API method with successful response', async () => {
            const mockResponse = { data: { result: 'success' } };
            mockApiMethod.mockImplementation((req, callback) => {
                callback(null, mockResponse);
            });
            const result = await (0, playfab_wrapper_1.callPlayFabApi)(mockApiMethod, mockRequest, 'TestMethod', { maxRetries: 0 });
            expect(result).toEqual(mockResponse.data);
            expect(mockApiMethod).toHaveBeenCalledWith(mockRequest, expect.any(Function));
            expect(mockGetEntityToken).toHaveBeenCalled();
        });
        it('should handle API errors', async () => {
            const mockError = { errorCode: 1000, errorMessage: 'API Error' };
            mockApiMethod.mockImplementation((req, callback) => {
                callback(mockError, null);
            });
            mockWrapPlayFabError.mockReturnValue(new Error('Wrapped error'));
            await expect((0, playfab_wrapper_1.callPlayFabApi)(mockApiMethod, mockRequest, 'TestMethod', { maxRetries: 0 }))
                .rejects.toThrow('Wrapped error');
            expect(mockWrapPlayFabError).toHaveBeenCalledWith(mockError, 'TestMethod');
        });
        it.skip('should handle rate limit errors', async () => {
            const mockError = { code: 429, retryAfterSeconds: 60 };
            mockApiMethod.mockImplementation((req, callback) => {
                callback(mockError, null);
            });
            // Test with no retries to avoid timeout
            await expect((0, playfab_wrapper_1.callPlayFabApi)(mockApiMethod, mockRequest, 'TestMethod', { maxRetries: 0 }))
                .rejects.toThrow(errors_1.RateLimitError);
        }, 10000);
        it('should handle missing response data', async () => {
            mockApiMethod.mockImplementation((req, callback) => {
                callback(null, {});
            });
            await expect((0, playfab_wrapper_1.callPlayFabApi)(mockApiMethod, mockRequest, 'TestMethod', { maxRetries: 0 }))
                .rejects.toThrow('No data returned from TestMethod');
        });
        it.skip('should reuse valid entity token', async () => {
            const mockResponse = { data: { result: 'success' } };
            mockApiMethod.mockImplementation((req, callback) => {
                callback(null, mockResponse);
            });
            // First call
            await (0, playfab_wrapper_1.callPlayFabApi)(mockApiMethod, mockRequest, 'TestMethod', { maxRetries: 0 });
            expect(mockGetEntityToken).toHaveBeenCalledTimes(1);
            // Second call - should reuse token
            await (0, playfab_wrapper_1.callPlayFabApi)(mockApiMethod, mockRequest, 'TestMethod', { maxRetries: 0 });
            expect(mockGetEntityToken).toHaveBeenCalledTimes(1);
        });
        it.skip('should refresh expired entity token', async () => {
            // Mock expired token
            mockGetEntityToken.mockImplementationOnce((req, callback) => {
                callback(null, {
                    data: {
                        EntityToken: 'expired-token',
                        TokenExpiration: new Date(Date.now() - 1000).toISOString(), // Expired
                    },
                });
            });
            const mockResponse = { data: { result: 'success' } };
            mockApiMethod.mockImplementation((req, callback) => {
                callback(null, mockResponse);
            });
            // Reset mocks to count properly
            mockGetEntityToken.mockClear();
            // Mock new token fetch
            mockGetEntityToken.mockImplementation((req, callback) => {
                callback(null, {
                    data: {
                        EntityToken: 'new-token',
                        TokenExpiration: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                    },
                });
            });
            await (0, playfab_wrapper_1.callPlayFabApi)(mockApiMethod, mockRequest, 'TestMethod', { maxRetries: 0 });
            // Should fetch new token because previous one expired
            expect(mockGetEntityToken).toHaveBeenCalledTimes(1);
        });
        it.skip('should handle entity token fetch errors', async () => {
            const tokenError = { errorCode: 1074, errorMessage: 'Token error' };
            mockGetEntityToken.mockImplementation((req, callback) => {
                callback(tokenError, null);
            });
            mockWrapPlayFabError.mockReturnValue(new Error('Token fetch failed'));
            await expect((0, playfab_wrapper_1.callPlayFabApi)(mockApiMethod, mockRequest, 'TestMethod', { maxRetries: 0 }))
                .rejects.toThrow('Token fetch failed');
            expect(mockWrapPlayFabError).toHaveBeenCalledWith(tokenError, 'GetEntityToken');
        });
    });
    describe('addCustomTags', () => {
        it('should add custom tags to empty request', () => {
            const request = { someField: 'value' };
            const result = (0, playfab_wrapper_1.addCustomTags)(request);
            expect(result).toEqual({
                someField: 'value',
                CustomTags: { mcp: 'true' },
            });
        });
        it('should merge with existing custom tags', () => {
            const request = {
                someField: 'value',
                CustomTags: { existing: 'tag' },
            };
            const result = (0, playfab_wrapper_1.addCustomTags)(request);
            expect(result).toEqual({
                someField: 'value',
                CustomTags: {
                    mcp: 'true',
                    existing: 'tag',
                },
            });
        });
        it('should add additional tags', () => {
            const request = { someField: 'value' };
            const result = (0, playfab_wrapper_1.addCustomTags)(request, { extra: 'tag' });
            expect(result).toEqual({
                someField: 'value',
                CustomTags: {
                    mcp: 'true',
                    extra: 'tag',
                },
            });
        });
        it('should prioritize request tags over default tags', () => {
            const request = {
                CustomTags: { mcp: 'custom' },
            };
            const result = (0, playfab_wrapper_1.addCustomTags)(request);
            expect(result.CustomTags.mcp).toBe('custom');
        });
    });
});
//# sourceMappingURL=playfab-wrapper.test.js.map