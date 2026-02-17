"use strict";
/**
 * DeleteItem handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteItem = exports.deleteItemHandler = exports.DeleteItemHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class DeleteItemHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('DeleteItem');
    }
    async execute(params) {
        try {
            // Validate confirmation
            if (!params.ConfirmDeletion || params.ConfirmDeletion !== true) {
                return this.createErrorResponse('CONFIRMATION_REQUIRED', 'Deletion confirmation required. Set ConfirmDeletion to true to proceed with this destructive operation.');
            }
            this.logInfo('Deleting catalog item', { itemId: params.ItemId });
            // Build request
            const request = this.addCustomTags({
                Id: params.ItemId
            });
            // Make API call
            await this.callAdminAPI(this.context.apis.economyAPI.DeleteItem, request, 'DeleteItem');
            this.logInfo('Item deleted successfully', { itemId: params.ItemId });
            return {
                success: true,
                message: `Item ${params.ItemId} has been permanently deleted from the catalog and all player inventories.`
            };
        }
        catch (error) {
            this.logError('Failed to delete item', error);
            throw error;
        }
    }
}
exports.DeleteItemHandler = DeleteItemHandler;
// Export singleton instance
exports.deleteItemHandler = new DeleteItemHandler();
// Export handler function for backward compatibility
exports.DeleteItem = exports.deleteItemHandler.toHandler();
//# sourceMappingURL=delete-item-di.js.map