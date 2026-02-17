"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCatalogConfig = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const UpdateCatalogConfig = async (params) => {
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
    const request = (0, playfab_wrapper_js_1.addCustomTags)(config);
    await (0, playfab_wrapper_js_1.callAdminAPI)(playfab_js_1.PlayFabEconomyAPI.UpdateCatalogConfig, request, 'UpdateCatalogConfig');
    return {
        success: true,
        message: 'Catalog config updated successfully'
    };
};
exports.UpdateCatalogConfig = UpdateCatalogConfig;
//# sourceMappingURL=update-catalog-config.js.map