"use strict";
/**
 * GetCatalogConfig handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCatalogConfig = exports.getCatalogConfigHandler = exports.GetCatalogConfigHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class GetCatalogConfigHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('GetCatalogConfig');
    }
    async execute(params) {
        try {
            this.logInfo('Getting catalog configuration');
            // Build request
            const request = this.addCustomTags({});
            // Make API call
            const result = await this.callAdminAPI(this.context.apis.economyAPI.GetCatalogConfig, request, 'GetCatalogConfig');
            this.logInfo('Catalog configuration retrieved successfully');
            return {
                success: true,
                config: result.Config || {},
            };
        }
        catch (error) {
            this.logError('Failed to get catalog configuration', error);
            throw error;
        }
    }
}
exports.GetCatalogConfigHandler = GetCatalogConfigHandler;
// Export singleton instance
exports.getCatalogConfigHandler = new GetCatalogConfigHandler();
// Export handler function for backward compatibility
exports.GetCatalogConfig = exports.getCatalogConfigHandler.toHandler();
//# sourceMappingURL=get-catalog-config-di.js.map