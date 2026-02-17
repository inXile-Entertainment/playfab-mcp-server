"use strict";
/**
 * GetTitlePlayerAccountIds handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTitlePlayerAccountIds = exports.getTitlePlayerAccountIdsHandler = exports.GetTitlePlayerAccountIdsHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
const playfab_js_1 = require("../../config/playfab.js");
class GetTitlePlayerAccountIdsHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('GetTitlePlayerAccountIds');
    }
    async execute(params) {
        try {
            // Normalize input to array
            const playFabIds = Array.isArray(params.PlayFabIds)
                ? params.PlayFabIds
                : [params.PlayFabIds];
            if (playFabIds.length === 0) {
                throw new Error("No PlayFabIds provided");
            }
            this.logInfo('Getting title player account IDs', {
                requestedCount: playFabIds.length
            });
            // Build request object
            const request = this.addCustomTags({
                TitleId: playfab_js_1.PlayFab.settings.titleId,
                MasterPlayerAccountIds: playFabIds
            });
            // Make API call using the profile API (not admin API)
            const result = await this.context.utils.wrapper.callPlayFabApi(this.context.apis.profileAPI.GetTitlePlayersFromMasterPlayerAccountIds, request, 'GetTitlePlayersFromMasterPlayerAccountIds');
            const accounts = result.TitlePlayerAccounts || {};
            const mappings = [];
            const notFound = [];
            for (const playFabId of playFabIds) {
                const account = accounts[playFabId];
                if (account && account.Id) {
                    mappings.push({
                        playFabId: playFabId,
                        titlePlayerAccountId: account.Id,
                        entityType: account.Type || 'title_player_account'
                    });
                }
                else {
                    notFound.push(playFabId);
                }
            }
            this.logInfo('Title player account IDs retrieved', {
                totalRequested: playFabIds.length,
                totalFound: mappings.length,
                notFoundCount: notFound.length
            });
            return {
                success: true,
                mappings: mappings,
                notFound: notFound,
                totalRequested: playFabIds.length,
                totalFound: mappings.length
            };
        }
        catch (error) {
            this.logError('Failed to get title player account IDs', error);
            throw error;
        }
    }
}
exports.GetTitlePlayerAccountIdsHandler = GetTitlePlayerAccountIdsHandler;
// Export a singleton instance
exports.getTitlePlayerAccountIdsHandler = new GetTitlePlayerAccountIdsHandler();
// Export the handler function for backward compatibility
exports.GetTitlePlayerAccountIds = exports.getTitlePlayerAccountIdsHandler.toHandler();
//# sourceMappingURL=get-title-player-account-ids-di.js.map