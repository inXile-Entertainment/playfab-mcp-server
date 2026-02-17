"use strict";
/**
 * BatchCreateDraftItems handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchCreateDraftItems = exports.batchCreateDraftItemsHandler = exports.BatchCreateDraftItemsHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
const create_draft_item_di_js_1 = require("./create-draft-item-di.js");
class BatchCreateDraftItemsHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('BatchCreateDraftItems');
    }
    async execute(params) {
        try {
            const continueOnError = params.ContinueOnError !== false;
            const results = [];
            this.logInfo('Starting batch creation of draft items', {
                itemCount: params.Items.length,
                continueOnError
            });
            for (let i = 0; i < params.Items.length; i++) {
                const itemData = params.Items[i];
                if (!itemData) {
                    results.push({
                        index: i,
                        success: false,
                        error: "Item data is undefined"
                    });
                    continue;
                }
                try {
                    // Validate NEUTRAL title
                    if (!itemData.Item || !itemData.Item.Title || !itemData.Item.Title['NEUTRAL']) {
                        throw new Error("Title with NEUTRAL locale is required");
                    }
                    // Use the DI handler directly
                    const result = await create_draft_item_di_js_1.createDraftItemHandler.execute(itemData);
                    if (result.success) {
                        const itemResult = result;
                        results.push({
                            index: i,
                            success: true,
                            item: itemResult.item,
                            itemId: itemResult.item?.Id
                        });
                    }
                    else {
                        throw new Error('Failed to create draft item');
                    }
                }
                catch (error) {
                    results.push({
                        index: i,
                        success: false,
                        error: error instanceof Error ? error.message : String(error)
                    });
                    if (!continueOnError) {
                        this.logInfo('Batch creation stopped due to error', {
                            stoppedAtIndex: i,
                            error: error instanceof Error ? error.message : String(error)
                        });
                        break;
                    }
                }
            }
            const successCount = results.filter(r => r.success).length;
            const failureCount = results.filter(r => !r.success).length;
            this.logInfo('Batch creation completed', {
                totalProcessed: results.length,
                successCount,
                failureCount
            });
            const response = {
                success: true,
                totalProcessed: results.length,
                successCount,
                failureCount,
                results,
                message: `Batch creation completed: ${successCount} succeeded, ${failureCount} failed out of ${params.Items.length} items.`
            };
            return response;
        }
        catch (error) {
            this.logError('Failed to batch create draft items', error);
            throw error;
        }
    }
}
exports.BatchCreateDraftItemsHandler = BatchCreateDraftItemsHandler;
// Export singleton instance
exports.batchCreateDraftItemsHandler = new BatchCreateDraftItemsHandler();
// Export handler function for backward compatibility
exports.BatchCreateDraftItems = exports.batchCreateDraftItemsHandler.toHandler();
//# sourceMappingURL=batch-create-draft-items-di.js.map