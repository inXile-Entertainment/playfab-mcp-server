"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInventoryItems = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const GetInventoryItems = async (params) => {
    let entityId = params.TitlePlayerAccountId;
    // If PlayFabId is provided, convert it to TitlePlayerAccountId
    if (params.PlayFabId && !entityId) {
        const accountResult = await (0, playfab_wrapper_js_1.callPlayFabApi)(playfab_js_1.PlayFabProfileAPI.GetTitlePlayersFromMasterPlayerAccountIds, {
            TitleId: playfab_js_1.PlayFab.settings.titleId,
            MasterPlayerAccountIds: [params.PlayFabId]
        }, 'GetTitlePlayersFromMasterPlayerAccountIds');
        const accounts = accountResult.TitlePlayerAccounts || {};
        const account = accounts[params.PlayFabId];
        if (!account || !account.Id) {
            throw new Error(`No TitlePlayerAccount found for PlayFabId: ${params.PlayFabId}`);
        }
        entityId = account.Id;
    }
    if (!entityId) {
        throw new Error('Either TitlePlayerAccountId or PlayFabId must be provided');
    }
    const request = {
        Entity: {
            Id: entityId,
            Type: "title_player_account"
        }
    };
    if (params.Count !== undefined)
        request.Count = params.Count;
    if (params.CollectionId)
        request.CollectionId = params.CollectionId;
    if (params.ContinuationToken)
        request.ContinuationToken = params.ContinuationToken;
    if (params.Filter)
        request.Filter = params.Filter;
    const requestWithTags = (0, playfab_wrapper_js_1.addCustomTags)(request);
    const result = await (0, playfab_wrapper_js_1.callPlayerAPI)(playfab_js_1.PlayFabEconomyAPI.GetInventoryItems, requestWithTags, 'GetInventoryItems');
    return {
        success: true,
        items: result.Items || [],
        continuationToken: result.ContinuationToken,
        eTag: result.ETag
    };
};
exports.GetInventoryItems = GetInventoryItems;
//# sourceMappingURL=get-inventory-items.js.map