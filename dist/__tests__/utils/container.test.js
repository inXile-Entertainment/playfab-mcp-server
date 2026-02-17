"use strict";
/**
 * Tests for the dependency injection container
 */
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const container_js_1 = require("../../utils/container.js");
(0, globals_1.describe)('Container', () => {
    let container;
    (0, globals_1.beforeEach)(() => {
        container = new container_js_1.Container();
    });
    (0, globals_1.describe)('value registration', () => {
        (0, globals_1.it)('should register and retrieve a value', () => {
            const testValue = { foo: 'bar' };
            container.value('test', testValue);
            const retrieved = container.get('test');
            (0, globals_1.expect)(retrieved).toBe(testValue);
        });
        (0, globals_1.it)('should throw error for unregistered token', () => {
            (0, globals_1.expect)(() => container.get('nonexistent')).toThrow('Service not found: nonexistent');
        });
    });
    (0, globals_1.describe)('singleton registration', () => {
        (0, globals_1.it)('should create singleton instance only once', () => {
            let callCount = 0;
            const factory = () => {
                callCount++;
                return { id: callCount };
            };
            container.singleton('test', factory);
            const instance1 = container.get('test');
            const instance2 = container.get('test');
            (0, globals_1.expect)(instance1).toBe(instance2);
            (0, globals_1.expect)(callCount).toBe(1);
            (0, globals_1.expect)(instance1).toEqual({ id: 1 });
        });
    });
    (0, globals_1.describe)('transient registration', () => {
        (0, globals_1.it)('should create new instance each time', () => {
            let callCount = 0;
            const factory = () => {
                callCount++;
                return { id: callCount };
            };
            container.transient('test', factory);
            const instance1 = container.get('test');
            const instance2 = container.get('test');
            (0, globals_1.expect)(instance1).not.toBe(instance2);
            (0, globals_1.expect)(callCount).toBe(2);
            (0, globals_1.expect)(instance1).toEqual({ id: 1 });
            (0, globals_1.expect)(instance2).toEqual({ id: 2 });
        });
    });
    (0, globals_1.describe)('has method', () => {
        (0, globals_1.it)('should return true for registered service', () => {
            container.value('test', 'value');
            (0, globals_1.expect)(container.has('test')).toBe(true);
        });
        (0, globals_1.it)('should return false for unregistered service', () => {
            (0, globals_1.expect)(container.has('test')).toBe(false);
        });
    });
    (0, globals_1.describe)('createChild method', () => {
        (0, globals_1.it)('should create child container with parent services', () => {
            container.value('parent', 'parentValue');
            const child = container.createChild();
            (0, globals_1.expect)(child.get('parent')).toBe('parentValue');
        });
        (0, globals_1.it)('should allow child to override parent services', () => {
            container.value('service', 'parentValue');
            const child = container.createChild();
            child.value('service', 'childValue');
            (0, globals_1.expect)(container.get('service')).toBe('parentValue');
            (0, globals_1.expect)(child.get('service')).toBe('childValue');
        });
    });
    (0, globals_1.describe)('clear method', () => {
        (0, globals_1.it)('should remove all services', () => {
            container.value('test1', 'value1');
            container.value('test2', 'value2');
            (0, globals_1.expect)(container.has('test1')).toBe(true);
            (0, globals_1.expect)(container.has('test2')).toBe(true);
            container.clear();
            (0, globals_1.expect)(container.has('test1')).toBe(false);
            (0, globals_1.expect)(container.has('test2')).toBe(false);
        });
    });
    (0, globals_1.describe)('method chaining', () => {
        (0, globals_1.it)('should support method chaining', () => {
            const result = container
                .value('val', 'value')
                .singleton('single', () => 'singleton')
                .transient('trans', () => 'transient');
            (0, globals_1.expect)(result).toBe(container);
            (0, globals_1.expect)(container.get('val')).toBe('value');
            (0, globals_1.expect)(container.get('single')).toBe('singleton');
            (0, globals_1.expect)(container.get('trans')).toBe('transient');
        });
    });
    (0, globals_1.describe)('symbol tokens', () => {
        (0, globals_1.it)('should support symbol tokens', () => {
            const token = Symbol('test');
            container.value(token, 'symbolValue');
            (0, globals_1.expect)(container.get(token)).toBe('symbolValue');
        });
        (0, globals_1.it)('should work with predefined tokens', () => {
            container.value(container_js_1.TOKENS.Config, { test: true });
            (0, globals_1.expect)(container.get(container_js_1.TOKENS.Config)).toEqual({ test: true });
        });
    });
});
//# sourceMappingURL=container.test.js.map