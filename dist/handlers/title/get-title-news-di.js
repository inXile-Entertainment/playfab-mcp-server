"use strict";
/**
 * GetTitleNews handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTitleNews = exports.getTitleNewsHandler = exports.GetTitleNewsHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class GetTitleNewsHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('GetTitleNews');
    }
    async execute(params) {
        try {
            const count = this.validatePaginationCount(params.Count, 'Count', 1, 10);
            this.logInfo('Getting title news', { count });
            const request = this.addCustomTags({
                Count: count
            });
            const result = await this.callAdminAPI(this.context.apis.serverAPI.GetTitleNews, request, 'GetTitleNews');
            const news = result.News?.map((item) => ({
                NewsId: item.NewsId || '',
                Title: item.Title || '',
                Body: item.Body || '',
                Timestamp: item.Timestamp || ''
            })) || [];
            this.logInfo('Title news retrieved successfully', {
                newsCount: news.length
            });
            return {
                success: true,
                news
            };
        }
        catch (error) {
            this.logError('Failed to get title news', error);
            throw error;
        }
    }
}
exports.GetTitleNewsHandler = GetTitleNewsHandler;
// Export singleton instance
exports.getTitleNewsHandler = new GetTitleNewsHandler();
// Export handler function for backward compatibility
exports.GetTitleNews = exports.getTitleNewsHandler.toHandler();
//# sourceMappingURL=get-title-news-di.js.map