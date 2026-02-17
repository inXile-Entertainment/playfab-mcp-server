/**
 * Base handler class with dependency injection support
 */
import { HandlerResponse, PlayFabHandler } from '../types/index.js';
import { HandlerContext } from '../config/di-setup.js';
export declare abstract class BaseHandler<TParams, TResult> {
    protected context: HandlerContext;
    constructor(handlerName: string);
    /**
     * Execute the handler logic
     */
    abstract execute(params: TParams): Promise<HandlerResponse<TResult>>;
    /**
     * Create a handler function that can be used in the existing system
     */
    toHandler(): PlayFabHandler<TParams, TResult>;
    /**
     * Helper method to log info
     */
    protected logInfo(message: string, data?: unknown): void;
    /**
     * Helper method to log errors
     */
    protected logError(message: string, error?: unknown): void;
    /**
     * Helper method to validate required string
     */
    protected validateRequiredString(value: unknown, fieldName: string, options?: {
        maxLength?: number;
    }): string;
    /**
     * Helper method to validate optional string
     */
    protected validateString(value: unknown, fieldName: string, options?: {
        maxLength?: number;
    }): string | undefined;
    /**
     * Helper method to validate number
     */
    protected validateNumber(value: unknown, fieldName: string, options?: {
        min?: number;
        max?: number;
    }): number | undefined;
    /**
     * Helper method to validate pagination count
     */
    protected validatePaginationCount(value: unknown, fieldName: string, min?: number, defaultValue?: number): number;
    /**
     * Helper method to create error response
     */
    protected createErrorResponse(code: string, message: string, data?: unknown): HandlerResponse<TResult>;
    /**
     * Helper method to add custom tags
     */
    protected addCustomTags<T extends Record<string, unknown>>(request: T): T;
    /**
     * Helper method to call admin API
     */
    protected callAdminAPI<TRequest, TResponse extends PlayFabModule.IPlayFabResultCommon>(apiMethod: (request: TRequest, callback: PlayFabModule.ApiCallback<TResponse>) => void, request: TRequest, methodName: string): Promise<TResponse>;
    /**
     * Helper method to call player API
     */
    protected callPlayerAPI<TRequest, TResponse extends PlayFabModule.IPlayFabResultCommon>(apiMethod: (request: TRequest, callback: PlayFabModule.ApiCallback<TResponse>) => void, request: TRequest, methodName: string): Promise<TResponse>;
    /**
     * Helper method to call bulk API
     */
    protected callBulkAPI<TRequest, TResponse extends PlayFabModule.IPlayFabResultCommon>(apiMethod: (request: TRequest, callback: PlayFabModule.ApiCallback<TResponse>) => void, request: TRequest, methodName: string): Promise<TResponse>;
}
//# sourceMappingURL=base-handler.d.ts.map