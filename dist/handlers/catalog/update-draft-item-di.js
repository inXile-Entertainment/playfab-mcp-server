"use strict";
/**
 * UpdateDraftItem handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDraftItem = exports.updateDraftItemHandler = exports.UpdateDraftItemHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class UpdateDraftItemHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('UpdateDraftItem');
    }
    async execute(params) {
        try {
            this.logInfo('Updating draft item', {
                itemId: params.ItemId,
                publish: params.Publish || false
            });
            // Build request
            const request = this.addCustomTags({
                Item: {
                    Id: params.ItemId,
                    ...params.Item
                },
                Publish: params.Publish || false
            });
            // Make API call
            const result = await this.callAdminAPI(this.context.apis.economyAPI.UpdateDraftItem, request, 'UpdateDraftItem');
            this.logInfo('Draft item updated successfully', {
                itemId: result.Item?.Id,
                published: params.Publish || false
            });
            return {
                success: true,
                item: {
                    Id: result.Item?.Id || '',
                    ETag: result.Item?.ETag
                },
            };
        }
        catch (error) {
            this.logError('Failed to update draft item', error);
            throw error;
        }
    }
}
exports.UpdateDraftItemHandler = UpdateDraftItemHandler;
// Export singleton instance
exports.updateDraftItemHandler = new UpdateDraftItemHandler();
// Export handler function for backward compatibility
exports.UpdateDraftItem = exports.updateDraftItemHandler.toHandler();
//# sourceMappingURL=update-draft-item-di.js.map