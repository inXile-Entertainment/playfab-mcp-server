"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchCreateDraftItems = void 0;
const create_draft_item_js_1 = require("./create-draft-item.js");
const BatchCreateDraftItems = async (params) => {
    const continueOnError = params.ContinueOnError !== false;
    const results = [];
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
            const result = await (0, create_draft_item_js_1.CreateDraftItem)(itemData);
            results.push({
                index: i,
                success: true,
                item: result.item,
                itemId: result.item?.Id
            });
        }
        catch (error) {
            results.push({
                index: i,
                success: false,
                error: error instanceof Error ? error.message : String(error)
            });
            if (!continueOnError) {
                break;
            }
        }
    }
    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;
    return {
        success: failureCount === 0,
        totalProcessed: results.length,
        successCount,
        failureCount,
        results,
        message: `Batch creation completed: ${successCount} succeeded, ${failureCount} failed out of ${params.Items.length} items.`
    };
};
exports.BatchCreateDraftItems = BatchCreateDraftItems;
//# sourceMappingURL=batch-create-draft-items.js.map