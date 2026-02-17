/**
 * BatchCreateDraftItems handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { CreateDraftItemParams } from '../../types/handler-types.js';
interface BatchCreateDraftItemsParams {
    Items: Array<CreateDraftItemParams>;
    ContinueOnError?: boolean;
}
interface BatchCreateDraftItemsResult {
    totalProcessed: number;
    successCount: number;
    failureCount: number;
    results: Array<{
        index: number;
        success: boolean;
        item?: {
            Id: string;
            ETag?: string;
        };
        itemId?: string;
        error?: string;
    }>;
    message: string;
}
export declare class BatchCreateDraftItemsHandler extends BaseHandler<BatchCreateDraftItemsParams, BatchCreateDraftItemsResult> {
    constructor();
    execute(params: BatchCreateDraftItemsParams): Promise<HandlerResponse<BatchCreateDraftItemsResult>>;
}
export declare const batchCreateDraftItemsHandler: BatchCreateDraftItemsHandler;
export declare const BatchCreateDraftItems: import("../../types/index.js").PlayFabHandler<BatchCreateDraftItemsParams, BatchCreateDraftItemsResult>;
export {};
//# sourceMappingURL=batch-create-draft-items-di.d.ts.map