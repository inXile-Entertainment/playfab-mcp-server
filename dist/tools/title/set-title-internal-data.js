"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SET_TITLE_INTERNAL_DATA_TOOL = void 0;
exports.SET_TITLE_INTERNAL_DATA_TOOL = {
    name: "set_title_internal_data",
    description: "Sets server-only title data that is not accessible by clients. " +
        "Use this for sensitive configuration like API keys, server settings, etc.",
    inputSchema: {
        type: "object",
        properties: {
            Key: {
                type: "string",
                description: "The key for the internal data."
            },
            Value: {
                type: "string",
                description: "The value to set (JSON string for complex data)."
            }
        },
        required: ["Key", "Value"],
    },
};
//# sourceMappingURL=set-title-internal-data.js.map