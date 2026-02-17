"use strict";
/**
 * GetUserData handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserData = exports.getUserDataHandler = exports.GetUserDataHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class GetUserDataHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('GetUserData');
    }
    async execute(params) {
        try {
            this.logInfo('Getting user data', { playFabId: params.PlayFabId });
            // Build request object
            const request = this.addCustomTags({
                PlayFabId: params.PlayFabId,
                Keys: params.Keys
            });
            // Make API call
            const result = await this.callAdminAPI(this.context.apis.adminAPI.GetUserData, request, 'GetUserData');
            this.logInfo('User data retrieved', {
                playFabId: params.PlayFabId,
                dataKeys: Object.keys(result.Data || {}).length
            });
            return {
                success: true,
                PlayFabId: result.PlayFabId || params.PlayFabId,
                Data: result.Data || {},
                DataVersion: result.DataVersion || 0
            };
        }
        catch (error) {
            this.logError('Failed to get user data', error);
            throw error;
        }
    }
}
exports.GetUserDataHandler = GetUserDataHandler;
// Export a singleton instance
exports.getUserDataHandler = new GetUserDataHandler();
// Export the handler function for backward compatibility
exports.GetUserData = exports.getUserDataHandler.toHandler();
//# sourceMappingURL=get-user-data-di.js.map