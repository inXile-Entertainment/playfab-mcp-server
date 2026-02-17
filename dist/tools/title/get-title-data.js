"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_TITLE_DATA_TOOL = void 0;
exports.GET_TITLE_DATA_TOOL = {
    name: "get_title_data",
    description: "Retrieves global configuration data for the title. " +
        "Can retrieve specific keys or all title data.",
    inputSchema: {
        type: "object",
        properties: {
            Keys: {
                type: "array",
                items: { type: "string" },
                description: "Specific keys to retrieve (optional, retrieves all if not specified)."
            }
        },
    },
};
//# sourceMappingURL=get-title-data.js.map