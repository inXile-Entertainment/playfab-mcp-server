/**
 * GetPlayersInSegments handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { GetPlayersInSegmentsParams, GetPlayersInSegmentsResult } from '../../types/handler-types.js';
export declare class GetPlayersInSegmentsHandler extends BaseHandler<GetPlayersInSegmentsParams, GetPlayersInSegmentsResult> {
    constructor();
    execute(params: GetPlayersInSegmentsParams): Promise<HandlerResponse<GetPlayersInSegmentsResult>>;
}
export declare const getPlayersInSegmentsHandler: GetPlayersInSegmentsHandler;
export declare const GetPlayersInSegments: import("../../types/index.js").PlayFabHandler<GetPlayersInSegmentsParams, GetPlayersInSegmentsResult>;
//# sourceMappingURL=get-players-in-segments-di.d.ts.map