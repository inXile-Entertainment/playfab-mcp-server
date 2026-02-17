"use strict";
/**
 * Dependency Injection Setup
 * Configures all services in the DI container
 */
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
exports.setupDependencies = setupDependencies;
exports.createInjectedLogger = createInjectedLogger;
exports.getPlayFabAPIs = getPlayFabAPIs;
exports.createHandlerContext = createHandlerContext;
const container_js_1 = require("../utils/container.js");
const logger_js_1 = require("../utils/logger.js");
const router_js_1 = require("../utils/router.js");
const playfab_js_1 = require("../config/playfab.js");
// Import utilities
const inputValidator = __importStar(require("../utils/input-validator.js"));
const errorUtils = __importStar(require("../utils/errors.js"));
const playfabWrapper = __importStar(require("../utils/playfab-wrapper.js"));
/**
 * Initialize the DI container with all services
 */
function setupDependencies(config) {
    // Configuration
    const appConfig = {
        titleId: process.env['PLAYFAB_TITLE_ID'] || '',
        developerSecretKey: process.env['PLAYFAB_DEV_SECRET_KEY'] || '',
        environment: process.env['NODE_ENV'] || 'development',
        logLevel: process.env['LOG_LEVEL'] || 'info',
        ...config
    };
    // Validate required config
    if (!appConfig.titleId || !appConfig.developerSecretKey) {
        throw new Error('Missing required PlayFab configuration: PLAYFAB_TITLE_ID and PLAYFAB_DEV_SECRET_KEY must be set');
    }
    // Configure PlayFab SDK
    playfab_js_1.PlayFab.settings.titleId = appConfig.titleId;
    playfab_js_1.PlayFab.settings.developerSecretKey = appConfig.developerSecretKey;
    // Register core services
    container_js_1.container
        .value(container_js_1.TOKENS.Config, appConfig)
        .singleton(container_js_1.TOKENS.Logger, () => logger_js_1.logger)
        .singleton(container_js_1.TOKENS.Router, () => router_js_1.router);
    // Register PlayFab API clients
    container_js_1.container
        .value(container_js_1.TOKENS.PlayFabAdminAPI, playfab_js_1.PlayFabAdminAPI)
        .value(container_js_1.TOKENS.PlayFabEconomyAPI, playfab_js_1.PlayFabEconomyAPI)
        .value(container_js_1.TOKENS.PlayFabAuthenticationAPI, playfab_js_1.PlayFabAuthenticationAPI)
        .value(container_js_1.TOKENS.PlayFabProfileAPI, playfab_js_1.PlayFabProfileAPI)
        .value(container_js_1.TOKENS.PlayFabServerAPI, playfab_js_1.PlayFabServerAPI);
    // Register utilities
    container_js_1.container
        .value(container_js_1.TOKENS.PlayFabWrapper, playfabWrapper)
        .value(container_js_1.TOKENS.InputValidator, inputValidator)
        .value(container_js_1.TOKENS.ErrorHandler, errorUtils);
}
/**
 * Create a logger with dependency injection
 */
function createInjectedLogger(module) {
    return (0, logger_js_1.createLogger)(module);
}
/**
 * Get PlayFab APIs from container
 */
function getPlayFabAPIs() {
    return {
        adminAPI: container_js_1.container.get(container_js_1.TOKENS.PlayFabAdminAPI),
        economyAPI: container_js_1.container.get(container_js_1.TOKENS.PlayFabEconomyAPI),
        authenticationAPI: container_js_1.container.get(container_js_1.TOKENS.PlayFabAuthenticationAPI),
        profileAPI: container_js_1.container.get(container_js_1.TOKENS.PlayFabProfileAPI),
        serverAPI: container_js_1.container.get(container_js_1.TOKENS.PlayFabServerAPI),
    };
}
function createHandlerContext(handlerName) {
    return {
        logger: createInjectedLogger(handlerName),
        config: container_js_1.container.get(container_js_1.TOKENS.Config),
        apis: getPlayFabAPIs(),
        utils: {
            validator: container_js_1.container.get(container_js_1.TOKENS.InputValidator),
            errors: container_js_1.container.get(container_js_1.TOKENS.ErrorHandler),
            wrapper: container_js_1.container.get(container_js_1.TOKENS.PlayFabWrapper),
        },
    };
}
//# sourceMappingURL=di-setup.js.map