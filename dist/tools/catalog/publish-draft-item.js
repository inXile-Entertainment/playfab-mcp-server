"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBLISH_DRAFT_ITEM_TOOL = void 0;
exports.PUBLISH_DRAFT_ITEM_TOOL = {
    name: "publish_draft_item",
    description: "Publishes a draft item, making it available to players. " +
        "Once published, the item can be purchased and used in the game.",
    inputSchema: {
        type: "object",
        properties: {
            ItemId: {
                type: "string",
                description: "The ID of the draft item to publish"
            },
            ETag: {
                type: "string",
                description: "Optional ETag for concurrency control"
            }
        },
        required: ["ItemId"],
    },
};
//# sourceMappingURL=publish-draft-item.js.map