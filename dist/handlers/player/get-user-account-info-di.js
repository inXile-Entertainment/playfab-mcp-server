"use strict";
/**
 * GetUserAccountInfo handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserAccountInfo = exports.getUserAccountInfoHandler = exports.GetUserAccountInfoHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class GetUserAccountInfoHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('GetUserAccountInfo');
    }
    async execute(params) {
        try {
            this.logInfo('Getting user account info', {
                playFabId: params.PlayFabId,
                username: params.Username,
                email: params.Email,
                titleDisplayName: params.TitleDisplayName
            });
            // Build request object
            const request = this.addCustomTags({
                PlayFabId: params.PlayFabId,
                Username: params.Username,
                Email: params.Email,
                TitleDisplayName: params.TitleDisplayName
            });
            // Make API call
            const result = await this.callAdminAPI(this.context.apis.adminAPI.GetUserAccountInfo, request, 'GetUserAccountInfo');
            this.logInfo('User account info retrieved', {
                hasUserInfo: !!result.UserInfo,
                playFabId: result.UserInfo?.PlayFabId
            });
            return {
                success: true,
                userInfo: result.UserInfo || {},
            };
        }
        catch (error) {
            this.logError('Failed to get user account info', error);
            throw error;
        }
    }
}
exports.GetUserAccountInfoHandler = GetUserAccountInfoHandler;
// Export a singleton instance
exports.getUserAccountInfoHandler = new GetUserAccountInfoHandler();
// Export the handler function for backward compatibility
exports.GetUserAccountInfo = exports.getUserAccountInfoHandler.toHandler();
//# sourceMappingURL=get-user-account-info-di.js.map