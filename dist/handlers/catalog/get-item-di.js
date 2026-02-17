"use strict";
/**
 * GetItem handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetItem = exports.getItemHandler = exports.GetItemHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class GetItemHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('GetItem');
    }
    async execute(params) {
        try {
            this.logInfo('Getting catalog item', { itemId: params.ItemId });
            // Build request
            const request = this.addCustomTags({
                Id: params.ItemId
            });
            // Make API call
            const result = await this.callAdminAPI(this.context.apis.economyAPI.GetItem, request, 'GetItem');
            this.logInfo('Item retrieved successfully', { itemId: params.ItemId });
            return {
                success: true,
                item: result.Item || {},
            };
        }
        catch (error) {
            this.logError('Failed to get item', error);
            throw error;
        }
    }
}
exports.GetItemHandler = GetItemHandler;
// Export singleton instance
exports.getItemHandler = new GetItemHandler();
// Export handler function for backward compatibility
exports.GetItem = exports.getItemHandler.toHandler();
//# sourceMappingURL=get-item-di.js.map