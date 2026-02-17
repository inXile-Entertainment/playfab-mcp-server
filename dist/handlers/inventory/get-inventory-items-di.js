"use strict";
/**
 * GetInventoryItems handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInventoryItems = exports.getInventoryItemsHandler = exports.GetInventoryItemsHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class GetInventoryItemsHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('GetInventoryItems');
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
            this.logInfo('Getting inventory items', {
                entityId,
                collectionId: params.CollectionId,
                count: params.Count,
                filter: params.Filter,
                hasContinuationToken: !!params.ContinuationToken
            });
            const request = {
                Entity: {
                    Id: entityId,
                    Type: "title_player_account"
                }
            };
            if (params.Count !== undefined) {
                const count = this.validatePaginationCount(params.Count, 'Count', 1, 50);
                request.Count = count;
            }
            if (params.CollectionId) {
                request.CollectionId = params.CollectionId;
            }
            if (params.ContinuationToken) {
                request.ContinuationToken = params.ContinuationToken;
            }
            if (params.Filter) {
                request.Filter = params.Filter;
            }
            const requestWithTags = this.addCustomTags(request);
            const result = await this.callPlayerAPI(this.context.apis.economyAPI.GetInventoryItems, requestWithTags, 'GetInventoryItems');
            this.logInfo('Retrieved inventory items', {
                entityId,
                itemCount: result.Items?.length || 0,
                hasContinuationToken: !!result.ContinuationToken,
                eTag: result.ETag
            });
            return {
                success: true,
                items: result.Items || [],
                continuationToken: result.ContinuationToken,
                eTag: result.ETag
            };
        }
        catch (error) {
            this.logError('Failed to get inventory items', error);
            throw error;
        }
    }
}
exports.GetInventoryItemsHandler = GetInventoryItemsHandler;
// Export singleton instance
exports.getInventoryItemsHandler = new GetInventoryItemsHandler();
// Export handler function for backward compatibility
exports.GetInventoryItems = exports.getInventoryItemsHandler.toHandler();
//# sourceMappingURL=get-inventory-items-di.js.map