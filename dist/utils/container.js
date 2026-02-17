"use strict";
/**
 * Simple Dependency Injection Container
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKENS = exports.container = exports.Container = void 0;
class Container {
    services = new Map();
    /**
     * Register a singleton service
     */
    singleton(token, factory) {
        this.services.set(token, {
            factory,
            singleton: true,
        });
        return this;
    }
    /**
     * Register a transient service (new instance each time)
     */
    transient(token, factory) {
        this.services.set(token, {
            factory,
            singleton: false,
        });
        return this;
    }
    /**
     * Register a value as a singleton
     */
    value(token, value) {
        this.services.set(token, {
            factory: () => value,
            singleton: true,
            instance: value,
        });
        return this;
    }
    /**
     * Get a service instance
     */
    get(token) {
        const definition = this.services.get(token);
        if (!definition) {
            throw new Error(`Service not found: ${String(token)}`);
        }
        // Return cached singleton instance if available
        if (definition.singleton && definition.instance !== undefined) {
            return definition.instance;
        }
        // Create new instance
        const instance = definition.factory();
        // Cache singleton instance
        if (definition.singleton) {
            definition.instance = instance;
        }
        return instance;
    }
    /**
     * Check if a service is registered
     */
    has(token) {
        return this.services.has(token);
    }
    /**
     * Create a child container that inherits from this one
     */
    createChild() {
        const child = new Container();
        // Copy all service definitions to child
        for (const [token, definition] of this.services) {
            child.services.set(token, { ...definition });
        }
        return child;
    }
    /**
     * Clear all services
     */
    clear() {
        this.services.clear();
    }
}
exports.Container = Container;
// Global container instance
exports.container = new Container();
// Service tokens
exports.TOKENS = {
    // Core services
    Logger: Symbol('Logger'),
    Config: Symbol('Config'),
    // PlayFab API clients
    PlayFabAdminAPI: Symbol('PlayFabAdminAPI'),
    PlayFabEconomyAPI: Symbol('PlayFabEconomyAPI'),
    PlayFabAuthenticationAPI: Symbol('PlayFabAuthenticationAPI'),
    PlayFabProfileAPI: Symbol('PlayFabProfileAPI'),
    PlayFabServerAPI: Symbol('PlayFabServerAPI'),
    // Utilities
    PlayFabWrapper: Symbol('PlayFabWrapper'),
    InputValidator: Symbol('InputValidator'),
    ErrorHandler: Symbol('ErrorHandler'),
    Router: Symbol('Router'),
};
//# sourceMappingURL=container.js.map