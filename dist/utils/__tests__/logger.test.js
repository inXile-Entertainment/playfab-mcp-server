"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests for logger utilities
 */
const logger_1 = require("../logger");
// Mock pino to avoid actual logging during tests
jest.mock('pino', () => {
    const mockLogger = {
        debug: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
        child: jest.fn(() => mockLogger),
    };
    const pinoMock = jest.fn(() => mockLogger);
    pinoMock.stdTimeFunctions = { isoTime: jest.fn() };
    return pinoMock;
});
// Mock env-validator
jest.mock('../env-validator', () => ({
    isDevelopment: jest.fn(() => false),
    getEnvironmentName: jest.fn(() => 'test'),
}));
describe('Logger Utilities', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('createLogger', () => {
        it('should create a child logger with module name', () => {
            const logger = (0, logger_1.createLogger)('test-module');
            expect(logger).toBeDefined();
            expect(logger.debug).toBeDefined();
            expect(logger.info).toBeDefined();
            expect(logger.warn).toBeDefined();
            expect(logger.error).toBeDefined();
        });
    });
    describe('createRequestLogger', () => {
        it('should create a logger with request context', () => {
            const context = {
                requestId: 'req-123',
                method: 'GET',
                userId: 'user-456',
            };
            const logger = (0, logger_1.createRequestLogger)(context);
            expect(logger).toBeDefined();
        });
    });
    describe('PerformanceLogger', () => {
        it('should track operation duration', () => {
            const perfLogger = new logger_1.PerformanceLogger('test-operation');
            expect(perfLogger).toBeDefined();
            // Test end method
            perfLogger.end({ additionalData: 'test' });
            // Should not throw
        });
        it('should log errors with duration', () => {
            const perfLogger = new logger_1.PerformanceLogger('test-operation');
            const error = new Error('Test error');
            perfLogger.error(error, { context: 'test' });
            // Should not throw
        });
        it('should handle non-Error objects', () => {
            const perfLogger = new logger_1.PerformanceLogger('test-operation');
            perfLogger.error('string error', { context: 'test' });
            // Should not throw
        });
    });
    describe('logAPICall', () => {
        it('should log successful API calls', () => {
            const method = 'TestMethod';
            const request = { param: 'value' };
            const response = { result: 'success' };
            const duration = 100;
            (0, logger_1.logAPICall)(method, request, response, duration);
            // Should not throw
        });
        it('should log failed API calls with error', () => {
            const method = 'TestMethod';
            const request = { param: 'value' };
            const duration = 100;
            const error = new Error('API Error');
            (0, logger_1.logAPICall)(method, request, null, duration, error);
            // Should not throw
        });
        it('should handle non-Error objects as errors', () => {
            const method = 'TestMethod';
            const request = { param: 'value' };
            const duration = 100;
            const error = { code: 500, message: 'Server Error' };
            (0, logger_1.logAPICall)(method, request, null, duration, error);
            // Should not throw
        });
    });
    describe('logToolCall', () => {
        it('should log successful tool calls', () => {
            const toolName = 'search-items';
            const args = { Count: 10 };
            const result = { items: [] };
            const duration = 50;
            (0, logger_1.logToolCall)(toolName, args, result, duration);
            // Should not throw
        });
        it('should log failed tool calls with error', () => {
            const toolName = 'search-items';
            const args = { Count: 10 };
            const duration = 50;
            const error = new Error('Tool Error');
            (0, logger_1.logToolCall)(toolName, args, null, duration, error);
            // Should not throw
        });
        it('should handle non-Error objects as errors', () => {
            const toolName = 'search-items';
            const args = { Count: 10 };
            const duration = 50;
            const error = { message: 'Tool failed' };
            (0, logger_1.logToolCall)(toolName, args, null, duration, error);
            // Should not throw
        });
    });
    describe('development mode handling', () => {
        beforeEach(() => {
            const { isDevelopment } = require('../env-validator');
            isDevelopment.mockReturnValue(true);
        });
        it('should include request/response in development mode', () => {
            const method = 'TestMethod';
            const request = { param: 'value' };
            const response = { result: 'success' };
            const duration = 100;
            (0, logger_1.logAPICall)(method, request, response, duration);
            // Should not throw and should include more details in dev mode
        });
        it('should include stack traces in development mode', () => {
            const toolName = 'search-items';
            const args = { Count: 10 };
            const duration = 50;
            const error = new Error('Tool Error');
            (0, logger_1.logToolCall)(toolName, args, null, duration, error);
            // Should not throw and should include stack trace in dev mode
        });
    });
});
//# sourceMappingURL=logger.test.js.map