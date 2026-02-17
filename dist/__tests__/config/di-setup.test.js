"use strict";
/**
 * Tests for dependency injection setup
 */
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const di_setup_js_1 = require("../../config/di-setup.js");
const container_js_1 = require("../../utils/container.js");
(0, globals_1.describe)('DI Setup', () => {
    const originalEnv = process.env;
    (0, globals_1.beforeEach)(() => {
        // Clear container before each test
        container_js_1.container.clear();
        // Reset environment
        process.env = { ...originalEnv };
    });
    (0, globals_1.afterEach)(() => {
        process.env = originalEnv;
    });
    (0, globals_1.describe)('setupDependencies', () => {
        (0, globals_1.it)('should throw error when titleId is missing', () => {
            delete process.env['PLAYFAB_TITLE_ID'];
            process.env['PLAYFAB_DEV_SECRET_KEY'] = 'test-secret';
            (0, globals_1.expect)(() => (0, di_setup_js_1.setupDependencies)()).toThrow('Missing required PlayFab configuration');
        });
        (0, globals_1.it)('should throw error when developerSecretKey is missing', () => {
            process.env['PLAYFAB_TITLE_ID'] = 'test-title';
            delete process.env['PLAYFAB_DEV_SECRET_KEY'];
            (0, globals_1.expect)(() => (0, di_setup_js_1.setupDependencies)()).toThrow('Missing required PlayFab configuration');
        });
        (0, globals_1.it)('should setup dependencies with environment variables', () => {
            process.env['PLAYFAB_TITLE_ID'] = 'test-title';
            process.env['PLAYFAB_DEV_SECRET_KEY'] = 'test-secret';
            process.env['NODE_ENV'] = 'test';
            process.env['LOG_LEVEL'] = 'debug';
            (0, di_setup_js_1.setupDependencies)();
            const config = container_js_1.container.get(container_js_1.TOKENS.Config);
            (0, globals_1.expect)(config.titleId).toBe('test-title');
            (0, globals_1.expect)(config.developerSecretKey).toBe('test-secret');
            (0, globals_1.expect)(config.environment).toBe('test');
            (0, globals_1.expect)(config.logLevel).toBe('debug');
        });
        (0, globals_1.it)('should setup dependencies with custom config', () => {
            const customConfig = {
                titleId: 'custom-title',
                developerSecretKey: 'custom-secret',
                environment: 'production',
                logLevel: 'error'
            };
            (0, di_setup_js_1.setupDependencies)(customConfig);
            const config = container_js_1.container.get(container_js_1.TOKENS.Config);
            (0, globals_1.expect)(config.titleId).toBe('custom-title');
            (0, globals_1.expect)(config.developerSecretKey).toBe('custom-secret');
            (0, globals_1.expect)(config.environment).toBe('production');
            (0, globals_1.expect)(config.logLevel).toBe('error');
        });
        (0, globals_1.it)('should register all required services', () => {
            (0, di_setup_js_1.setupDependencies)({
                titleId: 'test',
                developerSecretKey: 'secret'
            });
            // Check core services
            (0, globals_1.expect)(container_js_1.container.has(container_js_1.TOKENS.Config)).toBe(true);
            (0, globals_1.expect)(container_js_1.container.has(container_js_1.TOKENS.Logger)).toBe(true);
            (0, globals_1.expect)(container_js_1.container.has(container_js_1.TOKENS.Router)).toBe(true);
            // Check PlayFab APIs
            (0, globals_1.expect)(container_js_1.container.has(container_js_1.TOKENS.PlayFabAdminAPI)).toBe(true);
            (0, globals_1.expect)(container_js_1.container.has(container_js_1.TOKENS.PlayFabEconomyAPI)).toBe(true);
            (0, globals_1.expect)(container_js_1.container.has(container_js_1.TOKENS.PlayFabAuthenticationAPI)).toBe(true);
            (0, globals_1.expect)(container_js_1.container.has(container_js_1.TOKENS.PlayFabProfileAPI)).toBe(true);
            (0, globals_1.expect)(container_js_1.container.has(container_js_1.TOKENS.PlayFabServerAPI)).toBe(true);
            // Check utilities
            (0, globals_1.expect)(container_js_1.container.has(container_js_1.TOKENS.PlayFabWrapper)).toBe(true);
            (0, globals_1.expect)(container_js_1.container.has(container_js_1.TOKENS.InputValidator)).toBe(true);
            (0, globals_1.expect)(container_js_1.container.has(container_js_1.TOKENS.ErrorHandler)).toBe(true);
        });
    });
    (0, globals_1.describe)('getPlayFabAPIs', () => {
        (0, globals_1.it)('should return all PlayFab APIs', () => {
            (0, di_setup_js_1.setupDependencies)({
                titleId: 'test',
                developerSecretKey: 'secret'
            });
            const apis = (0, di_setup_js_1.getPlayFabAPIs)();
            (0, globals_1.expect)(apis).toHaveProperty('adminAPI');
            (0, globals_1.expect)(apis).toHaveProperty('economyAPI');
            (0, globals_1.expect)(apis).toHaveProperty('authenticationAPI');
            (0, globals_1.expect)(apis).toHaveProperty('profileAPI');
            (0, globals_1.expect)(apis).toHaveProperty('serverAPI');
        });
    });
    (0, globals_1.describe)('createHandlerContext', () => {
        (0, globals_1.it)('should create handler context with all dependencies', () => {
            (0, di_setup_js_1.setupDependencies)({
                titleId: 'test',
                developerSecretKey: 'secret'
            });
            const context = (0, di_setup_js_1.createHandlerContext)('TestHandler');
            // Check logger
            (0, globals_1.expect)(context.logger).toBeDefined();
            (0, globals_1.expect)(context.logger).toHaveProperty('info');
            (0, globals_1.expect)(context.logger).toHaveProperty('error');
            (0, globals_1.expect)(context.logger).toHaveProperty('warn');
            (0, globals_1.expect)(context.logger).toHaveProperty('debug');
            // Check config
            (0, globals_1.expect)(context.config).toBeDefined();
            (0, globals_1.expect)(context.config.titleId).toBe('test');
            // Check APIs
            (0, globals_1.expect)(context.apis).toBeDefined();
            (0, globals_1.expect)(context.apis).toHaveProperty('adminAPI');
            (0, globals_1.expect)(context.apis).toHaveProperty('economyAPI');
            // Check utils
            (0, globals_1.expect)(context.utils).toBeDefined();
            (0, globals_1.expect)(context.utils.validator).toBeDefined();
            (0, globals_1.expect)(context.utils.errors).toBeDefined();
            (0, globals_1.expect)(context.utils.wrapper).toBeDefined();
        });
    });
});
//# sourceMappingURL=di-setup.test.js.map