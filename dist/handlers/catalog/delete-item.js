"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteItem = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const DeleteItem = async (params) => {
    // Validate confirmation
    if (!params.ConfirmDeletion || params.ConfirmDeletion !== true) {
        throw new Error("Deletion confirmation required. Set ConfirmDeletion to true to proceed with this destructive operation.");
    }
    const request = (0, playfab_wrapper_js_1.addCustomTags)({
        Id: params.ItemId
    });
    await (0, playfab_wrapper_js_1.callAdminAPI)(playfab_js_1.PlayFabEconomyAPI.DeleteItem, request, 'DeleteItem');
    return {
        success: true,
        message: `Item ${params.ItemId} has been permanently deleted from the catalog and all player inventories.`
    };
};
exports.DeleteItem = DeleteItem;
//# sourceMappingURL=delete-item.js.map