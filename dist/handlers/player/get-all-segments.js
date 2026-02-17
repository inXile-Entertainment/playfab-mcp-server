"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllSegments = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const GetAllSegments = async (_params) => {
    const request = (0, playfab_wrapper_js_1.addCustomTags)({});
    const result = await (0, playfab_wrapper_js_1.callAdminAPI)(playfab_js_1.PlayFabAdminAPI.GetAllSegments, request, 'GetAllSegments');
    const transformedSegments = (result.Segments || []).map(segment => ({
        Id: segment.Id || '',
        Name: segment.Name || '',
        Description: segment.Description
    }));
    return {
        success: true,
        segments: transformedSegments
    };
};
exports.GetAllSegments = GetAllSegments;
//# sourceMappingURL=get-all-segments.js.map