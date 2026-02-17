import { PlayFabHandler } from "../../types/index.js";
import { CreateDraftItemParams } from "../../types/handler-types.js";
interface BatchCreateDraftItemsParams {
    Items: Array<CreateDraftItemParams>;
    ContinueOnError?: boolean;
}
interface BatchCreateDraftItemsResult {
    success: boolean;
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
export declare const BatchCreateDraftItems: PlayFabHandler<BatchCreateDraftItemsParams, BatchCreateDraftItemsResult>;
export {};
//# sourceMappingURL=batch-create-draft-items.d.ts.map