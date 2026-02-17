import { RetryOptions } from './retry.js';
export interface PlayFabApiCall<TRequest, TResponse> {
    (request: TRequest, callback: (error: unknown, result: {
        data: TResponse;
    } | null) => void): void;
}
/**
 * Wraps a PlayFab API call in a Promise with proper error handling and retry logic
 */
export declare function callPlayFabApi<TRequest, TResponse>(apiMethod: PlayFabApiCall<TRequest, TResponse>, request: TRequest, methodName: string, retryOptions?: Partial<RetryOptions>): Promise<TResponse>;
/**
 * Add custom tags to a request
 */
export declare function addCustomTags<T>(request: T, tags?: Record<string, string>): T & {
    CustomTags: Record<string, string>;
};
/**
 * Convenience functions for different API categories
 */
export declare function callPlayerAPI<TRequest, TResponse>(apiMethod: PlayFabApiCall<TRequest, TResponse>, request: TRequest, methodName: string): Promise<TResponse>;
export declare function callAdminAPI<TRequest, TResponse>(apiMethod: PlayFabApiCall<TRequest, TResponse>, request: TRequest, methodName: string): Promise<TResponse>;
export declare function callBulkAPI<TRequest, TResponse>(apiMethod: PlayFabApiCall<TRequest, TResponse>, request: TRequest, methodName: string): Promise<TResponse>;
//# sourceMappingURL=playfab-wrapper.d.ts.map