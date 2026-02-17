"use strict";
/**
 * GetTitleData handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTitleData = exports.getTitleDataHandler = exports.GetTitleDataHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class GetTitleDataHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('GetTitleData');
    }
    async execute(params) {
        try {
            this.logInfo('Getting title data', {
                keyCount: params.Keys?.length || 0
            });
            const request = this.addCustomTags({
                Keys: params.Keys
            });
            const result = await this.callAdminAPI(this.context.apis.adminAPI.GetTitleData, request, 'GetTitleData');
            // Convert null values to empty strings to match the type definition
            const titleData = {};
            if (result.Data) {
                Object.entries(result.Data).forEach(([key, value]) => {
                    titleData[key] = value || '';
                });
            }
            this.logInfo('Title data retrieved successfully', {
                dataCount: Object.keys(titleData).length
            });
            return {
                success: true,
                data: titleData
            };
        }
        catch (error) {
            this.logError('Failed to get title data', error);
            throw error;
        }
    }
}
exports.GetTitleDataHandler = GetTitleDataHandler;
// Export singleton instance
exports.getTitleDataHandler = new GetTitleDataHandler();
// Export handler function for backward compatibility
exports.GetTitleData = exports.getTitleDataHandler.toHandler();
//# sourceMappingURL=get-title-data-di.js.map