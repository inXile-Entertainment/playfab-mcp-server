"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDraftItem = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const UpdateDraftItem = async (params) => {
    const request = (0, playfab_wrapper_js_1.addCustomTags)({
        Item: {
            Id: params.ItemId,
            ...params.Item
        },
        Publish: params.Publish || false
    });
    const result = await (0, playfab_wrapper_js_1.callAdminAPI)(playfab_js_1.PlayFabEconomyAPI.UpdateDraftItem, request, 'UpdateDraftItem');
    return {
        success: true,
        item: {
            Id: result.Item?.Id || '',
            ETag: result.Item?.ETag
        },
    };
};
exports.UpdateDraftItem = UpdateDraftItem;
//# sourceMappingURL=update-draft-item.js.map