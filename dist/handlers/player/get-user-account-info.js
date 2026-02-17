"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserAccountInfo = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const GetUserAccountInfo = async (params) => {
    const request = (0, playfab_wrapper_js_1.addCustomTags)({
        PlayFabId: params.PlayFabId,
        Username: params.Username,
        Email: params.Email,
        TitleDisplayName: params.TitleDisplayName
    });
    const result = await (0, playfab_wrapper_js_1.callAdminAPI)(playfab_js_1.PlayFabAdminAPI.GetUserAccountInfo, request, 'GetUserAccountInfo');
    return {
        success: true,
        userInfo: result.UserInfo || {},
    };
};
exports.GetUserAccountInfo = GetUserAccountInfo;
//# sourceMappingURL=get-user-account-info.js.map