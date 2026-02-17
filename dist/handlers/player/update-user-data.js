"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserData = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const UpdateUserData = async (params) => {
    const request = (0, playfab_wrapper_js_1.addCustomTags)({
        PlayFabId: params.PlayFabId,
        Data: params.Data,
        KeysToRemove: params.KeysToRemove,
        Permission: params.Permission || "Private"
    });
    const result = await (0, playfab_wrapper_js_1.callAdminAPI)(playfab_js_1.PlayFabAdminAPI.UpdateUserData, request, 'UpdateUserData');
    return {
        success: true,
        dataVersion: result.DataVersion || 0,
    };
};
exports.UpdateUserData = UpdateUserData;
//# sourceMappingURL=update-user-data.js.map