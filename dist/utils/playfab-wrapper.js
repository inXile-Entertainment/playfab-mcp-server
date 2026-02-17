"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callPlayFabApi = callPlayFabApi;
exports.addCustomTags = addCustomTags;
exports.callPlayerAPI = callPlayerAPI;
exports.callAdminAPI = callAdminAPI;
exports.callBulkAPI = callBulkAPI;
/**
 * PlayFab API wrapper utilities
 */
const playfab_js_1 = require("../config/playfab.js");
const errors_js_1 = require("./errors.js");
const logger_js_1 = require("./logger.js");
const retry_js_1 = require("./retry.js");
const logger = (0, logger_js_1.createLogger)('playfab-wrapper');
/**
 * Wraps a PlayFab API call in a Promise with proper error handling and retry logic
 */
async function callPlayFabApi(apiMethod, request, methodName, retryOptions) {
    // First, ensure we have a valid entity token
    await ensureEntityToken();
    // Use standard retry config by default, but allow override
    const finalRetryOptions = {
        ...retry_js_1.PLAYFAB_RETRY_CONFIGS.standard,
        ...retryOptions
    };
    return (0, retry_js_1.retryWithPlayFabLogic)(async () => {
        const startTime = Date.now();
        logger.debug({ method: methodName }, `Calling PlayFab API: ${methodName}`);
        return new Promise((resolve, reject) => {
            apiMethod(request, (error, result) => {
                const duration = Date.now() - startTime;
                if (error) {
                    (0, logger_js_1.logAPICall)(methodName, request, null, duration, error);
                    // Check for rate limiting
                    const errorObj = error;
                    if (errorObj.code === 429 || errorObj.errorCode === 1117) {
                        reject(new errors_js_1.RateLimitError(`Rate limit exceeded for ${methodName}`, errorObj.retryAfterSeconds));
                    }
                    else {
                        reject((0, errors_js_1.wrapPlayFabError)(error, methodName));
                    }
                    return;
                }
                if (!result?.data) {
                    const noDataError = new Error(`No data returned from ${methodName}`);
                    (0, logger_js_1.logAPICall)(methodName, request, null, duration, noDataError);
                    reject(noDataError);
                    return;
                }
                (0, logger_js_1.logAPICall)(methodName, request, result.data, duration);
                resolve(result.data);
            });
        });
    }, finalRetryOptions);
}
/**
 * Ensures we have a valid entity token for API calls
 */
let entityTokenPromise = null;
let tokenExpiresAt = null;
async function ensureEntityToken() {
    // Check if we have a valid token
    if (tokenExpiresAt && tokenExpiresAt > new Date()) {
        return;
    }
    // If we're already fetching a token, wait for it
    if (entityTokenPromise) {
        await entityTokenPromise;
        return;
    }
    // Fetch a new token
    entityTokenPromise = fetchEntityToken();
    await entityTokenPromise;
    entityTokenPromise = null;
}
async function fetchEntityToken() {
    return new Promise((resolve, reject) => {
        playfab_js_1.PlayFabAuthenticationAPI.GetEntityToken({
            CustomTags: {
                mcp: 'true'
            }
        }, (error, result) => {
            if (error) {
                reject((0, errors_js_1.wrapPlayFabError)(error, 'GetEntityToken'));
                return;
            }
            if (result?.data?.TokenExpiration) {
                tokenExpiresAt = new Date(result.data.TokenExpiration);
            }
            resolve();
        });
    });
}
/**
 * Add custom tags to a request
 */
function addCustomTags(request, tags = {}) {
    return {
        ...request,
        CustomTags: {
            mcp: 'true',
            ...tags,
            ...(request['CustomTags'] || {})
        }
    };
}
/**
 * Convenience functions for different API categories
 */
// For player-facing inventory and economy operations with strict limits
async function callPlayerAPI(apiMethod, request, methodName) {
    return callPlayFabApi(apiMethod, request, methodName, retry_js_1.PLAYFAB_RETRY_CONFIGS.strict);
}
// For admin/server operations
async function callAdminAPI(apiMethod, request, methodName) {
    return callPlayFabApi(apiMethod, request, methodName, retry_js_1.PLAYFAB_RETRY_CONFIGS.standard);
}
// For bulk operations
async function callBulkAPI(apiMethod, request, methodName) {
    return callPlayFabApi(apiMethod, request, methodName, retry_js_1.PLAYFAB_RETRY_CONFIGS.bulk);
}
//# sourceMappingURL=playfab-wrapper.js.map