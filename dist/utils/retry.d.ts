export interface RetryOptions {
    maxRetries: number;
    baseDelay: number;
    maxDelay: number;
    exponentialBackoff: boolean;
    jitter: boolean;
    retryableErrors: string[];
}
export declare const DEFAULT_RETRY_OPTIONS: RetryOptions;
/**
 * Determines if an error is retryable
 */
export declare function isRetryableError(error: unknown, options?: RetryOptions): boolean;
/**
 * Calculates the delay for a retry attempt
 */
export declare function calculateRetryDelay(attempt: number, options?: RetryOptions, retryAfter?: number): number;
/**
 * Retries a function with PlayFab-specific logic
 */
export declare function retryWithPlayFabLogic<T>(fn: () => Promise<T>, options?: Partial<RetryOptions>): Promise<T>;
/**
 * Creates a retry middleware for the router
 */
export declare function createRetryMiddleware(options?: Partial<RetryOptions>): <TParams = unknown, TResult = unknown>(next: (args: TParams) => Promise<TResult>) => (args: TParams) => Promise<TResult>;
/**
 * PlayFab-specific retry configurations
 */
export declare const PLAYFAB_RETRY_CONFIGS: {
    readonly strict: {
        readonly maxRetries: 2;
        readonly baseDelay: 2000;
        readonly maxDelay: 10000;
        readonly exponentialBackoff: true;
        readonly jitter: true;
    };
    readonly standard: {
        readonly maxRetries: 3;
        readonly baseDelay: 1000;
        readonly maxDelay: 15000;
        readonly exponentialBackoff: true;
        readonly jitter: true;
    };
    readonly bulk: {
        readonly maxRetries: 5;
        readonly baseDelay: 5000;
        readonly maxDelay: 60000;
        readonly exponentialBackoff: true;
        readonly jitter: true;
    };
};
//# sourceMappingURL=retry.d.ts.map