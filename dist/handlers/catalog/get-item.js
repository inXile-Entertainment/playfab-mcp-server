"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetItem = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const GetItem = async (params) => {
    const request = (0, playfab_wrapper_js_1.addCustomTags)({
        Id: params.ItemId
    });
    const result = await (0, playfab_wrapper_js_1.callAdminAPI)(playfab_js_1.PlayFabEconomyAPI.GetItem, request, 'GetItem');
    return {
        success: true,
        item: result.Item || {},
    };
};
exports.GetItem = GetItem;
//# sourceMappingURL=get-item.js.map