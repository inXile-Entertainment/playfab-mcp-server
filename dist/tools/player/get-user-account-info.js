"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_USER_ACCOUNT_INFO_TOOL = void 0;
exports.GET_USER_ACCOUNT_INFO_TOOL = {
    name: "get_user_account_info",
    description: "Retrieves detailed account information for a player. " +
        "Includes profile data, statistics, and linked accounts.",
    inputSchema: {
        type: "object",
        properties: {
            PlayFabId: {
                type: "string",
                description: "The PlayFab ID of the player."
            }
        },
        required: ["PlayFabId"],
    },
};
//# sourceMappingURL=get-user-account-info.js.map