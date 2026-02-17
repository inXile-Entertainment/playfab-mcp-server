"use strict";
/**
 * GrantItemsToUsers handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrantItemsToUsers = exports.grantItemsToUsersHandler = exports.GrantItemsToUsersHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
const add_inventory_items_di_js_1 = require("./add-inventory-items-di.js");
class GrantItemsToUsersHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('GrantItemsToUsers');
    }
    async execute(params) {
        try {
            if (!params.Grants || !Array.isArray(params.Grants) || params.Grants.length === 0) {
                return this.createErrorResponse('VALIDATION_ERROR', 'Grants array is required and must not be empty');
            }
            const continueOnError = params.ContinueOnError !== false;
            const results = [];
            this.logInfo('Starting grant items to users', {
                grantCount: params.Grants.length,
                continueOnError
            });
            for (let i = 0; i < params.Grants.length; i++) {
                const grant = params.Grants[i];
                if (!grant)
                    continue;
                try {
                    // Get TitlePlayerAccountId if PlayFabId is provided
                    let titlePlayerAccountId = grant.TitlePlayerAccountId;
                    if (grant.PlayFabId && !titlePlayerAccountId) {
                        this.logInfo('Converting PlayFabId to TitlePlayerAccountId', {
                            playFabId: grant.PlayFabId,
                            grantIndex: i
                        });
                        const accountResult = await this.callAdminAPI(this.context.apis.profileAPI.GetTitlePlayersFromMasterPlayerAccountIds, {
                            TitleId: this.context.config.titleId,
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
                    if (!grant.Items || !Array.isArray(grant.Items) || grant.Items.length === 0) {
                        throw new Error('Items array is required and must not be empty');
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
                        const result = await add_inventory_items_di_js_1.addInventoryItemsHandler.execute(addParams);
                        if (result.success) {
                            grantResults.push({
                                itemId: item.ItemId,
                                success: true,
                                transactionId: result.transactionIds?.[0]
                            });
                        }
                        else {
                            throw new Error(`Failed to grant item ${item.ItemId}`);
                        }
                    }
                    this.logInfo('Successfully granted items to user', {
                        grantIndex: i,
                        playerId: titlePlayerAccountId,
                        itemCount: grantResults.length
                    });
                    results.push({
                        index: i,
                        playerId: titlePlayerAccountId,
                        success: true,
                        itemsGranted: grantResults
                    });
                }
                catch (error) {
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    this.logError('Failed to grant items to user', {
                        grantIndex: i,
                        playerId: grant.TitlePlayerAccountId || grant.PlayFabId || 'unknown',
                        error: errorMessage
                    });
                    results.push({
                        index: i,
                        playerId: grant.TitlePlayerAccountId || grant.PlayFabId || 'unknown',
                        success: false,
                        error: errorMessage
                    });
                    if (!continueOnError) {
                        break;
                    }
                }
            }
            const successCount = results.filter(r => r.success).length;
            const failureCount = results.filter(r => !r.success).length;
            this.logInfo('Grant items to users completed', {
                totalGrants: results.length,
                successCount,
                failureCount
            });
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
        }
        catch (error) {
            this.logError('Failed to grant items to users', error);
            throw error;
        }
    }
}
exports.GrantItemsToUsersHandler = GrantItemsToUsersHandler;
// Export singleton instance
exports.grantItemsToUsersHandler = new GrantItemsToUsersHandler();
// Export handler function for backward compatibility
exports.GrantItemsToUsers = exports.grantItemsToUsersHandler.toHandler();
//# sourceMappingURL=grant-items-to-users-di.js.map