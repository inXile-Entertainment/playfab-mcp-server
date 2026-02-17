/**
 * PublishDraftItem handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { PublishDraftItemParams, PublishDraftItemResult } from '../../types/handler-types.js';
export declare class PublishDraftItemHandler extends BaseHandler<PublishDraftItemParams, PublishDraftItemResult> {
    constructor();
    execute(params: PublishDraftItemParams): Promise<HandlerResponse<PublishDraftItemResult>>;
}
export declare const publishDraftItemHandler: PublishDraftItemHandler;
export declare const PublishDraftItem: import("../../types/index.js").PlayFabHandler<PublishDraftItemParams, PublishDraftItemResult>;
//# sourceMappingURL=publish-draft-item-di.d.ts.map