/**
 * Simple Dependency Injection Container
 */
type Constructor<T = {}> = new (...args: any[]) => T;
type Factory<T> = () => T;
type Token<T> = string | symbol | Constructor<T>;
export declare class Container {
    private services;
    /**
     * Register a singleton service
     */
    singleton<T>(token: Token<T>, factory: Factory<T>): this;
    /**
     * Register a transient service (new instance each time)
     */
    transient<T>(token: Token<T>, factory: Factory<T>): this;
    /**
     * Register a value as a singleton
     */
    value<T>(token: Token<T>, value: T): this;
    /**
     * Get a service instance
     */
    get<T>(token: Token<T>): T;
    /**
     * Check if a service is registered
     */
    has<T>(token: Token<T>): boolean;
    /**
     * Create a child container that inherits from this one
     */
    createChild(): Container;
    /**
     * Clear all services
     */
    clear(): void;
}
export declare const container: Container;
export declare const TOKENS: {
    readonly Logger: symbol;
    readonly Config: symbol;
    readonly PlayFabAdminAPI: symbol;
    readonly PlayFabEconomyAPI: symbol;
    readonly PlayFabAuthenticationAPI: symbol;
    readonly PlayFabProfileAPI: symbol;
    readonly PlayFabServerAPI: symbol;
    readonly PlayFabWrapper: symbol;
    readonly InputValidator: symbol;
    readonly ErrorHandler: symbol;
    readonly Router: symbol;
};
export {};
//# sourceMappingURL=container.d.ts.map