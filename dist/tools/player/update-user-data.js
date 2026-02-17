"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_USER_DATA_TOOL = void 0;
exports.UPDATE_USER_DATA_TOOL = {
    name: "update_user_data",
    description: "Updates custom data for a player. " +
        "Can set multiple key-value pairs at once.",
    inputSchema: {
        type: "object",
        properties: {
            PlayFabId: {
                type: "string",
                description: "The PlayFab ID of the player."
            },
            Data: {
                type: "object",
                description: "Key-value pairs of data to update.",
                additionalProperties: { type: "string" }
            },
            Permission: {
                type: "string",
                enum: ["Private", "Public"],
                description: "Data permission level. Default is 'Private'."
            }
        },
        required: ["PlayFabId", "Data"],
    },
};
//# sourceMappingURL=update-user-data.js.map