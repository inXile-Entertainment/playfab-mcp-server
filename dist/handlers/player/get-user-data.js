"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserData = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const GetUserData = async (params) => {
    const request = (0, playfab_wrapper_js_1.addCustomTags)({
        PlayFabId: params.PlayFabId,
        Keys: params.Keys,
        IfChangedFromDataVersion: params.IfChangedFromDataVersion
    });
    const result = await (0, playfab_wrapper_js_1.callAdminAPI)(playfab_js_1.PlayFabAdminAPI.GetUserData, request, 'GetUserData');
    const transformedData = {};
    if (result.Data) {
        for (const [key, value] of Object.entries(result.Data)) {
            transformedData[key] = {
                Value: value.Value || '',
                LastUpdated: value.LastUpdated || '',
                Permission: value.Permission || 'Private'
            };
        }
    }
    return {
        success: true,
        data: transformedData,
        dataVersion: result.DataVersion || 0,
    };
};
exports.GetUserData = GetUserData;
//# sourceMappingURL=get-user-data.js.map