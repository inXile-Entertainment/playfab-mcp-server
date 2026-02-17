"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_TITLE_PLAYER_ACCOUNT_IDS_FROM_PLAYFAB_IDS_TOOL = void 0;
exports.GET_TITLE_PLAYER_ACCOUNT_IDS_FROM_PLAYFAB_IDS_TOOL = {
    name: "get_title_player_account_ids_from_playfab_ids",
    description: "Converts one or more PlayFabIds to TitlePlayerAccountIds. IMPORTANT: Use this before any inventory operations! " +
        "PlayFabId (from login/user info) ≠ TitlePlayerAccountId (needed for inventory). " +
        "Supports both single ID (string) and multiple IDs (array). " +
        "Example flow: Get PlayFabId from user data → Convert with this tool → Use result for inventory APIs.",
    inputSchema: {
        type: "object",
        properties: {
            PlayFabIds: {
                oneOf: [
                    {
                        type: "string",
                        description: "Single PlayFabId to convert"
                    },
                    {
                        type: "array",
                        items: { type: "string" },
                        description: "Array of PlayFabIds to convert"
                    }
                ],
                description: "Single PlayFabId (string) or array of PlayFabIds to convert. Example: '276427AE27FF98AC' or ['id1', 'id2']"
            }
        },
        required: ["PlayFabIds"],
    },
};
//# sourceMappingURL=get-title-player-account-ids.js.map