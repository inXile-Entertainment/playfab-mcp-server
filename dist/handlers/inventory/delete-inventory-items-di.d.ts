/**
 * DeleteInventoryItems handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { DeleteInventoryItemsParams, DeleteInventoryItemsResult } from '../../types/handler-types.js';
interface DeleteInventoryParams extends DeleteInventoryItemsParams {
    ConfirmDeletion?: boolean;
}
export declare class DeleteInventoryItemsHandler extends BaseHandler<DeleteInventoryParams, DeleteInventoryItemsResult> {
    constructor();
    execute(params: DeleteInventoryParams): Promise<HandlerResponse<DeleteInventoryItemsResult>>;
}
export declare const deleteInventoryItemsHandler: DeleteInventoryItemsHandler;
export declare const DeleteInventoryItems: import("../../types/index.js").PlayFabHandler<DeleteInventoryParams, DeleteInventoryItemsResult>;
export {};
//# sourceMappingURL=delete-inventory-items-di.d.ts.map