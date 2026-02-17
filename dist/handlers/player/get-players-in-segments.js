"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPlayersInSegments = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const GetPlayersInSegments = async (params) => {
    const request = (0, playfab_wrapper_js_1.addCustomTags)({
        SegmentId: params.SegmentId,
        SecondsToLive: params.SecondsToLive,
        MaxBatchSize: params.MaxBatchSize,
        ContinuationToken: params.ContinuationToken
    });
    const result = await (0, playfab_wrapper_js_1.callAdminAPI)(playfab_js_1.PlayFabAdminAPI.GetPlayersInSegment, request, 'GetPlayersInSegment');
    return {
        success: true,
        playerProfiles: result.PlayerProfiles || [],
        continuationToken: result.ContinuationToken,
        profilesInSegment: result.ProfilesInSegment || 0
    };
};
exports.GetPlayersInSegments = GetPlayersInSegments;
//# sourceMappingURL=get-players-in-segments.js.map