import { PlayFabHandler } from "../../types/index.js";
import { BanUsersParams, BanUsersResult } from "../../types/handler-types.js";
interface ExtendedBanUsersParams extends BanUsersParams {
    ConfirmBan?: boolean;
}
export declare const BanUsers: PlayFabHandler<ExtendedBanUsersParams, BanUsersResult & {
    message: string;
}>;
export {};
//# sourceMappingURL=ban-users.d.ts.map