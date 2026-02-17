/**
 * GetTitleData handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { GetTitleDataParams, GetTitleDataResult } from '../../types/handler-types.js';
export declare class GetTitleDataHandler extends BaseHandler<GetTitleDataParams, GetTitleDataResult> {
    constructor();
    execute(params: GetTitleDataParams): Promise<HandlerResponse<GetTitleDataResult>>;
}
export declare const getTitleDataHandler: GetTitleDataHandler;
export declare const GetTitleData: import("../../types/index.js").PlayFabHandler<GetTitleDataParams, GetTitleDataResult>;
//# sourceMappingURL=get-title-data-di.d.ts.map