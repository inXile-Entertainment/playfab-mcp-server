"use strict";
/**
 * GetTitleInternalData handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTitleInternalData = exports.getTitleInternalDataHandler = exports.GetTitleInternalDataHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class GetTitleInternalDataHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('GetTitleInternalData');
    }
    async execute(params) {
        try {
            this.logInfo('Getting title internal data', {
                keyCount: params.Keys?.length || 0
            });
            const request = this.addCustomTags({
                Keys: params.Keys
            });
            const result = await this.callAdminAPI(this.context.apis.adminAPI.GetTitleInternalData, request, 'GetTitleInternalData');
            // Convert null values to empty strings to match the type definition
            const internalData = {};
            if (result.Data) {
                Object.entries(result.Data).forEach(([key, value]) => {
                    internalData[key] = value || '';
                });
            }
            this.logInfo('Title internal data retrieved successfully', {
                dataCount: Object.keys(internalData).length
            });
            return {
                success: true,
                data: internalData
            };
        }
        catch (error) {
            this.logError('Failed to get title internal data', error);
            throw error;
        }
    }
}
exports.GetTitleInternalDataHandler = GetTitleInternalDataHandler;
// Export singleton instance
exports.getTitleInternalDataHandler = new GetTitleInternalDataHandler();
// Export handler function for backward compatibility
exports.GetTitleInternalData = exports.getTitleInternalDataHandler.toHandler();
//# sourceMappingURL=get-title-internal-data-di.js.map