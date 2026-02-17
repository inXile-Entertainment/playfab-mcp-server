"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_TITLE_NEWS_TOOL = void 0;
exports.GET_TITLE_NEWS_TOOL = {
    name: "get_title_news",
    description: "Retrieves current news items for the title. " +
        "Returns all active news in chronological order. " +
        "Use this to review existing news before adding new items.",
    inputSchema: {
        type: "object",
        properties: {
            Count: {
                type: "number",
                description: "Maximum number of news items to retrieve. Default: 10, Max: 100"
            }
        },
    },
};
//# sourceMappingURL=get-title-news.js.map