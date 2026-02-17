export type ToolHandler<TParams = unknown, TResult = unknown> = (args: TParams) => Promise<TResult>;
export interface Route<TParams = unknown, TResult = unknown> {
    handler: ToolHandler<TParams, TResult>;
    description?: string;
}
export declare class ToolRouter {
    private routes;
    /**
     * Register a tool handler
     */
    register<TParams = unknown, TResult = unknown>(name: string, handler: ToolHandler<TParams, TResult>, description?: string): void;
    /**
     * Register multiple handlers at once
     */
    registerBatch(handlers: Record<string, Route<unknown, unknown> | ToolHandler>): void;
    /**
     * Get a handler by name
     */
    get(name: string): ToolHandler<unknown, unknown> | undefined;
    /**
     * Check if a handler exists
     */
    has(name: string): boolean;
    /**
     * Execute a handler
     */
    execute<TParams = unknown, TResult = unknown>(name: string, args: TParams): Promise<TResult>;
    /**
     * Get all registered tool names
     */
    getToolNames(): string[];
    /**
     * Get all routes for debugging
     */
    getRoutes(): Array<{
        name: string;
        description?: string;
    }>;
    /**
     * Clear all routes
     */
    clear(): void;
    /**
     * Create middleware chain support
     */
    compose(...middlewares: Array<(next: ToolHandler) => ToolHandler>): (handler: ToolHandler) => ToolHandler;
}
export declare const router: ToolRouter;
export declare const withLogging: <TParams = unknown, TResult = unknown>(next: ToolHandler<TParams, TResult>) => ToolHandler<TParams, TResult>;
export declare const withValidation: <TParams = unknown, TResult = unknown>(validator: (args: TParams) => void) => (next: ToolHandler<TParams, TResult>) => ToolHandler<TParams, TResult>;
export declare const withRetry: <TParams = unknown, TResult = unknown>(retryOptions?: Partial<import("./retry.js").RetryOptions>) => (next: ToolHandler<TParams, TResult>) => ToolHandler<TParams, TResult>;
//# sourceMappingURL=router.d.ts.map