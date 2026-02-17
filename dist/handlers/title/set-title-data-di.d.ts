/**
 * SetTitleData handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { SetTitleDataParams, SetTitleDataResult } from '../../types/handler-types.js';
export declare class SetTitleDataHandler extends BaseHandler<SetTitleDataParams, SetTitleDataResult> {
    constructor();
    execute(params: SetTitleDataParams): Promise<HandlerResponse<SetTitleDataResult>>;
}
export declare const setTitleDataHandler: SetTitleDataHandler;
export declare const SetTitleData: import("../../types/index.js").PlayFabHandler<SetTitleDataParams, SetTitleDataResult>;
//# sourceMappingURL=set-title-data-di.d.ts.map