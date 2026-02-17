/**
 * DeleteItem handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { DeleteItemParams, DeleteItemResult } from '../../types/handler-types.js';
export declare class DeleteItemHandler extends BaseHandler<DeleteItemParams, DeleteItemResult> {
    constructor();
    execute(params: DeleteItemParams): Promise<HandlerResponse<DeleteItemResult>>;
}
export declare const deleteItemHandler: DeleteItemHandler;
export declare const DeleteItem: import("../../types/index.js").PlayFabHandler<DeleteItemParams, DeleteItemResult>;
//# sourceMappingURL=delete-item-di.d.ts.map