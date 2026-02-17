/**
 * BanUsers handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { BanUsersParams, BanUsersResult } from '../../types/handler-types.js';
interface ExtendedBanUsersParams extends BanUsersParams {
    ConfirmBan?: boolean;
}
export declare class BanUsersHandler extends BaseHandler<ExtendedBanUsersParams, BanUsersResult & {
    message: string;
}> {
    constructor();
    execute(params: ExtendedBanUsersParams): Promise<HandlerResponse<BanUsersResult & {
        message: string;
    }>>;
}
export declare const banUsersHandler: BanUsersHandler;
export declare const BanUsers: import("../../types/index.js").PlayFabHandler<ExtendedBanUsersParams, BanUsersResult & {
    message: string;
}>;
export {};
//# sourceMappingURL=ban-users-di.d.ts.map