/**
 * GetTitleInternalData handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { GetTitleInternalDataParams, GetTitleInternalDataResult } from '../../types/handler-types.js';
export declare class GetTitleInternalDataHandler extends BaseHandler<GetTitleInternalDataParams, GetTitleInternalDataResult> {
    constructor();
    execute(params: GetTitleInternalDataParams): Promise<HandlerResponse<GetTitleInternalDataResult>>;
}
export declare const getTitleInternalDataHandler: GetTitleInternalDataHandler;
export declare const GetTitleInternalData: import("../../types/index.js").PlayFabHandler<GetTitleInternalDataParams, GetTitleInternalDataResult>;
//# sourceMappingURL=get-title-internal-data-di.d.ts.map