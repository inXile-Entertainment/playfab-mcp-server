"use strict";
/**
 * AddInventoryItems handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddInventoryItems = exports.addInventoryItemsHandler = exports.AddInventoryItemsHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class AddInventoryItemsHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('AddInventoryItems');
    }
    async execute(params) {
        try {
            // Validate required parameters
            const titlePlayerAccountId = this.validateRequiredString(params.TitlePlayerAccountId, 'TitlePlayerAccountId');
            if (params.Amount === undefined || params.Amount === null) {
                return this.createErrorResponse('VALIDATION_ERROR', 'Amount is required');
            }
            const amount = this.validateNumber(params.Amount, 'Amount', { min: 1 });
            if (amount === undefined) {
                return this.createErrorResponse('VALIDATION_ERROR', 'Amount must be a positive number');
            }
            if (!params.Item) {
                return this.createErrorResponse('VALIDATION_ERROR', 'Item is required');
            }
            this.logInfo('Adding inventory items', {
                titlePlayerAccountId,
                amount,
                collectionId: params.CollectionId,
                hasItem: !!params.Item
            });
            // Build request with validated parameters
            const validatedParams = {
                Amount: amount,
                Item: params.Item,
                Entity: {
                    Id: titlePlayerAccountId,
                    Type: "title_player_account"
                }
            };
            // Optional parameters
            if (params.CollectionId) {
                validatedParams.CollectionId = params.CollectionId;
            }
            if (params.DurationInSeconds !== undefined) {
                const duration = this.validateNumber(params.DurationInSeconds, 'DurationInSeconds', {
                    min: 0
                });
                if (duration !== undefined) {
                    validatedParams.DurationInSeconds = Math.floor(duration);
                }
            }
            if (params.IdempotencyId) {
                validatedParams.IdempotencyId = params.IdempotencyId;
            }
            if (params.NewStackValues !== undefined) {
                validatedParams.NewStackValues = params.NewStackValues;
            }
            // Make API call with validated parameters
            const request = this.addCustomTags(validatedParams);
            const result = await this.callPlayerAPI(this.context.apis.economyAPI.AddInventoryItems, request, 'AddInventoryItems');
            this.logInfo('Inventory items added successfully', {
                titlePlayerAccountId,
                eTag: result.ETag,
                transactionIds: result.TransactionIds
            });
            return {
                success: true,
                eTag: result.ETag,
                idempotencyId: result.IdempotencyId,
                transactionIds: result.TransactionIds,
            };
        }
        catch (error) {
            this.logError('Failed to add inventory items', error);
            throw error;
        }
    }
}
exports.AddInventoryItemsHandler = AddInventoryItemsHandler;
// Export singleton instance
exports.addInventoryItemsHandler = new AddInventoryItemsHandler();
// Export handler function for backward compatibility
exports.AddInventoryItems = exports.addInventoryItemsHandler.toHandler();
//# sourceMappingURL=add-inventory-items-di.js.map