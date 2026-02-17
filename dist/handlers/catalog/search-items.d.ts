import { PlayFabHandler } from "../../types/index.js";
import { SearchItemsParams } from "../../types/tool-params.js";
interface SearchItemsResult {
    items: any[];
    continuationToken?: string;
}
export declare const SearchItems: PlayFabHandler<SearchItemsParams, SearchItemsResult>;
export {};
//# sourceMappingURL=search-items.d.ts.map