/**
 * GetUserAccountInfo handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { GetUserAccountInfoParams, GetUserAccountInfoResult } from '../../types/handler-types.js';
export declare class GetUserAccountInfoHandler extends BaseHandler<GetUserAccountInfoParams, GetUserAccountInfoResult> {
    constructor();
    execute(params: GetUserAccountInfoParams): Promise<HandlerResponse<GetUserAccountInfoResult>>;
}
export declare const getUserAccountInfoHandler: GetUserAccountInfoHandler;
export declare const GetUserAccountInfo: import("../../types/index.js").PlayFabHandler<GetUserAccountInfoParams, GetUserAccountInfoResult>;
//# sourceMappingURL=get-user-account-info-di.d.ts.map