"use strict";
/**
 * CreateDraftItem handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDraftItem = exports.createDraftItemHandler = exports.CreateDraftItemHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class CreateDraftItemHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('CreateDraftItem');
    }
    async execute(params) {
        try {
            // Validate NEUTRAL title is present
            if (!params.Item || !params.Item.Title || !params.Item.Title['NEUTRAL']) {
                return this.createErrorResponse('VALIDATION_ERROR', 'Title with NEUTRAL locale is required for creating draft items');
            }
            this.logInfo('Creating draft item', {
                hasTitle: !!params.Item.Title,
                publish: params.Publish || false
            });
            // Build request
            const request = this.addCustomTags({
                Item: params.Item,
                Publish: params.Publish || false
            });
            // Make API call
            const result = await this.callAdminAPI(this.context.apis.economyAPI.CreateDraftItem, request, 'CreateDraftItem');
            this.logInfo('Draft item created successfully', {
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
            this.logError('Failed to create draft item', error);
            throw error;
        }
    }
}
exports.CreateDraftItemHandler = CreateDraftItemHandler;
// Export singleton instance
exports.createDraftItemHandler = new CreateDraftItemHandler();
// Export handler function for backward compatibility
exports.CreateDraftItem = exports.createDraftItemHandler.toHandler();
//# sourceMappingURL=create-draft-item-di.js.map