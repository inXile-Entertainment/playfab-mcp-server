"use strict";
/**
 * RevokeAllBansForUser handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevokeAllBansForUser = exports.revokeAllBansForUserHandler = exports.RevokeAllBansForUserHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class RevokeAllBansForUserHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('RevokeAllBansForUser');
    }
    async execute(params) {
        try {
            this.logInfo('Revoking all bans for user', {
                playFabId: params.PlayFabId
            });
            // Build request object
            const request = this.addCustomTags({
                PlayFabId: params.PlayFabId
            });
            // Make API call
            const result = await this.callAdminAPI(this.context.apis.adminAPI.RevokeAllBansForUser, request, 'RevokeAllBansForUser');
            const transformedBanData = (result.BanData || []).map(ban => ({
                BanId: ban.BanId || '',
                PlayFabId: ban.PlayFabId || '',
                Created: ban.Created || '',
                Expires: ban.Expires,
                IPAddress: ban.IPAddress,
                MACAddress: ban.MACAddress,
                Reason: ban.Reason,
                Active: ban.Active || false
            }));
            this.logInfo('All bans revoked for user', {
                playFabId: params.PlayFabId,
                revokedBansCount: transformedBanData.length
            });
            return {
                success: true,
                banData: transformedBanData,
            };
        }
        catch (error) {
            this.logError('Failed to revoke all bans for user', error);
            throw error;
        }
    }
}
exports.RevokeAllBansForUserHandler = RevokeAllBansForUserHandler;
// Export a singleton instance
exports.revokeAllBansForUserHandler = new RevokeAllBansForUserHandler();
// Export the handler function for backward compatibility
exports.RevokeAllBansForUser = exports.revokeAllBansForUserHandler.toHandler();
//# sourceMappingURL=revoke-all-bans-for-user-di.js.map