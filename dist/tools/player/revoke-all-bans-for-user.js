"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REVOKE_ALL_BANS_FOR_USER_TOOL = void 0;
exports.REVOKE_ALL_BANS_FOR_USER_TOOL = {
    name: "revoke_all_bans_for_user",
    description: "Removes all active bans for a specific player. " +
        "This unbans the player completely.",
    inputSchema: {
        type: "object",
        properties: {
            PlayFabId: {
                type: "string",
                description: "The PlayFab ID of the player to unban."
            }
        },
        required: ["PlayFabId"],
    },
};
//# sourceMappingURL=revoke-all-bans-for-user.js.map