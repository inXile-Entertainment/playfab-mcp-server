/**
 * CreateDraftItem handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { CreateDraftItemParams, CreateDraftItemResult } from '../../types/handler-types.js';
export declare class CreateDraftItemHandler extends BaseHandler<CreateDraftItemParams, CreateDraftItemResult> {
    constructor();
    execute(params: CreateDraftItemParams): Promise<HandlerResponse<CreateDraftItemResult>>;
}
export declare const createDraftItemHandler: CreateDraftItemHandler;
export declare const CreateDraftItem: import("../../types/index.js").PlayFabHandler<CreateDraftItemParams, CreateDraftItemResult>;
//# sourceMappingURL=create-draft-item-di.d.ts.map