"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BanUsers = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const BanUsers = async (params) => {
    // Validate confirmation
    if (!params.ConfirmBan || params.ConfirmBan !== true) {
        throw new Error("Ban confirmation required. Set ConfirmBan to true to proceed with this operation.");
    }
    // Validate all bans have reasons
    if (!params.Bans || !params.Bans.every((ban) => ban.Reason && ban.Reason.trim() !== '')) {
        throw new Error("All bans must include a reason for audit trail purposes.");
    }
    const request = (0, playfab_wrapper_js_1.addCustomTags)({
        Bans: params.Bans
    });
    const result = await (0, playfab_wrapper_js_1.callAdminAPI)(playfab_js_1.PlayFabAdminAPI.BanUsers, request, 'BanUsers');
    const transformedBanData = (result.BanData || []).map(ban => ({
        PlayFabId: ban.PlayFabId || '',
        BanId: ban.BanId
    }));
    return {
        success: true,
        banData: transformedBanData,
        message: `Successfully banned ${params.Bans.length} user(s).`
    };
};
exports.BanUsers = BanUsers;
//# sourceMappingURL=ban-users.js.map