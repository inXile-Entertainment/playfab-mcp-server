"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_USER_DATA_TOOL = void 0;
exports.GET_USER_DATA_TOOL = {
    name: "get_user_data",
    description: "Retrieves custom data stored for a player. " +
        "Can retrieve specific keys or all data.",
    inputSchema: {
        type: "object",
        properties: {
            PlayFabId: {
                type: "string",
                description: "The PlayFab ID of the player."
            },
            Keys: {
                type: "array",
                items: { type: "string" },
                description: "Specific data keys to retrieve (optional, retrieves all if not specified)."
            }
        },
        required: ["PlayFabId"],
    },
};
//# sourceMappingURL=get-user-data.js.map