import { PlayFabHandler } from "../../types/index.js";
import { GrantItemsToUsersResult } from "../../types/handler-types.js";
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
export declare const GrantItemsToUsers: PlayFabHandler<GrantItemsParams, GrantItemsToUsersResult>;
export {};
//# sourceMappingURL=grant-items-to-users.d.ts.map