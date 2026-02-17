"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInventoryCollectionIds = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const GetInventoryCollectionIds = async (params) => {
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
    if (params.ContinuationToken)
        request.ContinuationToken = params.ContinuationToken;
    const requestWithTags = (0, playfab_wrapper_js_1.addCustomTags)(request);
    const result = await (0, playfab_wrapper_js_1.callPlayerAPI)(playfab_js_1.PlayFabEconomyAPI.GetInventoryCollectionIds, requestWithTags, 'GetInventoryCollectionIds');
    return {
        success: true,
        collectionIds: result.CollectionIds || [],
        continuationToken: result.ContinuationToken
    };
};
exports.GetInventoryCollectionIds = GetInventoryCollectionIds;
//# sourceMappingURL=get-inventory-collection-ids.js.map