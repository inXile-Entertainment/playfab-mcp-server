"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logToolCall = exports.logAPICall = exports.PerformanceLogger = exports.createRequestLogger = exports.createLogger = exports.logger = void 0;
/**
 * Logging utility using Pino
 */
const pino_1 = __importDefault(require("pino"));
const env_validator_js_1 = require("./env-validator.js");
// Define log levels
const LOG_LEVELS = {
    production: 'info',
    development: 'debug',
    test: 'warn',
};
// Get log level based on environment
const logLevel = LOG_LEVELS[(0, env_validator_js_1.getEnvironmentName)()] || 'info';
// Create logger instance
// MCP仕様: stdoutはMCPメッセージ専用、ログはstderrに出力する必要がある
// See: https://modelcontextprotocol.io/specification/2025-06-18/basic/transports
const loggerOptions = {
    level: logLevel,
    timestamp: pino_1.default.stdTimeFunctions.isoTime,
    formatters: {
        level: (label) => {
            return { level: label };
        },
    },
    redact: {
        paths: [
            'PLAYFAB_DEV_SECRET_KEY',
            'EntityToken',
            'SessionTicket',
            'Password',
            'Email',
            'req.headers.authorization',
            'res.headers["set-cookie"]',
            '*.password',
            '*.secret',
            '*.token',
            '*.key',
        ],
        remove: true,
    },
    transport: (0, env_validator_js_1.isDevelopment)() ? {
        target: 'pino-pretty',
        options: {
            colorize: true,
            ignore: 'pid,hostname',
            translateTime: 'HH:MM:ss.l',
            destination: 2, // stderr (MCP仕様準拠)
        },
    } : undefined,
};
// 本番環境ではtransportを使用しないため、直接stderrを指定
const stderrDestination = pino_1.default.destination ? pino_1.default.destination(2) : undefined;
exports.logger = (0, env_validator_js_1.isDevelopment)()
    ? (0, pino_1.default)(loggerOptions)
    : (0, pino_1.default)(loggerOptions, stderrDestination); // 2 = stderr
// Create child loggers for different modules
const createLogger = (module) => {
    return exports.logger.child({ module });
};
exports.createLogger = createLogger;
const createRequestLogger = (context) => {
    return exports.logger.child({ ...context });
};
exports.createRequestLogger = createRequestLogger;
// Performance logging helper
class PerformanceLogger {
    startTime;
    logger;
    constructor(operationName, logger = (0, exports.createLogger)('performance')) {
        this.startTime = Date.now();
        this.logger = logger;
        this.logger.debug({ operation: operationName }, 'Operation started');
    }
    end(additionalData) {
        const duration = Date.now() - this.startTime;
        this.logger.info({
            duration_ms: duration,
            ...additionalData,
        }, 'Operation completed');
    }
    error(error, additionalData) {
        const duration = Date.now() - this.startTime;
        this.logger.error({
            duration_ms: duration,
            error: error instanceof Error ? {
                message: error.message,
                name: error.name,
                stack: (0, env_validator_js_1.isDevelopment)() ? error.stack : undefined,
            } : error,
            ...additionalData,
        }, 'Operation failed');
    }
}
exports.PerformanceLogger = PerformanceLogger;
// Structured logging helpers
const logAPICall = (method, request, response, duration, error) => {
    const log = (0, exports.createLogger)('api');
    if (error) {
        log.error({
            method,
            request: (0, env_validator_js_1.isDevelopment)() ? request : undefined,
            error: error instanceof Error ? {
                message: error.message,
                code: error.code,
            } : error,
            duration_ms: duration,
        }, `PlayFab API call failed: ${method}`);
    }
    else {
        log.info({
            method,
            request: (0, env_validator_js_1.isDevelopment)() ? request : undefined,
            response: (0, env_validator_js_1.isDevelopment)() ? response : undefined,
            duration_ms: duration,
        }, `PlayFab API call succeeded: ${method}`);
    }
};
exports.logAPICall = logAPICall;
// Log MCP tool calls
const logToolCall = (toolName, args, result, duration, error) => {
    const log = (0, exports.createLogger)('mcp');
    if (error) {
        log.error({
            tool: toolName,
            args: (0, env_validator_js_1.isDevelopment)() ? args : undefined,
            error: error instanceof Error ? {
                message: error.message,
                stack: (0, env_validator_js_1.isDevelopment)() ? error.stack : undefined,
            } : error,
            duration_ms: duration,
        }, `MCP tool call failed: ${toolName}`);
    }
    else {
        log.debug({
            tool: toolName,
            args: (0, env_validator_js_1.isDevelopment)() ? args : undefined,
            result: (0, env_validator_js_1.isDevelopment)() ? result : undefined,
            duration_ms: duration,
        }, `MCP tool call completed: ${toolName}`);
    }
};
exports.logToolCall = logToolCall;
//# sourceMappingURL=logger.js.map