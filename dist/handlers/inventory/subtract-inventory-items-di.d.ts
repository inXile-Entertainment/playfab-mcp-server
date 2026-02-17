/**
 * SubtractInventoryItems handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { SubtractInventoryItemsParams, SubtractInventoryItemsResult } from '../../types/handler-types.js';
export declare class SubtractInventoryItemsHandler extends BaseHandler<SubtractInventoryItemsParams, SubtractInventoryItemsResult> {
    constructor();
    execute(params: SubtractInventoryItemsParams): Promise<HandlerResponse<SubtractInventoryItemsResult>>;
}
export declare const subtractInventoryItemsHandler: SubtractInventoryItemsHandler;
export declare const SubtractInventoryItems: import("../../types/index.js").PlayFabHandler<SubtractInventoryItemsParams, SubtractInventoryItemsResult>;
//# sourceMappingURL=subtract-inventory-items-di.d.ts.map