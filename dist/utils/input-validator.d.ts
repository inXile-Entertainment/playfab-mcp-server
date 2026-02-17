/**
 * Validates that a value is a required non-empty string
 */
export declare function validateRequiredString(value: unknown, fieldName: string, options?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
}): string;
/**
 * Validates that a value is a non-empty string
 */
export declare function validateString(value: unknown, fieldName: string, options?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    required?: boolean;
}): string | undefined;
/**
 * Validates that a value is a number within range
 */
export declare function validateNumber(value: unknown, fieldName: string, options?: {
    min?: number;
    max?: number;
    integer?: boolean;
    required?: boolean;
}): number | undefined;
/**
 * Validates that a value is a boolean
 */
export declare function validateBoolean(value: unknown, fieldName: string, required?: boolean): boolean | undefined;
/**
 * Validates that a value is an array
 */
export declare function validateArray<T>(value: unknown, fieldName: string, options?: {
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    itemValidator?: (item: unknown, index: number) => T;
}): T[] | undefined;
/**
 * Validates that a value is an object
 */
export declare function validateObject<T extends Record<string, unknown>>(value: unknown, fieldName: string, options?: {
    required?: boolean;
    validator?: (obj: Record<string, unknown>) => T;
}): T | undefined;
/**
 * Validates PlayFab entity key
 */
export declare function validateEntityKey(value: unknown, fieldName: string, required?: boolean): {
    Id: string;
    Type: string;
} | undefined;
/**
 * Validates currency amount
 */
export declare function validateCurrencyAmount(value: unknown, fieldName: string): number;
/**
 * Validates PlayFab item ID
 */
export declare function validateItemId(value: unknown, fieldName: string, required?: boolean): string | undefined;
/**
 * Validates PlayFab player ID
 */
export declare function validatePlayerId(value: unknown, fieldName: string, required?: boolean): string | undefined;
/**
 * Validates pagination count
 */
export declare function validatePaginationCount(value: unknown, fieldName: string, defaultValue?: number, maxValue?: number): number;
//# sourceMappingURL=input-validator.d.ts.map