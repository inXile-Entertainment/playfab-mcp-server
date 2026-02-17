"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetTitleData = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const SetTitleData = async (params) => {
    // Convert Record<string, string> to TitleDataKeyValue[]
    const keyValues = Object.entries(params.KeysAndValues).map(([key, value]) => ({
        Key: key,
        Value: value
    }));
    const request = (0, playfab_wrapper_js_1.addCustomTags)({
        KeyValues: keyValues
    });
    await (0, playfab_wrapper_js_1.callPlayFabApi)(playfab_js_1.PlayFabAdminAPI.SetTitleDataAndOverrides, request, 'SetTitleData');
    return {
        success: true,
        message: 'Title data updated successfully',
    };
};
exports.SetTitleData = SetTitleData;
//# sourceMappingURL=set-title-data.js.map