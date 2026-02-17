"use strict";
/**
 * SetTitleInternalData handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetTitleInternalData = exports.setTitleInternalDataHandler = exports.SetTitleInternalDataHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class SetTitleInternalDataHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('SetTitleInternalData');
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
            this.logInfo('Setting title internal data', { keyCount });
            // SetTitleInternalData uses single Key/Value pair, not KeyValues array
            // Process each key-value pair individually
            const results = await Promise.all(Object.entries(params.KeysAndValues).map(async ([key, value]) => {
                const request = this.addCustomTags({
                    Key: key,
                    Value: value
                });
                return this.callAdminAPI(this.context.apis.adminAPI.SetTitleInternalData, request, 'SetTitleInternalData');
            }));
            this.logInfo('Title internal data updated successfully', {
                keyCount,
                updatedKeys: Object.keys(params.KeysAndValues)
            });
            return {
                success: true,
                message: 'Title internal data updated successfully',
            };
        }
        catch (error) {
            this.logError('Failed to set title internal data', error);
            throw error;
        }
    }
}
exports.SetTitleInternalDataHandler = SetTitleInternalDataHandler;
// Export singleton instance
exports.setTitleInternalDataHandler = new SetTitleInternalDataHandler();
// Export handler function for backward compatibility
exports.SetTitleInternalData = exports.setTitleInternalDataHandler.toHandler();
//# sourceMappingURL=set-title-internal-data-di.js.map