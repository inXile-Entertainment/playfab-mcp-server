"use strict";
/**
 * SetTitleData handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetTitleData = exports.setTitleDataHandler = exports.SetTitleDataHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class SetTitleDataHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('SetTitleData');
    }
    async execute(params) {
        try {
            // Validate required fields
            if (!params.KeysAndValues || typeof params.KeysAndValues !== 'object') {
                return this.createErrorResponse('VALIDATION_ERROR', 'KeysAndValues is required and must be an object');
            }
            const keyCount = Object.keys(params.KeysAndValues).length;
            if (keyCount === 0) {
                return this.createErrorResponse('VALIDATION_ERROR', 'At least one key-value pair is required');
            }
            this.logInfo('Setting title data', { keyCount });
            // Convert Record<string, string> to TitleDataKeyValue[]
            const keyValues = Object.entries(params.KeysAndValues).map(([key, value]) => ({
                Key: key,
                Value: value
            }));
            const request = this.addCustomTags({
                KeyValues: keyValues
            });
            await this.callAdminAPI(this.context.apis.adminAPI.SetTitleDataAndOverrides, request, 'SetTitleData');
            this.logInfo('Title data updated successfully', { keyCount });
            return {
                success: true,
                message: 'Title data updated successfully',
            };
        }
        catch (error) {
            this.logError('Failed to set title data', error);
            throw error;
        }
    }
}
exports.SetTitleDataHandler = SetTitleDataHandler;
// Export singleton instance
exports.setTitleDataHandler = new SetTitleDataHandler();
// Export handler function for backward compatibility
exports.SetTitleData = exports.setTitleDataHandler.toHandler();
//# sourceMappingURL=set-title-data-di.js.map