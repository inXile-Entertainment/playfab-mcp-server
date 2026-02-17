"use strict";
/**
 * Handler Factory for creating handlers with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlerFactory = void 0;
exports.RegisterHandler = RegisterHandler;
class HandlerFactory {
    static handlers = new Map();
    /**
     * Register a handler class
     */
    static register(name, HandlerClass) {
        if (!this.handlers.has(name)) {
            this.handlers.set(name, new HandlerClass());
        }
    }
    /**
     * Get a handler instance
     */
    static get(name) {
        return this.handlers.get(name);
    }
    /**
     * Get a handler function
     */
    static getHandler(name) {
        const handler = this.handlers.get(name);
        return handler?.toHandler();
    }
    /**
     * Clear all handlers (useful for testing)
     */
    static clear() {
        this.handlers.clear();
    }
    /**
     * Get all registered handler names
     */
    static getHandlerNames() {
        return Array.from(this.handlers.keys());
    }
}
exports.HandlerFactory = HandlerFactory;
/**
 * Decorator for auto-registering handlers
 */
function RegisterHandler(name) {
    return function (constructor) {
        HandlerFactory.register(name, constructor);
        return constructor;
    };
}
//# sourceMappingURL=handler-factory.js.map