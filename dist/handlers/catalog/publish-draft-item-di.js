"use strict";
/**
 * PublishDraftItem handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishDraftItem = exports.publishDraftItemHandler = exports.PublishDraftItemHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class PublishDraftItemHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('PublishDraftItem');
    }
    async execute(params) {
        try {
            this.logInfo('Publishing draft item', {
                itemId: params.ItemId,
                hasETag: !!params.ETag
            });
            // Build request
            const request = this.addCustomTags({
                Id: params.ItemId,
                ETag: params.ETag
            });
            // Make API call
            await this.callAdminAPI(this.context.apis.economyAPI.PublishDraftItem, request, 'PublishDraftItem');
            this.logInfo('Draft item published successfully', { itemId: params.ItemId });
            return {
                success: true,
            };
        }
        catch (error) {
            this.logError('Failed to publish draft item', error);
            throw error;
        }
    }
}
exports.PublishDraftItemHandler = PublishDraftItemHandler;
// Export singleton instance
exports.publishDraftItemHandler = new PublishDraftItemHandler();
// Export handler function for backward compatibility
exports.PublishDraftItem = exports.publishDraftItemHandler.toHandler();
//# sourceMappingURL=publish-draft-item-di.js.map