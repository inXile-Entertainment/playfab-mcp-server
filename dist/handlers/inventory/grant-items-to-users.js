"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrantItemsToUsers = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const add_inventory_items_js_1 = require("../inventory/add-inventory-items.js");
const GrantItemsToUsers = async (params) => {
    const continueOnError = params.ContinueOnError !== false;
    const results = [];
    for (let i = 0; i < params.Grants.length; i++) {
        const grant = params.Grants[i];
        if (!grant)
            continue;
        try {
            // Get TitlePlayerAccountId if PlayFabId is provided
            let titlePlayerAccountId = grant.TitlePlayerAccountId;
            if (grant.PlayFabId && !titlePlayerAccountId) {
                const accountResult = await (0, playfab_wrapper_js_1.callPlayFabApi)(playfab_js_1.PlayFabProfileAPI.GetTitlePlayersFromMasterPlayerAccountIds, {
                    TitleId: playfab_js_1.PlayFab.settings.titleId,
                    MasterPlayerAccountIds: [grant.PlayFabId]
                }, 'GetTitlePlayersFromMasterPlayerAccountIds');
                const accounts = accountResult.TitlePlayerAccounts || {};
                const account = accounts[grant.PlayFabId];
                if (!account || !account.Id) {
                    throw new Error(`No TitlePlayerAccount found for PlayFabId: ${grant.PlayFabId}`);
                }
                titlePlayerAccountId = account.Id;
            }
            if (!titlePlayerAccountId) {
                throw new Error('Either TitlePlayerAccountId or PlayFabId must be provided');
            }
            // Process each item for the player
            const grantResults = [];
            for (const item of grant.Items) {
                const addParams = {
                    TitlePlayerAccountId: titlePlayerAccountId,
                    Amount: item.Amount || 1,
                    CollectionId: grant.CollectionId || 'default',
                    Item: { Id: item.ItemId },
                    DurationInSeconds: item.DurationInSeconds,
                    IdempotencyId: `grant_${Date.now()}_${i}_${item.ItemId}`
                };
                const result = await (0, add_inventory_items_js_1.AddInventoryItems)(addParams);
                grantResults.push({
                    itemId: item.ItemId,
                    success: true,
                    transactionId: result.transactionIds?.[0]
                });
            }
            results.push({
                index: i,
                playerId: titlePlayerAccountId,
                success: true,
                itemsGranted: grantResults
            });
        }
        catch (error) {
            results.push({
                index: i,
                playerId: grant.TitlePlayerAccountId || grant.PlayFabId || 'unknown',
                success: false,
                error: String(error)
            });
            if (!continueOnError) {
                break;
            }
        }
    }
    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;
    return {
        success: true,
        itemGrantResults: results.map(r => ({
            PlayFabId: r.playerId,
            Result: r.success,
            ItemGrantResults: r.itemsGranted?.map(ig => ({
                ItemId: ig.itemId,
                ItemInstanceId: ig.transactionId
            }))
        }))
    };
};
exports.GrantItemsToUsers = GrantItemsToUsers;
//# sourceMappingURL=grant-items-to-users.js.map