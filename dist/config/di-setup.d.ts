/**
 * Dependency Injection Setup
 * Configures all services in the DI container
 */
import { createLogger } from '../utils/logger.js';
import * as inputValidator from '../utils/input-validator.js';
import * as errorUtils from '../utils/errors.js';
import * as playfabWrapper from '../utils/playfab-wrapper.js';
export interface AppConfig {
    titleId: string;
    developerSecretKey: string;
    environment: string;
    logLevel: string;
}
/**
 * Initialize the DI container with all services
 */
export declare function setupDependencies(config?: Partial<AppConfig>): void;
/**
 * Create a logger with dependency injection
 */
export declare function createInjectedLogger(module: string): import("pino").Logger<never, boolean>;
/**
 * Get PlayFab APIs from container
 */
export declare function getPlayFabAPIs(): {
    adminAPI: unknown;
    economyAPI: unknown;
    authenticationAPI: unknown;
    profileAPI: unknown;
    serverAPI: unknown;
};
/**
 * Create a handler context with injected dependencies
 */
export interface HandlerContext {
    logger: ReturnType<typeof createLogger>;
    config: AppConfig;
    apis: ReturnType<typeof getPlayFabAPIs>;
    utils: {
        validator: typeof inputValidator;
        errors: typeof errorUtils;
        wrapper: typeof playfabWrapper;
    };
}
export declare function createHandlerContext(handlerName: string): HandlerContext;
//# sourceMappingURL=di-setup.d.ts.map