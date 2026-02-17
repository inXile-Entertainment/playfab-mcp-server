"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Global test setup
 */
const dotenv = __importStar(require("dotenv"));
// Load test environment variables
dotenv.config({ path: '.env.test' });
// Set default test environment variables if not provided
process.env['PLAYFAB_TITLE_ID'] = process.env['PLAYFAB_TITLE_ID'] || '1A2B3';
process.env['PLAYFAB_DEV_SECRET_KEY'] = process.env['PLAYFAB_DEV_SECRET_KEY'] || 'testsecretkey123456789012345678901234567890';
process.env['NODE_ENV'] = 'test';
// Mock PlayFab SDK
jest.mock('playfab-sdk');
// Mock console.error to reduce noise in tests
const originalError = console.error;
beforeAll(() => {
    console.error = jest.fn((...args) => {
        // Only log errors that aren't expected in tests
        if (!args[0]?.includes?.('Expected error')) {
            originalError(...args);
        }
    });
});
afterAll(() => {
    console.error = originalError;
});
//# sourceMappingURL=setup.js.map