"use strict";
/**
 * GetInventoryCollectionIds handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInventoryCollectionIds = exports.getInventoryCollectionIdsHandler = exports.GetInventoryCollectionIdsHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class GetInventoryCollectionIdsHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('GetInventoryCollectionIds');
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
            this.logInfo('Getting inventory collection IDs', {
                entityId,
                count: params.Count,
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
            if (params.ContinuationToken) {
                request.ContinuationToken = params.ContinuationToken;
            }
            const requestWithTags = this.addCustomTags(request);
            const result = await this.callPlayerAPI(this.context.apis.economyAPI.GetInventoryCollectionIds, requestWithTags, 'GetInventoryCollectionIds');
            this.logInfo('Retrieved inventory collection IDs', {
                entityId,
                collectionCount: result.CollectionIds?.length || 0,
                hasContinuationToken: !!result.ContinuationToken
            });
            return {
                success: true,
                collectionIds: result.CollectionIds || [],
                continuationToken: result.ContinuationToken
            };
        }
        catch (error) {
            this.logError('Failed to get inventory collection IDs', error);
            throw error;
        }
    }
}
exports.GetInventoryCollectionIdsHandler = GetInventoryCollectionIdsHandler;
// Export singleton instance
exports.getInventoryCollectionIdsHandler = new GetInventoryCollectionIdsHandler();
// Export handler function for backward compatibility
exports.GetInventoryCollectionIds = exports.getInventoryCollectionIdsHandler.toHandler();
//# sourceMappingURL=get-inventory-collection-ids-di.js.map