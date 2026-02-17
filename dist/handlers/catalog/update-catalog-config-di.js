"use strict";
/**
 * UpdateCatalogConfig handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCatalogConfig = exports.updateCatalogConfigHandler = exports.UpdateCatalogConfigHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class UpdateCatalogConfigHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('UpdateCatalogConfig');
    }
    async execute(params) {
        try {
            this.logInfo('Updating catalog configuration', {
                hasContentTypes: !!params.ContentTypes,
                hasTags: !!params.Tags
            });
            // Build configuration
            const config = {
                Config: {
                    IsCatalogEnabled: true,
                    Catalog: {}
                }
            };
            if (params.ContentTypes) {
                config.Config.Catalog.ContentTypes = params.ContentTypes;
            }
            if (params.Tags) {
                config.Config.Catalog.Tags = params.Tags;
            }
            // Build request
            const request = this.addCustomTags(config);
            // Make API call
            await this.callAdminAPI(this.context.apis.economyAPI.UpdateCatalogConfig, request, 'UpdateCatalogConfig');
            this.logInfo('Catalog configuration updated successfully');
            return {
                success: true,
                message: 'Catalog config updated successfully'
            };
        }
        catch (error) {
            this.logError('Failed to update catalog configuration', error);
            throw error;
        }
    }
}
exports.UpdateCatalogConfigHandler = UpdateCatalogConfigHandler;
// Export singleton instance
exports.updateCatalogConfigHandler = new UpdateCatalogConfigHandler();
// Export handler function for backward compatibility
exports.UpdateCatalogConfig = exports.updateCatalogConfigHandler.toHandler();
//# sourceMappingURL=update-catalog-config-di.js.map