"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteInventoryItems = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const DeleteInventoryItems = async (params) => {
    // Validate confirmation
    if (!params.ConfirmDeletion || params.ConfirmDeletion !== true) {
        throw new Error("Deletion confirmation required. Set ConfirmDeletion to true to proceed with removing items from player inventory.");
    }
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
    const request = (0, playfab_wrapper_js_1.addCustomTags)({
        CollectionId: params.CollectionId,
        Entity: {
            Id: entityId,
            Type: "title_player_account"
        },
        Item: params.Item,
        IdempotencyId: params.IdempotencyId,
        DeleteTimestamp: params.DeleteTimestamp
    });
    const result = await (0, playfab_wrapper_js_1.callPlayerAPI)(playfab_js_1.PlayFabEconomyAPI.DeleteInventoryItems, request, 'DeleteInventoryItems');
    return {
        success: true,
        eTag: result.ETag,
        idempotencyId: result.IdempotencyId,
        transactionIds: result.TransactionIds
    };
};
exports.DeleteInventoryItems = DeleteInventoryItems;
//# sourceMappingURL=delete-inventory-items.js.map