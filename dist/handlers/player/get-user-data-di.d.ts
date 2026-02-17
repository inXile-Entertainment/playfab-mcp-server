/**
 * GetUserData handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { GetUserDataParams, GetUserDataResult } from '../../types/handler-types.js';
export declare class GetUserDataHandler extends BaseHandler<GetUserDataParams, GetUserDataResult> {
    constructor();
    execute(params: GetUserDataParams): Promise<HandlerResponse<GetUserDataResult>>;
}
export declare const getUserDataHandler: GetUserDataHandler;
export declare const GetUserData: import("../../types/index.js").PlayFabHandler<GetUserDataParams, GetUserDataResult>;
//# sourceMappingURL=get-user-data-di.d.ts.map