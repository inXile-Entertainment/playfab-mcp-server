/**
 * UpdateDraftItem handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { UpdateDraftItemParams, UpdateDraftItemResult } from '../../types/handler-types.js';
export declare class UpdateDraftItemHandler extends BaseHandler<UpdateDraftItemParams, UpdateDraftItemResult> {
    constructor();
    execute(params: UpdateDraftItemParams): Promise<HandlerResponse<UpdateDraftItemResult>>;
}
export declare const updateDraftItemHandler: UpdateDraftItemHandler;
export declare const UpdateDraftItem: import("../../types/index.js").PlayFabHandler<UpdateDraftItemParams, UpdateDraftItemResult>;
//# sourceMappingURL=update-draft-item-di.d.ts.map