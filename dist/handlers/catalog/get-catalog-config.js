"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCatalogConfig = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const GetCatalogConfig = async () => {
    const request = (0, playfab_wrapper_js_1.addCustomTags)({});
    const result = await (0, playfab_wrapper_js_1.callAdminAPI)(playfab_js_1.PlayFabEconomyAPI.GetCatalogConfig, request, 'GetCatalogConfig');
    return {
        success: true,
        config: result.Config || {},
    };
};
exports.GetCatalogConfig = GetCatalogConfig;
//# sourceMappingURL=get-catalog-config.js.map