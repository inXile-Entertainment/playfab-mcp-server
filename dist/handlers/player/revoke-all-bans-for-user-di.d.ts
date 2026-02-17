/**
 * RevokeAllBansForUser handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { RevokeAllBansForUserParams, RevokeAllBansForUserResult } from '../../types/handler-types.js';
export declare class RevokeAllBansForUserHandler extends BaseHandler<RevokeAllBansForUserParams, RevokeAllBansForUserResult> {
    constructor();
    execute(params: RevokeAllBansForUserParams): Promise<HandlerResponse<RevokeAllBansForUserResult>>;
}
export declare const revokeAllBansForUserHandler: RevokeAllBansForUserHandler;
export declare const RevokeAllBansForUser: import("../../types/index.js").PlayFabHandler<RevokeAllBansForUserParams, RevokeAllBansForUserResult>;
//# sourceMappingURL=revoke-all-bans-for-user-di.d.ts.map