"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTitleNews = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const GetTitleNews = async (params) => {
    const request = (0, playfab_wrapper_js_1.addCustomTags)({
        Count: params.Count || 10
    });
    const result = await (0, playfab_wrapper_js_1.callPlayFabApi)(playfab_js_1.PlayFabServerAPI.GetTitleNews, request, 'GetTitleNews');
    return {
        success: true,
        news: result.News?.map((item) => ({
            NewsId: item.NewsId || '',
            Title: item.Title || '',
            Body: item.Body || '',
            Timestamp: item.Timestamp || ''
        })) || [],
    };
};
exports.GetTitleNews = GetTitleNews;
//# sourceMappingURL=get-title-news.js.map