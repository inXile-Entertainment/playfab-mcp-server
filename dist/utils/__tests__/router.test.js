"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests for router utilities
 */
const router_1 = require("../router");
// Mock logger to avoid console output during tests
jest.mock('../logger', () => ({
    createLogger: () => ({
        debug: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
    })
}));
// Mock retry utility
jest.mock('../retry', () => ({
    retryWithPlayFabLogic: jest.fn((fn, options) => fn()),
}));
describe('ToolRouter', () => {
    let router;
    beforeEach(() => {
        router = new router_1.ToolRouter();
        jest.clearAllMocks();
    });
    describe('register', () => {
        it('should register a handler', () => {
            const handler = jest.fn();
            router.register('test-tool', handler, 'Test tool description');
            expect(router.has('test-tool')).toBe(true);
            expect(router.get('test-tool')).toBe(handler);
        });
        it('should warn when overwriting existing handler', () => {
            const handler1 = jest.fn();
            const handler2 = jest.fn();
            router.register('test-tool', handler1);
            router.register('test-tool', handler2);
            expect(router.get('test-tool')).toBe(handler2);
        });
    });
    describe('registerBatch', () => {
        it('should register multiple handlers as functions', () => {
            const handlers = {
                'tool1': jest.fn(),
                'tool2': jest.fn(),
            };
            router.registerBatch(handlers);
            expect(router.has('tool1')).toBe(true);
            expect(router.has('tool2')).toBe(true);
        });
        it('should register multiple handlers as route objects', () => {
            const handlers = {
                'tool1': { handler: jest.fn(), description: 'Tool 1' },
                'tool2': { handler: jest.fn(), description: 'Tool 2' },
            };
            router.registerBatch(handlers);
            expect(router.has('tool1')).toBe(true);
            expect(router.has('tool2')).toBe(true);
        });
    });
    describe('execute', () => {
        it('should execute registered handler', async () => {
            const handler = jest.fn().mockResolvedValueOnce('result');
            const args = { param: 'value' };
            router.register('test-tool', handler);
            const result = await router.execute('test-tool', args);
            expect(result).toBe('result');
            expect(handler).toHaveBeenCalledWith(args);
        });
        it('should throw error for unregistered handler', async () => {
            await expect(router.execute('unknown-tool', {}))
                .rejects.toThrow('Unknown tool: unknown-tool');
        });
        it('should propagate handler errors', async () => {
            const error = new Error('Handler error');
            const handler = jest.fn().mockRejectedValueOnce(error);
            router.register('failing-tool', handler);
            await expect(router.execute('failing-tool', {}))
                .rejects.toThrow('Handler error');
        });
    });
    describe('utility methods', () => {
        it('should return all tool names', () => {
            router.register('tool1', jest.fn());
            router.register('tool2', jest.fn());
            const toolNames = router.getToolNames();
            expect(toolNames).toContain('tool1');
            expect(toolNames).toContain('tool2');
            expect(toolNames).toHaveLength(2);
        });
        it('should return all routes', () => {
            router.register('tool1', jest.fn(), 'Description 1');
            router.register('tool2', jest.fn(), 'Description 2');
            const routes = router.getRoutes();
            expect(routes).toEqual([
                { name: 'tool1', description: 'Description 1' },
                { name: 'tool2', description: 'Description 2' },
            ]);
        });
        it('should clear all routes', () => {
            router.register('tool1', jest.fn());
            router.register('tool2', jest.fn());
            router.clear();
            expect(router.getToolNames()).toHaveLength(0);
        });
    });
    describe('middleware composition', () => {
        it('should compose middleware functions', () => {
            const middleware1 = (next) => (args) => next({ ...args, middleware1: true });
            const middleware2 = (next) => (args) => next({ ...args, middleware2: true });
            const composed = router.compose(middleware1, middleware2);
            const handler = jest.fn((args) => args);
            const wrappedHandler = composed(handler);
            const result = wrappedHandler({ original: true });
            expect(handler).toHaveBeenCalledWith({
                original: true,
                middleware1: true,
                middleware2: true,
            });
        });
    });
});
describe('Middleware functions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('withLogging', () => {
        it('should log before and after handler execution', async () => {
            const handler = jest.fn().mockResolvedValueOnce('result');
            const args = { param: 'value' };
            const wrappedHandler = (0, router_1.withLogging)(handler);
            const result = await wrappedHandler(args);
            expect(result).toBe('result');
            expect(handler).toHaveBeenCalledWith(args);
        });
    });
    describe('withValidation', () => {
        it('should call validator before handler', async () => {
            const validator = jest.fn();
            const handler = jest.fn().mockResolvedValueOnce('result');
            const args = { param: 'value' };
            const middleware = (0, router_1.withValidation)(validator);
            const wrappedHandler = middleware(handler);
            const result = await wrappedHandler(args);
            expect(validator).toHaveBeenCalledWith(args);
            expect(handler).toHaveBeenCalledWith(args);
            expect(result).toBe('result');
        });
        it('should propagate validation errors', async () => {
            const error = new Error('Validation failed');
            const validator = jest.fn().mockImplementationOnce(() => { throw error; });
            const handler = jest.fn();
            const middleware = (0, router_1.withValidation)(validator);
            const wrappedHandler = middleware(handler);
            await expect(wrappedHandler({}))
                .rejects.toThrow('Validation failed');
            expect(handler).not.toHaveBeenCalled();
        });
    });
    describe('withRetry', () => {
        it('should apply retry logic', async () => {
            const { retryWithPlayFabLogic } = await Promise.resolve().then(() => __importStar(require('../retry')));
            const handler = jest.fn().mockResolvedValueOnce('result');
            const args = { param: 'value' };
            const middleware = (0, router_1.withRetry)({ maxRetries: 3 });
            const wrappedHandler = middleware(handler);
            await wrappedHandler(args);
            expect(retryWithPlayFabLogic).toHaveBeenCalledWith(expect.any(Function), { maxRetries: 3 });
        });
    });
});
//# sourceMappingURL=router.test.js.map