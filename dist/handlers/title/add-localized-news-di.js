"use strict";
/**
 * AddLocalizedNews handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddLocalizedNews = exports.addLocalizedNewsHandler = exports.AddLocalizedNewsHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class AddLocalizedNewsHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('AddLocalizedNews');
    }
    async execute(params) {
        try {
            // Validate required fields
            this.validateRequiredString(params.DefaultTitle, 'DefaultTitle');
            this.validateRequiredString(params.DefaultBody, 'DefaultBody');
            this.logInfo('Adding localized news', {
                title: params.DefaultTitle,
                localizationCount: params.Localizations?.length || 0
            });
            // First, create the news in the default language
            const addNewsRequest = this.addCustomTags({
                Title: params.DefaultTitle,
                Body: params.DefaultBody,
                Timestamp: params.Timestamp || new Date().toISOString()
            });
            const addNewsResult = await this.callAdminAPI(this.context.apis.adminAPI.AddNews, addNewsRequest, 'AddNews');
            const newsId = addNewsResult.NewsId;
            const localizations = params.Localizations || [];
            const localizationResults = [];
            // Add localizations if provided
            for (const localization of localizations) {
                try {
                    const localizedRequest = this.addCustomTags({
                        NewsId: newsId,
                        Language: localization.Language,
                        Title: localization.Title,
                        Body: localization.Body
                    });
                    await this.callAdminAPI(this.context.apis.adminAPI.AddLocalizedNews, localizedRequest, 'AddLocalizedNews');
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
            const successfulCount = localizationResults.filter(r => r.success).length;
            this.logInfo('News added successfully', {
                newsId,
                successfulLocalizations: successfulCount,
                totalLocalizations: localizationResults.length
            });
            return {
                success: true,
                newsId: newsId,
                localizations: localizationResults,
                message: `News item "${params.DefaultTitle}" has been successfully added with ${successfulCount} localization(s).`
            };
        }
        catch (error) {
            this.logError('Failed to add localized news', error);
            // Check for specific PlayFab errors
            if (error?.playfabError?.errorCode === '1393') {
                return this.createErrorResponse('DEFAULT_LANGUAGE_NOT_CONFIGURED', "PlayFab Error: Default language not configured. Please set a default language in PlayFab Game Manager under 'Settings > General' before creating news items with localization.");
            }
            if (error?.playfabError) {
                return this.createErrorResponse('PLAYFAB_ERROR', `PlayFab Error: ${error.message} (Code: ${error.code || 'Unknown'})`);
            }
            throw error;
        }
    }
}
exports.AddLocalizedNewsHandler = AddLocalizedNewsHandler;
// Export singleton instance
exports.addLocalizedNewsHandler = new AddLocalizedNewsHandler();
// Export handler function for backward compatibility
exports.AddLocalizedNews = exports.addLocalizedNewsHandler.toHandler();
//# sourceMappingURL=add-localized-news-di.js.map