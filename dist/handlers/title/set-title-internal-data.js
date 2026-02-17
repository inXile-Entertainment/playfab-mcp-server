"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetTitleInternalData = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const SetTitleInternalData = async (params) => {
    // SetTitleInternalData uses single Key/Value pair, not KeyValues array
    // Process each key-value pair individually
    const results = await Promise.all(Object.entries(params.KeysAndValues).map(async ([key, value]) => {
        const request = (0, playfab_wrapper_js_1.addCustomTags)({
            Key: key,
            Value: value
        });
        return (0, playfab_wrapper_js_1.callPlayFabApi)(playfab_js_1.PlayFabAdminAPI.SetTitleInternalData, request, 'SetTitleInternalData');
    }));
    return {
        success: true,
        message: 'Title internal data updated successfully',
    };
};
exports.SetTitleInternalData = SetTitleInternalData;
//# sourceMappingURL=set-title-internal-data.js.map