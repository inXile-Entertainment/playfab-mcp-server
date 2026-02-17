"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTitlePlayerAccountIdsFromPlayFabIds = GetTitlePlayerAccountIdsFromPlayFabIds;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
async function GetTitlePlayerAccountIdsFromPlayFabIds(params) {
    // Normalize input to array
    const playFabIds = Array.isArray(params.PlayFabIds)
        ? params.PlayFabIds
        : [params.PlayFabIds];
    if (playFabIds.length === 0) {
        throw new Error("No PlayFabIds provided");
    }
    const request = (0, playfab_wrapper_js_1.addCustomTags)({
        TitleId: playfab_js_1.PlayFab.settings.titleId,
        MasterPlayerAccountIds: playFabIds
    });
    const result = await (0, playfab_wrapper_js_1.callPlayFabApi)(playfab_js_1.PlayFabProfileAPI.GetTitlePlayersFromMasterPlayerAccountIds, request, 'GetTitlePlayersFromMasterPlayerAccountIds');
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
    return {
        success: true,
        mappings: mappings,
        notFound: notFound,
        totalRequested: playFabIds.length,
        totalFound: mappings.length
    };
}
//# sourceMappingURL=get-title-player-account-ids.js.map