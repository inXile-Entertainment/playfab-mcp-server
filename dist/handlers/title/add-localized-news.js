"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddLocalizedNews = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const errors_js_1 = require("../../utils/errors.js");
const AddLocalizedNews = async (params) => {
    try {
        // First, create the news in the default language
        const addNewsRequest = (0, playfab_wrapper_js_1.addCustomTags)({
            Title: params.DefaultTitle,
            Body: params.DefaultBody,
            Timestamp: params.Timestamp || new Date().toISOString()
        });
        const addNewsResult = await (0, playfab_wrapper_js_1.callPlayFabApi)(playfab_js_1.PlayFabAdminAPI.AddNews, addNewsRequest, 'AddNews');
        const newsId = addNewsResult.NewsId;
        const localizations = params.Localizations || [];
        const localizationResults = [];
        // Add localizations if provided
        for (const localization of localizations) {
            try {
                const localizedRequest = (0, playfab_wrapper_js_1.addCustomTags)({
                    NewsId: newsId,
                    Language: localization.Language,
                    Title: localization.Title,
                    Body: localization.Body
                });
                await (0, playfab_wrapper_js_1.callPlayFabApi)(playfab_js_1.PlayFabAdminAPI.AddLocalizedNews, localizedRequest, 'AddLocalizedNews');
                localizationResults.push({
                    language: localization.Language,
                    success: true
                });
            }
            catch (error) {
                localizationResults.push({
                    language: localization.Language,
                    success: false,
                    error: error instanceof Error ? error.message : String(error)
                });
                // Continue with other localizations
            }
        }
        return {
            success: true,
            newsId: newsId,
            localizations: localizationResults,
            message: `News item "${params.DefaultTitle}" has been successfully added with ${localizationResults.filter(r => r.success).length} localization(s).`
        };
    }
    catch (error) {
        // Check for specific PlayFab errors
        if (error instanceof errors_js_1.PlayFabAPIError) {
            if (error.playfabError?.errorCode === '1393') {
                throw new Error("PlayFab Error: Default language not configured. Please set a default language in PlayFab Game Manager under 'Settings > General' before creating news items with localization.");
            }
            throw new Error(`PlayFab Error: ${error.message} (Code: ${error.code || 'Unknown'})`);
        }
        throw error;
    }
};
exports.AddLocalizedNews = AddLocalizedNews;
//# sourceMappingURL=add-localized-news.js.map