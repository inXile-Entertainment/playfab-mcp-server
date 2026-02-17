/**
 * GrantItemsToUsers handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { GrantItemsToUsersResult } from '../../types/handler-types.js';
interface GrantItem {
    ItemId: string;
    Amount?: number;
    DurationInSeconds?: number;
}
interface Grant {
    TitlePlayerAccountId?: string;
    PlayFabId?: string;
    CollectionId?: string;
    Items: GrantItem[];
}
interface GrantItemsParams {
    Grants: Grant[];
    ContinueOnError?: boolean;
}
export declare class GrantItemsToUsersHandler extends BaseHandler<GrantItemsParams, GrantItemsToUsersResult> {
    constructor();
    execute(params: GrantItemsParams): Promise<HandlerResponse<GrantItemsToUsersResult>>;
}
export declare const grantItemsToUsersHandler: GrantItemsToUsersHandler;
export declare const GrantItemsToUsers: import("../../types/index.js").PlayFabHandler<GrantItemsParams, GrantItemsToUsersResult>;
export {};
//# sourceMappingURL=grant-items-to-users-di.d.ts.map