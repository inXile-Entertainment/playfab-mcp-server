/**
 * AddInventoryItems handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { AddInventoryItemsParams } from '../../types/tool-params.js';
interface AddInventoryItemsResult {
    eTag?: string;
    idempotencyId?: string;
    transactionIds?: string[];
}
export declare class AddInventoryItemsHandler extends BaseHandler<AddInventoryItemsParams, AddInventoryItemsResult> {
    constructor();
    execute(params: AddInventoryItemsParams): Promise<HandlerResponse<AddInventoryItemsResult>>;
}
export declare const addInventoryItemsHandler: AddInventoryItemsHandler;
export declare const AddInventoryItems: import("../../types/index.js").PlayFabHandler<AddInventoryItemsParams, AddInventoryItemsResult>;
export {};
//# sourceMappingURL=add-inventory-items-di.d.ts.map