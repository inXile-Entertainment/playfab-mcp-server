"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTitleData = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const GetTitleData = async (params) => {
    const request = (0, playfab_wrapper_js_1.addCustomTags)({
        Keys: params.Keys
    });
    const result = await (0, playfab_wrapper_js_1.callAdminAPI)(playfab_js_1.PlayFabAdminAPI.GetTitleData, request, 'GetTitleData');
    // Convert null values to empty strings to match the type definition
    const data = {};
    if (result.Data) {
        Object.entries(result.Data).forEach(([key, value]) => {
            data[key] = value || '';
        });
    }
    return {
        success: true,
        data
    };
};
exports.GetTitleData = GetTitleData;
//# sourceMappingURL=get-title-data.js.map