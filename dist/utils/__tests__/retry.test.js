"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests for retry utilities
 */
const retry_1 = require("../retry");
const errors_1 = require("../errors");
// Mock logger to avoid console output during tests
jest.mock('../logger', () => ({
    createLogger: () => ({
        debug: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
    })
}));
describe('Retry Utilities', () => {
    describe('isRetryableError', () => {
        it('should return true for rate limit errors', () => {
            const error = new errors_1.RateLimitError('Rate limited', 60);
            expect((0, retry_1.isRetryableError)(error)).toBe(true);
        });
        it('should return false for authentication errors', () => {
            const error = new errors_1.AuthenticationError('Invalid token');
            expect((0, retry_1.isRetryableError)(error)).toBe(false);
        });
        it('should return false for validation errors', () => {
            const error = new errors_1.ValidationError('Invalid input');
            expect((0, retry_1.isRetryableError)(error)).toBe(false);
        });
        it('should return true for retryable PlayFab API errors', () => {
            const error = new errors_1.PlayFabAPIError('Internal server error', { errorCode: 'InternalServerError' });
            expect((0, retry_1.isRetryableError)(error)).toBe(true);
        });
        it('should return false for non-retryable PlayFab API errors', () => {
            const error = new errors_1.PlayFabAPIError('Invalid request', { errorCode: 'InvalidParams' });
            expect((0, retry_1.isRetryableError)(error)).toBe(false);
        });
        it('should return true for 5xx status codes', () => {
            const error = { statusCode: 500 };
            expect((0, retry_1.isRetryableError)(error)).toBe(true);
        });
        it('should return true for 429 status codes', () => {
            const error = { statusCode: 429 };
            expect((0, retry_1.isRetryableError)(error)).toBe(true);
        });
        it('should return false for 4xx status codes (except 408, 429)', () => {
            const error = { statusCode: 400 };
            expect((0, retry_1.isRetryableError)(error)).toBe(false);
        });
        it('should return true for network errors', () => {
            const error = new Error('Network timeout');
            expect((0, retry_1.isRetryableError)(error)).toBe(true);
        });
        it('should return false for unknown errors', () => {
            const error = new Error('Unknown error');
            expect((0, retry_1.isRetryableError)(error)).toBe(false);
        });
    });
    describe('calculateRetryDelay', () => {
        it('should use retryAfter when provided', () => {
            const delay = (0, retry_1.calculateRetryDelay)(0, retry_1.DEFAULT_RETRY_OPTIONS, 5);
            expect(delay).toBe(5000); // 5 seconds in milliseconds
        });
        it('should use exponential backoff by default', () => {
            const delay1 = (0, retry_1.calculateRetryDelay)(0, retry_1.DEFAULT_RETRY_OPTIONS);
            const delay2 = (0, retry_1.calculateRetryDelay)(1, retry_1.DEFAULT_RETRY_OPTIONS);
            // Remove jitter for predictable testing
            const options = { ...retry_1.DEFAULT_RETRY_OPTIONS, jitter: false };
            const cleanDelay1 = (0, retry_1.calculateRetryDelay)(0, options);
            const cleanDelay2 = (0, retry_1.calculateRetryDelay)(1, options);
            expect(cleanDelay2).toBe(cleanDelay1 * 2);
        });
        it('should respect max delay', () => {
            const options = { ...retry_1.DEFAULT_RETRY_OPTIONS, maxDelay: 5000 };
            const delay = (0, retry_1.calculateRetryDelay)(10, options);
            expect(delay).toBeLessThanOrEqual(5000);
        });
        it('should use linear backoff when exponential is disabled', () => {
            const options = {
                ...retry_1.DEFAULT_RETRY_OPTIONS,
                exponentialBackoff: false,
                jitter: false
            };
            const delay1 = (0, retry_1.calculateRetryDelay)(0, options);
            const delay2 = (0, retry_1.calculateRetryDelay)(1, options);
            expect(delay2).toBe(delay1 * 2);
        });
    });
    describe('retryWithPlayFabLogic', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it('should return success on first attempt', async () => {
            const fn = jest.fn().mockResolvedValueOnce('success');
            const result = await (0, retry_1.retryWithPlayFabLogic)(fn, { maxRetries: 0 });
            expect(result).toBe('success');
            expect(fn).toHaveBeenCalledTimes(1);
        });
        it('should retry on retryable errors', async () => {
            const fn = jest.fn()
                .mockRejectedValueOnce(new errors_1.RateLimitError('Rate limited'))
                .mockResolvedValueOnce('success');
            const result = await (0, retry_1.retryWithPlayFabLogic)(fn, {
                maxRetries: 1,
                baseDelay: 10 // Minimal delay for testing
            });
            expect(result).toBe('success');
            expect(fn).toHaveBeenCalledTimes(2);
        });
        it('should not retry on non-retryable errors', async () => {
            const fn = jest.fn().mockRejectedValueOnce(new errors_1.ValidationError('Invalid input'));
            await expect((0, retry_1.retryWithPlayFabLogic)(fn, { maxRetries: 3 }))
                .rejects.toThrow(errors_1.ValidationError);
            expect(fn).toHaveBeenCalledTimes(1);
        });
        it('should exhaust all retries and throw last error', async () => {
            const error = new errors_1.RateLimitError('Persistent rate limit');
            const fn = jest.fn().mockRejectedValue(error);
            await expect((0, retry_1.retryWithPlayFabLogic)(fn, {
                maxRetries: 2,
                baseDelay: 1
            })).rejects.toThrow(errors_1.RateLimitError);
            expect(fn).toHaveBeenCalledTimes(3); // Initial + 2 retries
        });
        it('should use custom retry options', async () => {
            const fn = jest.fn()
                .mockRejectedValueOnce(new Error('timeout'))
                .mockResolvedValueOnce('success');
            const customOptions = {
                maxRetries: 1,
                baseDelay: 5,
                retryableErrors: ['timeout']
            };
            const result = await (0, retry_1.retryWithPlayFabLogic)(fn, customOptions);
            expect(result).toBe('success');
            expect(fn).toHaveBeenCalledTimes(2);
        });
    });
    describe('PLAYFAB_RETRY_CONFIGS', () => {
        it('should have strict config for player APIs', () => {
            expect(retry_1.PLAYFAB_RETRY_CONFIGS.strict.maxRetries).toBeLessThanOrEqual(3);
            expect(retry_1.PLAYFAB_RETRY_CONFIGS.strict.baseDelay).toBeGreaterThan(1000);
        });
        it('should have standard config for admin APIs', () => {
            expect(retry_1.PLAYFAB_RETRY_CONFIGS.standard.maxRetries).toBeGreaterThanOrEqual(2);
            expect(retry_1.PLAYFAB_RETRY_CONFIGS.standard.exponentialBackoff).toBe(true);
        });
        it('should have bulk config for bulk operations', () => {
            expect(retry_1.PLAYFAB_RETRY_CONFIGS.bulk.maxRetries).toBeGreaterThanOrEqual(5);
            expect(retry_1.PLAYFAB_RETRY_CONFIGS.bulk.maxDelay).toBeGreaterThanOrEqual(30000);
        });
    });
});
//# sourceMappingURL=retry.test.js.map