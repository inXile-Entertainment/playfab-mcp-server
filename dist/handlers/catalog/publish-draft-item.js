"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishDraftItem = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const PublishDraftItem = async (params) => {
    const request = (0, playfab_wrapper_js_1.addCustomTags)({
        Id: params.ItemId,
        ETag: params.ETag
    });
    await (0, playfab_wrapper_js_1.callAdminAPI)(playfab_js_1.PlayFabEconomyAPI.PublishDraftItem, request, 'PublishDraftItem');
    return {
        success: true,
    };
};
exports.PublishDraftItem = PublishDraftItem;
//# sourceMappingURL=publish-draft-item.js.map