/**
 * SearchItems handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { SearchItemsParams } from '../../types/tool-params.js';
interface SearchItemsResult {
    items: any[];
    continuationToken?: string;
}
export declare class SearchItemsHandler extends BaseHandler<SearchItemsParams, SearchItemsResult> {
    constructor();
    execute(params: SearchItemsParams): Promise<HandlerResponse<SearchItemsResult>>;
}
export declare const searchItemsHandler: SearchItemsHandler;
export declare const SearchItems: import("../../types/index.js").PlayFabHandler<SearchItemsParams, SearchItemsResult>;
export {};
//# sourceMappingURL=search-items-di.d.ts.map