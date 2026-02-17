"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequiredString = validateRequiredString;
exports.validateString = validateString;
exports.validateNumber = validateNumber;
exports.validateBoolean = validateBoolean;
exports.validateArray = validateArray;
exports.validateObject = validateObject;
exports.validateEntityKey = validateEntityKey;
exports.validateCurrencyAmount = validateCurrencyAmount;
exports.validateItemId = validateItemId;
exports.validatePlayerId = validatePlayerId;
exports.validatePaginationCount = validatePaginationCount;
/**
 * Input validation utilities for API parameters
 */
const errors_js_1 = require("./errors.js");
/**
 * Validates that a value is a required non-empty string
 */
function validateRequiredString(value, fieldName, options) {
    const result = validateString(value, fieldName, { ...options, required: true });
    if (result === undefined) {
        throw new errors_js_1.ValidationError(`${fieldName} is required`);
    }
    if (result === '') {
        throw new errors_js_1.ValidationError(`${fieldName} cannot be empty`);
    }
    return result;
}
/**
 * Validates that a value is a non-empty string
 */
function validateString(value, fieldName, options) {
    if (value === undefined || value === null) {
        if (options?.required) {
            throw new errors_js_1.ValidationError(`${fieldName} is required`);
        }
        return undefined;
    }
    if (typeof value !== 'string') {
        throw new errors_js_1.ValidationError(`${fieldName} must be a string`);
    }
    if (options?.minLength && value.length < options.minLength) {
        throw new errors_js_1.ValidationError(`${fieldName} must be at least ${options.minLength} characters`);
    }
    if (options?.maxLength && value.length > options.maxLength) {
        throw new errors_js_1.ValidationError(`${fieldName} must be at most ${options.maxLength} characters`);
    }
    if (options?.pattern && !options.pattern.test(value)) {
        throw new errors_js_1.ValidationError(`${fieldName} has invalid format`);
    }
    return value;
}
/**
 * Validates that a value is a number within range
 */
function validateNumber(value, fieldName, options) {
    if (value === undefined || value === null) {
        if (options?.required) {
            throw new errors_js_1.ValidationError(`${fieldName} is required`);
        }
        return undefined;
    }
    const num = typeof value === 'number' ? value : Number(value);
    if (isNaN(num)) {
        throw new errors_js_1.ValidationError(`${fieldName} must be a number`);
    }
    if (options?.integer && !Number.isInteger(num)) {
        throw new errors_js_1.ValidationError(`${fieldName} must be an integer`);
    }
    if (options?.min !== undefined && num < options.min) {
        throw new errors_js_1.ValidationError(`${fieldName} must be at least ${options.min}`);
    }
    if (options?.max !== undefined && num > options.max) {
        throw new errors_js_1.ValidationError(`${fieldName} must be at most ${options.max}`);
    }
    return num;
}
/**
 * Validates that a value is a boolean
 */
function validateBoolean(value, fieldName, required = false) {
    if (value === undefined || value === null) {
        if (required) {
            throw new errors_js_1.ValidationError(`${fieldName} is required`);
        }
        return undefined;
    }
    if (typeof value !== 'boolean') {
        throw new errors_js_1.ValidationError(`${fieldName} must be a boolean`);
    }
    return value;
}
/**
 * Validates that a value is an array
 */
function validateArray(value, fieldName, options) {
    if (value === undefined || value === null) {
        if (options?.required) {
            throw new errors_js_1.ValidationError(`${fieldName} is required`);
        }
        return undefined;
    }
    if (!Array.isArray(value)) {
        throw new errors_js_1.ValidationError(`${fieldName} must be an array`);
    }
    if (options?.minLength && value.length < options.minLength) {
        throw new errors_js_1.ValidationError(`${fieldName} must have at least ${options.minLength} items`);
    }
    if (options?.maxLength && value.length > options.maxLength) {
        throw new errors_js_1.ValidationError(`${fieldName} must have at most ${options.maxLength} items`);
    }
    if (options?.itemValidator) {
        return value.map((item, index) => options.itemValidator(item, index));
    }
    return value;
}
/**
 * Validates that a value is an object
 */
function validateObject(value, fieldName, options) {
    if (value === undefined || value === null) {
        if (options?.required) {
            throw new errors_js_1.ValidationError(`${fieldName} is required`);
        }
        return undefined;
    }
    if (typeof value !== 'object' || Array.isArray(value)) {
        throw new errors_js_1.ValidationError(`${fieldName} must be an object`);
    }
    const obj = value;
    if (options?.validator) {
        return options.validator(obj);
    }
    return obj;
}
/**
 * Validates PlayFab entity key
 */
function validateEntityKey(value, fieldName, required = false) {
    return validateObject(value, fieldName, {
        required,
        validator: (obj) => {
            const id = validateString(obj['Id'], `${fieldName}.Id`, { required: true });
            const type = validateString(obj['Type'], `${fieldName}.Type`, { required: true });
            if (!id || !type) {
                throw new errors_js_1.ValidationError(`${fieldName} must have Id and Type`);
            }
            return { Id: id, Type: type };
        }
    });
}
/**
 * Validates currency amount
 */
function validateCurrencyAmount(value, fieldName) {
    const amount = validateNumber(value, fieldName, {
        required: true,
        min: 0,
        integer: true
    });
    if (amount === undefined) {
        throw new errors_js_1.ValidationError(`${fieldName} is required`);
    }
    return amount;
}
/**
 * Validates PlayFab item ID
 */
function validateItemId(value, fieldName, required = true) {
    return validateString(value, fieldName, {
        required,
        minLength: 1,
        maxLength: 50,
        pattern: /^[a-zA-Z0-9_-]+$/
    });
}
/**
 * Validates PlayFab player ID
 */
function validatePlayerId(value, fieldName, required = true) {
    return validateString(value, fieldName, {
        required,
        minLength: 1,
        maxLength: 64,
        pattern: /^[A-F0-9]+$/i
    });
}
/**
 * Validates pagination count
 */
function validatePaginationCount(value, fieldName, defaultValue = 10, maxValue = 50) {
    const count = validateNumber(value, fieldName, {
        min: 1,
        max: maxValue,
        integer: true
    });
    return count ?? defaultValue;
}
//# sourceMappingURL=input-validator.js.map