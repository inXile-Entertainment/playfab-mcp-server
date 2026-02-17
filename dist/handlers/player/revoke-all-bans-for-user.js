"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevokeAllBansForUser = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const RevokeAllBansForUser = async (params) => {
    const request = (0, playfab_wrapper_js_1.addCustomTags)({
        PlayFabId: params.PlayFabId
    });
    const result = await (0, playfab_wrapper_js_1.callAdminAPI)(playfab_js_1.PlayFabAdminAPI.RevokeAllBansForUser, request, 'RevokeAllBansForUser');
    const transformedBanData = (result.BanData || []).map(ban => ({
        BanId: ban.BanId || '',
        PlayFabId: ban.PlayFabId || '',
        Created: ban.Created || '',
        Expires: ban.Expires,
        IPAddress: ban.IPAddress,
        MACAddress: ban.MACAddress,
        Reason: ban.Reason,
        Active: ban.Active || false
    }));
    return {
        success: true,
        banData: transformedBanData,
    };
};
exports.RevokeAllBansForUser = RevokeAllBansForUser;
//# sourceMappingURL=revoke-all-bans-for-user.js.map