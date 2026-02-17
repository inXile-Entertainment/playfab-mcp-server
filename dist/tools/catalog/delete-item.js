"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_ITEM_TOOL = void 0;
exports.DELETE_ITEM_TOOL = {
    name: "delete_item",
    description: "Permanently deletes an item from the catalog. " +
        "⚠️ DESTRUCTIVE: This cannot be undone! The item will be removed from all player inventories. " +
        "Requires explicit confirmation to proceed.",
    inputSchema: {
        type: "object",
        properties: {
            ItemId: {
                type: "string",
                description: "The ID of the item to delete"
            },
            ConfirmDeletion: {
                type: "boolean",
                description: "Must be set to true to confirm the deletion. This is a safety measure to prevent accidental deletions."
            }
        },
        required: ["ItemId", "ConfirmDeletion"],
    },
};
//# sourceMappingURL=delete-item.js.map