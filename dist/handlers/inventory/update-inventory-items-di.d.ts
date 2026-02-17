/**
 * UpdateInventoryItems handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { UpdateInventoryItemsParams, UpdateInventoryItemsResult } from '../../types/handler-types.js';
export declare class UpdateInventoryItemsHandler extends BaseHandler<UpdateInventoryItemsParams, UpdateInventoryItemsResult> {
    constructor();
    execute(params: UpdateInventoryItemsParams): Promise<HandlerResponse<UpdateInventoryItemsResult>>;
}
export declare const updateInventoryItemsHandler: UpdateInventoryItemsHandler;
export declare const UpdateInventoryItems: import("../../types/index.js").PlayFabHandler<UpdateInventoryItemsParams, UpdateInventoryItemsResult>;
//# sourceMappingURL=update-inventory-items-di.d.ts.map