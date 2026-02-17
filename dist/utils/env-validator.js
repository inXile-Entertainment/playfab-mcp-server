"use strict";
/**
 * Environment variable validation utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentValidationError = void 0;
exports.validateEnvironment = validateEnvironment;
exports.isProduction = isProduction;
exports.isDevelopment = isDevelopment;
exports.getEnvironmentName = getEnvironmentName;
class EnvironmentValidationError extends Error {
    missingVars;
    invalidVars;
    constructor(missingVars, invalidVars) {
        const messages = [];
        if (missingVars.length > 0) {
            messages.push(`Missing required environment variables: ${missingVars.join(', ')}`);
        }
        if (invalidVars.length > 0) {
            messages.push(`Invalid environment variables: ${invalidVars.join(', ')}`);
        }
        super(messages.join('. '));
        this.missingVars = missingVars;
        this.invalidVars = invalidVars;
        this.name = 'EnvironmentValidationError';
    }
}
exports.EnvironmentValidationError = EnvironmentValidationError;
/**
 * Validates that all required environment variables are present and valid
 */
function validateEnvironment() {
    const missingVars = [];
    const invalidVars = [];
    // Check PLAYFAB_TITLE_ID
    const titleId = process.env['PLAYFAB_TITLE_ID'];
    if (!titleId) {
        missingVars.push('PLAYFAB_TITLE_ID');
    }
    else if (titleId.trim().length === 0) {
        invalidVars.push('PLAYFAB_TITLE_ID (cannot be empty)');
    }
    else if (!/^[A-F0-9]{5}$/.test(titleId.trim())) {
        invalidVars.push('PLAYFAB_TITLE_ID (must be 5 hexadecimal characters)');
    }
    // Check PLAYFAB_DEV_SECRET_KEY
    const secretKey = process.env['PLAYFAB_DEV_SECRET_KEY'];
    if (!secretKey) {
        missingVars.push('PLAYFAB_DEV_SECRET_KEY');
    }
    else if (secretKey.trim().length === 0) {
        invalidVars.push('PLAYFAB_DEV_SECRET_KEY (cannot be empty)');
    }
    else if (secretKey.trim().length < 32) {
        invalidVars.push('PLAYFAB_DEV_SECRET_KEY (must be at least 32 characters)');
    }
    // Throw error if any validation failed
    if (missingVars.length > 0 || invalidVars.length > 0) {
        throw new EnvironmentValidationError(missingVars, invalidVars);
    }
    return {
        PLAYFAB_TITLE_ID: titleId.trim(),
        PLAYFAB_DEV_SECRET_KEY: secretKey.trim(),
    };
}
/**
 * Checks if running in production environment
 */
function isProduction() {
    return process.env['NODE_ENV'] === 'production';
}
/**
 * Checks if running in development environment
 */
function isDevelopment() {
    return process.env['NODE_ENV'] !== 'production';
}
/**
 * Gets the current environment name
 */
function getEnvironmentName() {
    return process.env['NODE_ENV'] ?? 'development';
}
//# sourceMappingURL=env-validator.js.map