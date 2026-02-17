"use strict";
/**
 * BanUsers handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BanUsers = exports.banUsersHandler = exports.BanUsersHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class BanUsersHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('BanUsers');
    }
    async execute(params) {
        try {
            // Validate confirmation
            if (!params.ConfirmBan || params.ConfirmBan !== true) {
                throw new Error("Ban confirmation required. Set ConfirmBan to true to proceed with this operation.");
            }
            // Validate all bans have reasons
            if (!params.Bans || !params.Bans.every((ban) => ban.Reason && ban.Reason.trim() !== '')) {
                throw new Error("All bans must include a reason for audit trail purposes.");
            }
            this.logInfo('Banning users', {
                userCount: params.Bans.length,
                playFabIds: params.Bans.map(b => b.PlayFabId)
            });
            // Build request object
            const request = this.addCustomTags({
                Bans: params.Bans
            });
            // Make API call
            const result = await this.callAdminAPI(this.context.apis.adminAPI.BanUsers, request, 'BanUsers');
            const transformedBanData = (result.BanData || []).map(ban => ({
                PlayFabId: ban.PlayFabId || '',
                BanId: ban.BanId
            }));
            this.logInfo('Users banned successfully', {
                bannedCount: transformedBanData.length,
                banIds: transformedBanData.map(b => b.BanId).filter(Boolean)
            });
            return {
                success: true,
                banData: transformedBanData,
                message: `Successfully banned ${params.Bans.length} user(s).`
            };
        }
        catch (error) {
            this.logError('Failed to ban users', error);
            throw error;
        }
    }
}
exports.BanUsersHandler = BanUsersHandler;
// Export a singleton instance
exports.banUsersHandler = new BanUsersHandler();
// Export the handler function for backward compatibility
exports.BanUsers = exports.banUsersHandler.toHandler();
//# sourceMappingURL=ban-users-di.js.map