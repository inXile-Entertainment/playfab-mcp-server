"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchItems = SearchItems;
/**
 * Catalog search handlers
 */
const playfab_1 = require("../../config/playfab");
const playfab_wrapper_1 = require("../../utils/playfab-wrapper");
async function SearchItems(params) {
    const request = {
        Count: params.Count,
        ContinuationToken: params.ContinuationToken,
        Filter: params.Filter,
        OrderBy: params.OrderBy,
        Search: params.Search,
        CustomTags: { mcp: 'true' }
    };
    const result = await (0, playfab_wrapper_1.callPlayFabApi)(playfab_1.PlayFabEconomyAPI.SearchItems, request, 'SearchItems');
    return {
        success: true,
        items: result.Items || [],
        continuationToken: result.ContinuationToken
    };
}
//# sourceMappingURL=search.js.map