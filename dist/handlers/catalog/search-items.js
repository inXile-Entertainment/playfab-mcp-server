"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchItems = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const input_validator_js_1 = require("../../utils/input-validator.js");
const SearchItems = async (params) => {
    // Validate input parameters
    const validatedParams = {
        Count: (0, input_validator_js_1.validatePaginationCount)(params.Count, 'Count', 10, 50),
    };
    // Optional parameters
    const continuationToken = (0, input_validator_js_1.validateString)(params.ContinuationToken, 'ContinuationToken');
    if (continuationToken)
        validatedParams.ContinuationToken = continuationToken;
    const filter = (0, input_validator_js_1.validateString)(params.Filter, 'Filter', { maxLength: 2048 });
    if (filter)
        validatedParams.Filter = filter;
    const orderBy = (0, input_validator_js_1.validateString)(params.OrderBy, 'OrderBy', { maxLength: 2048 });
    if (orderBy)
        validatedParams.OrderBy = orderBy;
    const search = (0, input_validator_js_1.validateString)(params.Search, 'Search', { maxLength: 2048 });
    if (search)
        validatedParams.Search = search;
    // Make API call with validated parameters
    const request = (0, playfab_wrapper_js_1.addCustomTags)(validatedParams);
    const result = await (0, playfab_wrapper_js_1.callAdminAPI)(playfab_js_1.PlayFabEconomyAPI.SearchItems, request, 'SearchItems');
    return {
        success: true,
        items: result.Items || [],
        continuationToken: result.ContinuationToken
    };
};
exports.SearchItems = SearchItems;
//# sourceMappingURL=search-items.js.map