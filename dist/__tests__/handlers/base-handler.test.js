"use strict";
/**
 * Tests for base handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const base_handler_js_1 = require("../../handlers/base-handler.js");
const di_setup_js_1 = require("../../config/di-setup.js");
const container_js_1 = require("../../utils/container.js");
// Test implementation of BaseHandler
class TestHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('TestHandler');
    }
    async execute(params) {
        this.logInfo('Executing test handler', { input: params.input });
        try {
            const validated = this.validateRequiredString(params.input, 'input');
            return {
                success: true,
                output: `Processed: ${validated}`
            };
        }
        catch (error) {
            this.logError('Test handler failed', error);
            return this.createErrorResponse('TEST_ERROR', 'Test failed', { error });
        }
    }
}
(0, globals_1.describe)('BaseHandler', () => {
    (0, globals_1.beforeEach)(() => {
        container_js_1.container.clear();
        (0, di_setup_js_1.setupDependencies)({
            titleId: 'test-title',
            developerSecretKey: 'test-secret'
        });
    });
    (0, globals_1.describe)('handler execution', () => {
        (0, globals_1.it)('should execute handler successfully', async () => {
            const handler = new TestHandler();
            const result = await handler.execute({ input: 'test' });
            (0, globals_1.expect)(result.success).toBe(true);
            (0, globals_1.expect)(result.output).toBe('Processed: test');
        });
        (0, globals_1.it)('should handle errors gracefully', async () => {
            const handler = new TestHandler();
            const result = await handler.execute({ input: '' });
            (0, globals_1.expect)(result.success).toBe(false);
            (0, globals_1.expect)(result.error.code).toBe('TEST_ERROR');
            (0, globals_1.expect)(result.error.message).toBe('Test failed');
        });
    });
    (0, globals_1.describe)('toHandler method', () => {
        (0, globals_1.it)('should return a bound handler function', async () => {
            const handler = new TestHandler();
            const handlerFn = handler.toHandler();
            const result = await handlerFn({ input: 'test' });
            (0, globals_1.expect)(result.success).toBe(true);
            (0, globals_1.expect)(result.output).toBe('Processed: test');
        });
    });
    (0, globals_1.describe)('validation helpers', () => {
        class ValidationTestHandler extends base_handler_js_1.BaseHandler {
            constructor() {
                super('ValidationTestHandler');
            }
            async execute(params) {
                return { success: true };
            }
            // Expose protected methods for testing
            testValidateRequiredString(value, fieldName) {
                return this.validateRequiredString(value, fieldName);
            }
            testValidateString(value, fieldName) {
                return this.validateString(value, fieldName);
            }
            testValidateNumber(value, fieldName) {
                return this.validateNumber(value, fieldName);
            }
            testValidatePaginationCount(value, fieldName) {
                return this.validatePaginationCount(value, fieldName);
            }
        }
        (0, globals_1.it)('should validate required string', () => {
            const handler = new ValidationTestHandler();
            (0, globals_1.expect)(handler.testValidateRequiredString('test', 'field')).toBe('test');
            (0, globals_1.expect)(() => handler.testValidateRequiredString('', 'field')).toThrow();
            (0, globals_1.expect)(() => handler.testValidateRequiredString(null, 'field')).toThrow();
        });
        (0, globals_1.it)('should validate optional string', () => {
            const handler = new ValidationTestHandler();
            (0, globals_1.expect)(handler.testValidateString('test', 'field')).toBe('test');
            (0, globals_1.expect)(handler.testValidateString('', 'field')).toBe('');
            (0, globals_1.expect)(handler.testValidateString(null, 'field')).toBeUndefined();
        });
        (0, globals_1.it)('should validate number', () => {
            const handler = new ValidationTestHandler();
            (0, globals_1.expect)(handler.testValidateNumber(123, 'field')).toBe(123);
            (0, globals_1.expect)(handler.testValidateNumber('123', 'field')).toBe(123);
            (0, globals_1.expect)(handler.testValidateNumber(null, 'field')).toBeUndefined();
        });
        (0, globals_1.it)('should validate pagination count', () => {
            const handler = new ValidationTestHandler();
            (0, globals_1.expect)(handler.testValidatePaginationCount(25, 'field')).toBe(25);
            (0, globals_1.expect)(handler.testValidatePaginationCount(null, 'field')).toBe(10); // default
        });
    });
    (0, globals_1.describe)('logging helpers', () => {
        (0, globals_1.it)('should log info messages', () => {
            const handler = new TestHandler();
            const logSpy = globals_1.jest.spyOn(handler['context'].logger, 'info');
            handler['logInfo']('Test message', { data: 'test' });
            (0, globals_1.expect)(logSpy).toHaveBeenCalledWith({ data: 'test' }, 'Test message');
        });
        (0, globals_1.it)('should log error messages', () => {
            const handler = new TestHandler();
            const logSpy = globals_1.jest.spyOn(handler['context'].logger, 'error');
            handler['logError']('Error message', new Error('test error'));
            (0, globals_1.expect)(logSpy).toHaveBeenCalledWith({ error: globals_1.expect.any(Error) }, 'Error message');
        });
    });
    (0, globals_1.describe)('API call helpers', () => {
        (0, globals_1.it)('should have access to API call methods', () => {
            const handler = new TestHandler();
            (0, globals_1.expect)(handler['callAdminAPI']).toBeDefined();
            (0, globals_1.expect)(handler['callPlayerAPI']).toBeDefined();
            (0, globals_1.expect)(handler['callBulkAPI']).toBeDefined();
        });
    });
});
//# sourceMappingURL=base-handler.test.js.map