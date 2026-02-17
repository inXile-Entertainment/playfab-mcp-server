/**
 * SetTitleInternalData handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { SetTitleInternalDataParams, SetTitleInternalDataResult } from '../../types/handler-types.js';
export declare class SetTitleInternalDataHandler extends BaseHandler<SetTitleInternalDataParams, SetTitleInternalDataResult> {
    constructor();
    execute(params: SetTitleInternalDataParams): Promise<HandlerResponse<SetTitleInternalDataResult>>;
}
export declare const setTitleInternalDataHandler: SetTitleInternalDataHandler;
export declare const SetTitleInternalData: import("../../types/index.js").PlayFabHandler<SetTitleInternalDataParams, SetTitleInternalDataResult>;
//# sourceMappingURL=set-title-internal-data-di.d.ts.map