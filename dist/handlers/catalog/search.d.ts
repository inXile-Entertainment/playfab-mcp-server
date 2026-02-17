import { SuccessResponse } from '../../types';
interface SearchItemsParams {
    Count: number;
    ContinuationToken?: string;
    Filter?: string;
    OrderBy?: string;
    Search?: string;
}
interface SearchItemsResponse extends SuccessResponse {
    items: any[];
    continuationToken?: string;
}
export declare function SearchItems(params: SearchItemsParams): Promise<SearchItemsResponse>;
export {};
//# sourceMappingURL=search.d.ts.map