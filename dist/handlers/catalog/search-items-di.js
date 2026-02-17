"use strict";
/**
 * SearchItems handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchItems = exports.searchItemsHandler = exports.SearchItemsHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class SearchItemsHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('SearchItems');
    }
    async execute(params) {
        try {
            this.logInfo('Searching catalog items', { params });
            // Validate input parameters
            const validatedParams = {
                Count: this.validatePaginationCount(params.Count, 'Count', 10, 50),
            };
            // Optional parameters
            const continuationToken = this.validateString(params.ContinuationToken, 'ContinuationToken');
            if (continuationToken)
                validatedParams.ContinuationToken = continuationToken;
            const filter = this.validateString(params.Filter, 'Filter', { maxLength: 2048 });
            if (filter)
                validatedParams.Filter = filter;
            const orderBy = this.validateString(params.OrderBy, 'OrderBy', { maxLength: 2048 });
            if (orderBy)
                validatedParams.OrderBy = orderBy;
            const search = this.validateString(params.Search, 'Search', { maxLength: 2048 });
            if (search)
                validatedParams.Search = search;
            // Make API call with validated parameters
            const request = this.addCustomTags(validatedParams);
            const result = await this.callAdminAPI(this.context.apis.economyAPI.SearchItems, request, 'SearchItems');
            this.logInfo('Search completed', {
                itemCount: result.Items?.length || 0,
                hasContinuationToken: !!result.ContinuationToken
            });
            return {
                success: true,
                items: result.Items || [],
                continuationToken: result.ContinuationToken
            };
        }
        catch (error) {
            this.logError('Failed to search catalog items', error);
            throw error;
        }
    }
}
exports.SearchItemsHandler = SearchItemsHandler;
// Export a singleton instance
exports.searchItemsHandler = new SearchItemsHandler();
// Export the handler function for backward compatibility
exports.SearchItems = exports.searchItemsHandler.toHandler();
//# sourceMappingURL=search-items-di.js.map