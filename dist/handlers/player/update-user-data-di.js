"use strict";
/**
 * UpdateUserData handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserData = exports.updateUserDataHandler = exports.UpdateUserDataHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class UpdateUserDataHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('UpdateUserData');
    }
    async execute(params) {
        try {
            this.logInfo('Updating user data', {
                playFabId: params.PlayFabId,
                dataKeys: params.Data ? Object.keys(params.Data).length : 0,
                keysToRemove: params.KeysToRemove?.length || 0,
                permission: params.Permission || "Private"
            });
            // Build request object
            const request = this.addCustomTags({
                PlayFabId: params.PlayFabId,
                Data: params.Data,
                KeysToRemove: params.KeysToRemove,
                Permission: params.Permission || "Private"
            });
            // Make API call
            const result = await this.callAdminAPI(this.context.apis.adminAPI.UpdateUserData, request, 'UpdateUserData');
            this.logInfo('User data updated', {
                playFabId: params.PlayFabId,
                dataVersion: result.DataVersion || 0
            });
            return {
                success: true,
                dataVersion: result.DataVersion || 0,
            };
        }
        catch (error) {
            this.logError('Failed to update user data', error);
            throw error;
        }
    }
}
exports.UpdateUserDataHandler = UpdateUserDataHandler;
// Export a singleton instance
exports.updateUserDataHandler = new UpdateUserDataHandler();
// Export the handler function for backward compatibility
exports.UpdateUserData = exports.updateUserDataHandler.toHandler();
//# sourceMappingURL=update-user-data-di.js.map