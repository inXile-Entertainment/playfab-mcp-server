"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests for input validation utilities
 */
const input_validator_1 = require("../input-validator");
const errors_1 = require("../errors");
describe('Input Validator', () => {
    describe('validateString', () => {
        it('should accept valid strings', () => {
            expect((0, input_validator_1.validateString)('test', 'field')).toBe('test');
            expect((0, input_validator_1.validateString)('', 'field')).toBe('');
        });
        it('should return undefined for null/undefined when not required', () => {
            expect((0, input_validator_1.validateString)(null, 'field')).toBeUndefined();
            expect((0, input_validator_1.validateString)(undefined, 'field')).toBeUndefined();
        });
        it('should throw for null/undefined when required', () => {
            expect(() => (0, input_validator_1.validateString)(null, 'field', { required: true }))
                .toThrow(errors_1.ValidationError);
            expect(() => (0, input_validator_1.validateString)(undefined, 'field', { required: true }))
                .toThrow(errors_1.ValidationError);
        });
        it('should throw for non-string values', () => {
            expect(() => (0, input_validator_1.validateString)(123, 'field')).toThrow(errors_1.ValidationError);
            expect(() => (0, input_validator_1.validateString)({}, 'field')).toThrow(errors_1.ValidationError);
            expect(() => (0, input_validator_1.validateString)([], 'field')).toThrow(errors_1.ValidationError);
        });
        it('should validate minLength', () => {
            expect(() => (0, input_validator_1.validateString)('ab', 'field', { minLength: 3 }))
                .toThrow('field must be at least 3 characters');
            expect((0, input_validator_1.validateString)('abc', 'field', { minLength: 3 })).toBe('abc');
        });
        it('should validate maxLength', () => {
            expect(() => (0, input_validator_1.validateString)('abcd', 'field', { maxLength: 3 }))
                .toThrow('field must be at most 3 characters');
            expect((0, input_validator_1.validateString)('abc', 'field', { maxLength: 3 })).toBe('abc');
        });
        it('should validate pattern', () => {
            expect(() => (0, input_validator_1.validateString)('abc', 'field', { pattern: /^\d+$/ }))
                .toThrow('field has invalid format');
            expect((0, input_validator_1.validateString)('123', 'field', { pattern: /^\d+$/ })).toBe('123');
        });
    });
    describe('validateNumber', () => {
        it('should accept valid numbers', () => {
            expect((0, input_validator_1.validateNumber)(123, 'field')).toBe(123);
            expect((0, input_validator_1.validateNumber)(0, 'field')).toBe(0);
            expect((0, input_validator_1.validateNumber)(-123, 'field')).toBe(-123);
            expect((0, input_validator_1.validateNumber)(12.34, 'field')).toBe(12.34);
        });
        it('should convert numeric strings', () => {
            expect((0, input_validator_1.validateNumber)('123', 'field')).toBe(123);
            expect((0, input_validator_1.validateNumber)('12.34', 'field')).toBe(12.34);
        });
        it('should return undefined for null/undefined when not required', () => {
            expect((0, input_validator_1.validateNumber)(null, 'field')).toBeUndefined();
            expect((0, input_validator_1.validateNumber)(undefined, 'field')).toBeUndefined();
        });
        it('should throw for null/undefined when required', () => {
            expect(() => (0, input_validator_1.validateNumber)(null, 'field', { required: true }))
                .toThrow(errors_1.ValidationError);
        });
        it('should throw for non-numeric values', () => {
            expect(() => (0, input_validator_1.validateNumber)('abc', 'field')).toThrow(errors_1.ValidationError);
            expect(() => (0, input_validator_1.validateNumber)({}, 'field')).toThrow(errors_1.ValidationError);
        });
        it('should validate min/max', () => {
            expect(() => (0, input_validator_1.validateNumber)(5, 'field', { min: 10 }))
                .toThrow('field must be at least 10');
            expect(() => (0, input_validator_1.validateNumber)(15, 'field', { max: 10 }))
                .toThrow('field must be at most 10');
            expect((0, input_validator_1.validateNumber)(10, 'field', { min: 5, max: 15 })).toBe(10);
        });
        it('should validate integer', () => {
            expect(() => (0, input_validator_1.validateNumber)(12.34, 'field', { integer: true }))
                .toThrow('field must be an integer');
            expect((0, input_validator_1.validateNumber)(12, 'field', { integer: true })).toBe(12);
        });
    });
    describe('validateBoolean', () => {
        it('should accept valid booleans', () => {
            expect((0, input_validator_1.validateBoolean)(true, 'field')).toBe(true);
            expect((0, input_validator_1.validateBoolean)(false, 'field')).toBe(false);
        });
        it('should return undefined for null/undefined when not required', () => {
            expect((0, input_validator_1.validateBoolean)(null, 'field')).toBeUndefined();
            expect((0, input_validator_1.validateBoolean)(undefined, 'field')).toBeUndefined();
        });
        it('should throw for null/undefined when required', () => {
            expect(() => (0, input_validator_1.validateBoolean)(null, 'field', true))
                .toThrow(errors_1.ValidationError);
        });
        it('should throw for non-boolean values', () => {
            expect(() => (0, input_validator_1.validateBoolean)('true', 'field')).toThrow(errors_1.ValidationError);
            expect(() => (0, input_validator_1.validateBoolean)(1, 'field')).toThrow(errors_1.ValidationError);
        });
    });
    describe('validateArray', () => {
        it('should accept valid arrays', () => {
            expect((0, input_validator_1.validateArray)([1, 2, 3], 'field')).toEqual([1, 2, 3]);
            expect((0, input_validator_1.validateArray)([], 'field')).toEqual([]);
        });
        it('should return undefined for null/undefined when not required', () => {
            expect((0, input_validator_1.validateArray)(null, 'field')).toBeUndefined();
            expect((0, input_validator_1.validateArray)(undefined, 'field')).toBeUndefined();
        });
        it('should throw for non-array values', () => {
            expect(() => (0, input_validator_1.validateArray)('[]', 'field')).toThrow(errors_1.ValidationError);
            expect(() => (0, input_validator_1.validateArray)({}, 'field')).toThrow(errors_1.ValidationError);
        });
        it('should validate minLength/maxLength', () => {
            expect(() => (0, input_validator_1.validateArray)([1], 'field', { minLength: 2 }))
                .toThrow('field must have at least 2 items');
            expect(() => (0, input_validator_1.validateArray)([1, 2, 3], 'field', { maxLength: 2 }))
                .toThrow('field must have at most 2 items');
        });
        it('should validate items with itemValidator', () => {
            const validator = (item) => {
                if (typeof item !== 'number')
                    throw new Error('Must be number');
                return item * 2;
            };
            expect((0, input_validator_1.validateArray)([1, 2, 3], 'field', { itemValidator: validator }))
                .toEqual([2, 4, 6]);
        });
    });
    describe('validateObject', () => {
        it('should accept valid objects', () => {
            const obj = { key: 'value' };
            expect((0, input_validator_1.validateObject)(obj, 'field')).toBe(obj);
        });
        it('should return undefined for null/undefined when not required', () => {
            expect((0, input_validator_1.validateObject)(null, 'field')).toBeUndefined();
            expect((0, input_validator_1.validateObject)(undefined, 'field')).toBeUndefined();
        });
        it('should throw for non-object values', () => {
            expect(() => (0, input_validator_1.validateObject)('{}', 'field')).toThrow(errors_1.ValidationError);
            expect(() => (0, input_validator_1.validateObject)([], 'field')).toThrow(errors_1.ValidationError);
        });
        it('should validate with custom validator', () => {
            const validator = (obj) => {
                if (!obj['required'])
                    throw new Error('Missing required field');
                return { validated: true, ...obj };
            };
            expect((0, input_validator_1.validateObject)({ required: true }, 'field', { validator }))
                .toEqual({ validated: true, required: true });
        });
    });
    describe('validateEntityKey', () => {
        it('should accept valid entity keys', () => {
            expect((0, input_validator_1.validateEntityKey)({ Id: '123', Type: 'player' }, 'entity'))
                .toEqual({ Id: '123', Type: 'player' });
        });
        it('should throw for missing Id or Type', () => {
            expect(() => (0, input_validator_1.validateEntityKey)({ Id: '123' }, 'entity'))
                .toThrow(errors_1.ValidationError);
            expect(() => (0, input_validator_1.validateEntityKey)({ Type: 'player' }, 'entity'))
                .toThrow(errors_1.ValidationError);
        });
    });
    describe('validateCurrencyAmount', () => {
        it('should accept valid amounts', () => {
            expect((0, input_validator_1.validateCurrencyAmount)(100, 'amount')).toBe(100);
            expect((0, input_validator_1.validateCurrencyAmount)(0, 'amount')).toBe(0);
        });
        it('should throw for negative amounts', () => {
            expect(() => (0, input_validator_1.validateCurrencyAmount)(-1, 'amount'))
                .toThrow(errors_1.ValidationError);
        });
        it('should throw for non-integer amounts', () => {
            expect(() => (0, input_validator_1.validateCurrencyAmount)(10.5, 'amount'))
                .toThrow(errors_1.ValidationError);
        });
    });
    describe('validateItemId', () => {
        it('should accept valid item IDs', () => {
            expect((0, input_validator_1.validateItemId)('item_123', 'itemId')).toBe('item_123');
            expect((0, input_validator_1.validateItemId)('ITEM-ABC', 'itemId')).toBe('ITEM-ABC');
        });
        it('should throw for invalid characters', () => {
            expect(() => (0, input_validator_1.validateItemId)('item@123', 'itemId'))
                .toThrow(errors_1.ValidationError);
            expect(() => (0, input_validator_1.validateItemId)('item 123', 'itemId'))
                .toThrow(errors_1.ValidationError);
        });
        it('should validate length constraints', () => {
            expect(() => (0, input_validator_1.validateItemId)('', 'itemId'))
                .toThrow(errors_1.ValidationError);
            expect(() => (0, input_validator_1.validateItemId)('a'.repeat(51), 'itemId'))
                .toThrow(errors_1.ValidationError);
        });
    });
    describe('validatePlayerId', () => {
        it('should accept valid player IDs', () => {
            expect((0, input_validator_1.validatePlayerId)('ABC123', 'playerId')).toBe('ABC123');
            expect((0, input_validator_1.validatePlayerId)('1234567890ABCDEF', 'playerId')).toBe('1234567890ABCDEF');
        });
        it('should throw for invalid characters', () => {
            expect(() => (0, input_validator_1.validatePlayerId)('PLAYER-123', 'playerId'))
                .toThrow(errors_1.ValidationError);
            expect(() => (0, input_validator_1.validatePlayerId)('XYZ123', 'playerId'))
                .toThrow(errors_1.ValidationError);
        });
    });
    describe('validatePaginationCount', () => {
        it('should accept valid counts', () => {
            expect((0, input_validator_1.validatePaginationCount)(10, 'count')).toBe(10);
            expect((0, input_validator_1.validatePaginationCount)(50, 'count')).toBe(50);
        });
        it('should use default value for undefined', () => {
            expect((0, input_validator_1.validatePaginationCount)(undefined, 'count')).toBe(10);
            expect((0, input_validator_1.validatePaginationCount)(undefined, 'count', 20)).toBe(20);
        });
        it('should enforce max value', () => {
            expect(() => (0, input_validator_1.validatePaginationCount)(100, 'count', 10, 50))
                .toThrow(errors_1.ValidationError);
            expect(() => (0, input_validator_1.validatePaginationCount)(0, 'count'))
                .toThrow(errors_1.ValidationError);
        });
    });
});
//# sourceMappingURL=input-validator.test.js.map