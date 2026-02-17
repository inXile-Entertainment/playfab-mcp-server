/**
 * UpdateUserData handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { UpdateUserDataParams, UpdateUserDataResult } from '../../types/handler-types.js';
export declare class UpdateUserDataHandler extends BaseHandler<UpdateUserDataParams, UpdateUserDataResult> {
    constructor();
    execute(params: UpdateUserDataParams): Promise<HandlerResponse<UpdateUserDataResult>>;
}
export declare const updateUserDataHandler: UpdateUserDataHandler;
export declare const UpdateUserData: import("../../types/index.js").PlayFabHandler<UpdateUserDataParams, UpdateUserDataResult>;
//# sourceMappingURL=update-user-data-di.d.ts.map