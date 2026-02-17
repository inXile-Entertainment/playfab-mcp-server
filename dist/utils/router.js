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
exports.withRetry = exports.withValidation = exports.withLogging = exports.router = exports.ToolRouter = void 0;
/**
 * Router pattern implementation for MCP tool handlers
 */
const logger_js_1 = require("./logger.js");
const logger = (0, logger_js_1.createLogger)('router');
class ToolRouter {
    routes = new Map();
    /**
     * Register a tool handler
     */
    register(name, handler, description) {
        if (this.routes.has(name)) {
            logger.warn({ tool: name }, `Overwriting existing handler for tool: ${name}`);
        }
        this.routes.set(name, { handler: handler, description });
        logger.debug({ tool: name, description }, `Registered handler for tool: ${name}`);
    }
    /**
     * Register multiple handlers at once
     */
    registerBatch(handlers) {
        Object.entries(handlers).forEach(([name, value]) => {
            if (typeof value === 'function') {
                this.register(name, value);
            }
            else {
                this.register(name, value.handler, value.description);
            }
        });
    }
    /**
     * Get a handler by name
     */
    get(name) {
        return this.routes.get(name)?.handler;
    }
    /**
     * Check if a handler exists
     */
    has(name) {
        return this.routes.has(name);
    }
    /**
     * Execute a handler
     */
    async execute(name, args) {
        const route = this.routes.get(name);
        if (!route) {
            throw new Error(`Unknown tool: ${name}`);
        }
        logger.debug({ tool: name, hasArgs: !!args }, `Executing handler for tool: ${name}`);
        try {
            return await route.handler(args);
        }
        catch (error) {
            logger.error({ tool: name, error }, `Handler failed for tool: ${name}`);
            throw error;
        }
    }
    /**
     * Get all registered tool names
     */
    getToolNames() {
        return Array.from(this.routes.keys());
    }
    /**
     * Get all routes for debugging
     */
    getRoutes() {
        return Array.from(this.routes.entries()).map(([name, route]) => ({
            name,
            description: route.description,
        }));
    }
    /**
     * Clear all routes
     */
    clear() {
        this.routes.clear();
        logger.debug('Cleared all routes');
    }
    /**
     * Create middleware chain support
     */
    compose(...middlewares) {
        return (handler) => {
            return middlewares.reduceRight((next, middleware) => middleware(next), handler);
        };
    }
}
exports.ToolRouter = ToolRouter;
// Create singleton instance
exports.router = new ToolRouter();
// Middleware examples
const withLogging = (next) => {
    return async (args) => {
        logger.debug({ args }, 'Middleware: withLogging - before');
        const result = await next(args);
        logger.debug({ result }, 'Middleware: withLogging - after');
        return result;
    };
};
exports.withLogging = withLogging;
const withValidation = (validator) => {
    return (next) => {
        return async (args) => {
            validator(args);
            return next(args);
        };
    };
};
exports.withValidation = withValidation;
const withRetry = (retryOptions = {}) => {
    return (next) => {
        return async (args) => {
            const { retryWithPlayFabLogic } = await Promise.resolve().then(() => __importStar(require('./retry.js')));
            return retryWithPlayFabLogic(() => next(args), retryOptions);
        };
    };
};
exports.withRetry = withRetry;
//# sourceMappingURL=router.js.map