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
exports.PlayFabServerAPI = exports.PlayFabProfileAPI = exports.PlayFabEconomyAPI = exports.PlayFabAuthenticationAPI = exports.PlayFabAdminAPI = exports.PlayFab = void 0;
exports.getPlayFabConfig = getPlayFabConfig;
exports.isPlayFabConfigured = isPlayFabConfigured;
/**
 * PlayFab configuration and initialization
 */
const dotenv = __importStar(require("dotenv"));
const pf = __importStar(require("playfab-sdk"));
const env_validator_1 = require("../utils/env-validator");
// Load environment variables
dotenv.config({ quiet: true });
// Validate required environment variables
const env = (0, env_validator_1.validateEnvironment)();
// Export PlayFab modules with proper typing
exports.PlayFab = pf.PlayFab;
exports.PlayFabAdminAPI = pf.PlayFabAdmin;
exports.PlayFabAuthenticationAPI = pf.PlayFabAuthentication;
exports.PlayFabEconomyAPI = pf.PlayFabEconomy;
exports.PlayFabProfileAPI = pf.PlayFabProfiles;
exports.PlayFabServerAPI = pf.PlayFabServer;
// Configure PlayFab settings
exports.PlayFab.settings.titleId = env.PLAYFAB_TITLE_ID;
exports.PlayFab.settings.developerSecretKey = env.PLAYFAB_DEV_SECRET_KEY;
/**
 * Get current PlayFab configuration
 */
function getPlayFabConfig() {
    return {
        titleId: exports.PlayFab.settings.titleId,
        hasSecretKey: !!exports.PlayFab.settings.developerSecretKey,
    };
}
/**
 * Check if PlayFab is properly configured
 */
function isPlayFabConfigured() {
    return !!(exports.PlayFab.settings.titleId && exports.PlayFab.settings.developerSecretKey);
}
//# sourceMappingURL=playfab.js.map