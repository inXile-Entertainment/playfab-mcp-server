"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_ITEM_TOOL = void 0;
exports.GET_ITEM_TOOL = {
    name: "get_item",
    description: "Retrieves detailed information about a specific catalog item. " +
        "Returns both draft and published versions if available.",
    inputSchema: {
        type: "object",
        properties: {
            ItemId: {
                type: "string",
                description: "The ID of the item to retrieve"
            }
        },
        required: ["ItemId"],
    },
};
//# sourceMappingURL=get-item.js.map