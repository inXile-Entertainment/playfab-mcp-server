/**
 * Custom error classes and error handling utilities
 */
export declare class PlayFabMCPError extends Error {
    readonly code: string;
    readonly statusCode?: number | undefined;
    readonly details?: unknown | undefined;
    constructor(message: string, code: string, statusCode?: number | undefined, details?: unknown | undefined);
}
export declare class ValidationError extends PlayFabMCPError {
    constructor(message: string, details?: unknown);
}
export declare class AuthenticationError extends PlayFabMCPError {
    constructor(message: string, details?: unknown);
}
export declare class RateLimitError extends PlayFabMCPError {
    constructor(message: string, retryAfter?: number);
}
export interface PlayFabErrorDetails {
    errorCode?: string;
    errorMessage?: string;
    code?: number;
    [key: string]: unknown;
}
export declare class PlayFabAPIError extends PlayFabMCPError {
    readonly playfabError: PlayFabErrorDetails;
    readonly apiMethod?: string | undefined;
    constructor(message: string, playfabError: PlayFabErrorDetails, apiMethod?: string | undefined);
}
/**
 * Formats error response in a consistent structure
 */
export declare function formatErrorResponse(error: unknown): {
    success: false;
    error: {
        message: string;
        code: string;
        statusCode?: number;
        details?: unknown;
    };
};
/**
 * Type guard to check if an error is a PlayFab error
 */
export declare function isPlayFabError(error: unknown): error is {
    error?: string;
    errorCode?: number;
    errorMessage?: string;
    code?: number;
};
/**
 * Wraps PlayFab API errors in a consistent format
 */
export declare function wrapPlayFabError(error: unknown, apiMethod: string): PlayFabAPIError;
/**
 * Creates an error response with custom code and message
 */
export declare function createErrorResponse(code: string, message: string, data?: unknown): {
    success: false;
    error: {
        code: string;
        message: string;
        details?: unknown;
    };
};
//# sourceMappingURL=errors.d.ts.map