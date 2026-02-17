/**
 * Handler Factory for creating handlers with dependency injection
 */
import { BaseHandler } from './base-handler.js';
import { PlayFabHandler } from '../types/index.js';
export declare class HandlerFactory {
    private static handlers;
    /**
     * Register a handler class
     */
    static register<TParams, TResult>(name: string, HandlerClass: new () => BaseHandler<TParams, TResult>): void;
    /**
     * Get a handler instance
     */
    static get<TParams, TResult>(name: string): BaseHandler<TParams, TResult> | undefined;
    /**
     * Get a handler function
     */
    static getHandler<TParams, TResult>(name: string): PlayFabHandler<TParams, TResult> | undefined;
    /**
     * Clear all handlers (useful for testing)
     */
    static clear(): void;
    /**
     * Get all registered handler names
     */
    static getHandlerNames(): string[];
}
/**
 * Decorator for auto-registering handlers
 */
export declare function RegisterHandler(name: string): <T extends new () => BaseHandler<any, any>>(constructor: T) => T;
//# sourceMappingURL=handler-factory.d.ts.map