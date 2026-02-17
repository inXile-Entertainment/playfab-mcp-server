"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_CATALOG_CONFIG_TOOL = void 0;
exports.UPDATE_CATALOG_CONFIG_TOOL = {
    name: "update_catalog_config",
    description: "Updates the catalog configuration, including available ContentTypes and Tags. " +
        "ContentTypes define the categories of items in your catalog (e.g., 'Game Item', 'Currency', 'Bundle'). " +
        "Tags define the available tags that can be used on items. " +
        "Maximum 128 ContentTypes (40 chars each), Maximum 1024 Tags (32 chars each).",
    inputSchema: {
        type: "object",
        properties: {
            ContentTypes: {
                type: "array",
                items: { type: "string" },
                description: "List of content types available in the catalog. Example: ['Game Item', 'Currency', 'Bundle']"
            },
            Tags: {
                type: "array",
                items: { type: "string" },
                description: "List of tags available for items. Example: ['weapon', 'armor', 'consumable', 'epic', 'rare']"
            }
        },
        required: [],
    },
};
//# sourceMappingURL=update-catalog-config.js.map