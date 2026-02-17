/**
 * GetTitlePlayerAccountIds handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
interface ExtendedGetTitlePlayerAccountIdsParams {
    PlayFabIds: string | string[];
}
interface GetTitlePlayerAccountIdsResponse {
    success: boolean;
    mappings: Array<{
        playFabId: string;
        titlePlayerAccountId: string;
        entityType: string;
    }>;
    notFound: string[];
    totalRequested: number;
    totalFound: number;
}
export declare class GetTitlePlayerAccountIdsHandler extends BaseHandler<ExtendedGetTitlePlayerAccountIdsParams, GetTitlePlayerAccountIdsResponse> {
    constructor();
    execute(params: ExtendedGetTitlePlayerAccountIdsParams): Promise<HandlerResponse<GetTitlePlayerAccountIdsResponse>>;
}
export declare const getTitlePlayerAccountIdsHandler: GetTitlePlayerAccountIdsHandler;
export declare const GetTitlePlayerAccountIds: import("../../types/index.js").PlayFabHandler<ExtendedGetTitlePlayerAccountIdsParams, GetTitlePlayerAccountIdsResponse>;
export {};
//# sourceMappingURL=get-title-player-account-ids-di.d.ts.map