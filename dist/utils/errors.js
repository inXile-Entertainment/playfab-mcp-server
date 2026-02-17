"use strict";
/**
 * Custom error classes and error handling utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayFabAPIError = exports.RateLimitError = exports.AuthenticationError = exports.ValidationError = exports.PlayFabMCPError = void 0;
exports.formatErrorResponse = formatErrorResponse;
exports.isPlayFabError = isPlayFabError;
exports.wrapPlayFabError = wrapPlayFabError;
exports.createErrorResponse = createErrorResponse;
class PlayFabMCPError extends Error {
    code;
    statusCode;
    details;
    constructor(message, code, statusCode, details) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
        this.name = 'PlayFabMCPError';
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.PlayFabMCPError = PlayFabMCPError;
class ValidationError extends PlayFabMCPError {
    constructor(message, details) {
        super(message, 'VALIDATION_ERROR', 400, details);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class AuthenticationError extends PlayFabMCPError {
    constructor(message, details) {
        super(message, 'AUTHENTICATION_ERROR', 401, details);
        this.name = 'AuthenticationError';
    }
}
exports.AuthenticationError = AuthenticationError;
class RateLimitError extends PlayFabMCPError {
    constructor(message, retryAfter) {
        super(message, 'RATE_LIMIT_ERROR', 429, { retryAfter });
        this.name = 'RateLimitError';
    }
}
exports.RateLimitError = RateLimitError;
class PlayFabAPIError extends PlayFabMCPError {
    playfabError;
    apiMethod;
    constructor(message, playfabError, apiMethod) {
        super(message, playfabError?.errorCode ?? 'PLAYFAB_API_ERROR', playfabError?.code ?? 500, { playfabError, apiMethod });
        this.playfabError = playfabError;
        this.apiMethod = apiMethod;
        this.name = 'PlayFabAPIError';
    }
}
exports.PlayFabAPIError = PlayFabAPIError;
/**
 * Formats error response in a consistent structure
 */
function formatErrorResponse(error) {
    const isDevelopment = process.env['NODE_ENV'] !== 'production';
    if (error instanceof PlayFabMCPError) {
        const details = isDevelopment ? error.details : undefined;
        return {
            success: false,
            error: {
                message: error.message,
                code: error.code,
                statusCode: error.statusCode,
                details,
            },
        };
    }
    if (error instanceof Error) {
        // In production, only return safe error information
        const details = isDevelopment ? {
            name: error.name,
            stack: error.stack,
        } : undefined;
        return {
            success: false,
            error: {
                message: error.message,
                code: 'INTERNAL_ERROR',
                statusCode: 500,
                details,
            },
        };
    }
    return {
        success: false,
        error: {
            message: 'An unknown error occurred',
            code: 'UNKNOWN_ERROR',
            statusCode: 500,
            details: isDevelopment ? error : undefined,
        },
    };
}
/**
 * Type guard to check if an error is a PlayFab error
 */
function isPlayFabError(error) {
    return (typeof error === 'object' &&
        error !== null &&
        ('error' in error || 'errorCode' in error || 'errorMessage' in error));
}
/**
 * Wraps PlayFab API errors in a consistent format
 */
function wrapPlayFabError(error, apiMethod) {
    if (isPlayFabError(error)) {
        const message = error.errorMessage ?? error.error ?? 'PlayFab API error occurred';
        return new PlayFabAPIError(message, error, apiMethod);
    }
    return new PlayFabAPIError('An unexpected error occurred while calling PlayFab API', error, apiMethod);
}
/**
 * Creates an error response with custom code and message
 */
function createErrorResponse(code, message, data) {
    return {
        success: false,
        error: {
            code,
            message,
            details: data
        }
    };
}
//# sourceMappingURL=errors.js.map