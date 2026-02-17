/**
 * GetAllSegments handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { GetAllSegmentsParams, GetAllSegmentsResult } from '../../types/handler-types.js';
export declare class GetAllSegmentsHandler extends BaseHandler<GetAllSegmentsParams, GetAllSegmentsResult> {
    constructor();
    execute(_params: GetAllSegmentsParams): Promise<HandlerResponse<GetAllSegmentsResult>>;
}
export declare const getAllSegmentsHandler: GetAllSegmentsHandler;
export declare const GetAllSegments: import("../../types/index.js").PlayFabHandler<GetAllSegmentsParams, GetAllSegmentsResult>;
//# sourceMappingURL=get-all-segments-di.d.ts.map