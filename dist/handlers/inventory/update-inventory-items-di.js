"use strict";
/**
 * UpdateInventoryItems handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInventoryItems = exports.updateInventoryItemsHandler = exports.UpdateInventoryItemsHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class UpdateInventoryItemsHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('UpdateInventoryItems');
    }
    async execute(params) {
        try {
            let entityId = params.TitlePlayerAccountId;
            // If PlayFabId is provided, convert it to TitlePlayerAccountId
            if (params.PlayFabId && !entityId) {
                this.logInfo('Converting PlayFabId to TitlePlayerAccountId', {
                    playFabId: params.PlayFabId
                });
                const accountResult = await this.callAdminAPI(this.context.apis.profileAPI.GetTitlePlayersFromMasterPlayerAccountIds, {
                    TitleId: this.context.config.titleId,
                    MasterPlayerAccountIds: [params.PlayFabId]
                }, 'GetTitlePlayersFromMasterPlayerAccountIds');
                const accounts = accountResult.TitlePlayerAccounts || {};
                const account = accounts[params.PlayFabId];
                if (!account || !account.Id) {
                    return this.createErrorResponse('PLAYER_NOT_FOUND', `No TitlePlayerAccount found for PlayFabId: ${params.PlayFabId}`);
                }
                entityId = account.Id;
            }
            if (!entityId) {
                return this.createErrorResponse('VALIDATION_ERROR', 'Either TitlePlayerAccountId or PlayFabId must be provided');
            }
            if (!params.Item) {
                return this.createErrorResponse('VALIDATION_ERROR', 'Item is required');
            }
            this.logInfo('Updating inventory items', {
                entityId,
                collectionId: params.CollectionId,
                hasItem: !!params.Item,
                itemProperties: Object.keys(params.Item)
            });
            const request = this.addCustomTags({
                CollectionId: params.CollectionId,
                Entity: {
                    Id: entityId,
                    Type: "title_player_account"
                },
                Item: params.Item,
                IdempotencyId: params.IdempotencyId
            });
            const result = await this.callPlayerAPI(this.context.apis.economyAPI.UpdateInventoryItems, request, 'UpdateInventoryItems');
            this.logInfo('Inventory items updated successfully', {
                entityId,
                eTag: result.ETag,
                transactionIds: result.TransactionIds
            });
            return {
                success: true,
                eTag: result.ETag,
                idempotencyId: result.IdempotencyId,
                transactionIds: result.TransactionIds
            };
        }
        catch (error) {
            this.logError('Failed to update inventory items', error);
            throw error;
        }
    }
}
exports.UpdateInventoryItemsHandler = UpdateInventoryItemsHandler;
// Export singleton instance
exports.updateInventoryItemsHandler = new UpdateInventoryItemsHandler();
// Export handler function for backward compatibility
exports.UpdateInventoryItems = exports.updateInventoryItemsHandler.toHandler();
//# sourceMappingURL=update-inventory-items-di.js.map