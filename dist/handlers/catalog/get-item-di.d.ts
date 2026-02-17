/**
 * GetItem handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { GetItemParams, GetItemResult } from '../../types/handler-types.js';
export declare class GetItemHandler extends BaseHandler<GetItemParams, GetItemResult> {
    constructor();
    execute(params: GetItemParams): Promise<HandlerResponse<GetItemResult>>;
}
export declare const getItemHandler: GetItemHandler;
export declare const GetItem: import("../../types/index.js").PlayFabHandler<GetItemParams, GetItemResult>;
//# sourceMappingURL=get-item-di.d.ts.map