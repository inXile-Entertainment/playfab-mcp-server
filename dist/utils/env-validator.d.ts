/**
 * Environment variable validation utilities
 */
export interface RequiredEnvVars {
    PLAYFAB_TITLE_ID: string;
    PLAYFAB_DEV_SECRET_KEY: string;
}
export declare class EnvironmentValidationError extends Error {
    readonly missingVars: string[];
    readonly invalidVars: string[];
    constructor(missingVars: string[], invalidVars: string[]);
}
/**
 * Validates that all required environment variables are present and valid
 */
export declare function validateEnvironment(): RequiredEnvVars;
/**
 * Checks if running in production environment
 */
export declare function isProduction(): boolean;
/**
 * Checks if running in development environment
 */
export declare function isDevelopment(): boolean;
/**
 * Gets the current environment name
 */
export declare function getEnvironmentName(): string;
//# sourceMappingURL=env-validator.d.ts.map