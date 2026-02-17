/**
 * GetInventoryItems handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { GetInventoryItemsParams, GetInventoryItemsResult } from '../../types/handler-types.js';
export declare class GetInventoryItemsHandler extends BaseHandler<GetInventoryItemsParams, GetInventoryItemsResult> {
    constructor();
    execute(params: GetInventoryItemsParams): Promise<HandlerResponse<GetInventoryItemsResult>>;
}
export declare const getInventoryItemsHandler: GetInventoryItemsHandler;
export declare const GetInventoryItems: import("../../types/index.js").PlayFabHandler<GetInventoryItemsParams, GetInventoryItemsResult>;
//# sourceMappingURL=get-inventory-items-di.d.ts.map