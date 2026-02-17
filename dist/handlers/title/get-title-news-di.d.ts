/**
 * GetTitleNews handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { GetTitleNewsParams, GetTitleNewsResult } from '../../types/handler-types.js';
export declare class GetTitleNewsHandler extends BaseHandler<GetTitleNewsParams, GetTitleNewsResult> {
    constructor();
    execute(params: GetTitleNewsParams): Promise<HandlerResponse<GetTitleNewsResult>>;
}
export declare const getTitleNewsHandler: GetTitleNewsHandler;
export declare const GetTitleNews: import("../../types/index.js").PlayFabHandler<GetTitleNewsParams, GetTitleNewsResult>;
//# sourceMappingURL=get-title-news-di.d.ts.map