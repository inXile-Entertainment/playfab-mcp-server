"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDraftItem = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const CreateDraftItem = async (params) => {
    // Validate NEUTRAL title is present
    if (!params.Item || !params.Item.Title || !params.Item.Title['NEUTRAL']) {
        throw new Error("Title with NEUTRAL locale is required for creating draft items");
    }
    const request = (0, playfab_wrapper_js_1.addCustomTags)({
        Item: params.Item,
        Publish: params.Publish || false
    });
    const result = await (0, playfab_wrapper_js_1.callAdminAPI)(playfab_js_1.PlayFabEconomyAPI.CreateDraftItem, request, 'CreateDraftItem');
    return {
        success: true,
        item: {
            Id: result.Item?.Id || '',
            ETag: result.Item?.ETag
        },
    };
};
exports.CreateDraftItem = CreateDraftItem;
//# sourceMappingURL=create-draft-item.js.map