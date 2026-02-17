import { PlayFabHandler } from "../../types/index.js";
import { AddInventoryItemsParams } from "../../types/tool-params.js";
interface AddInventoryItemsResult {
    eTag?: string;
    idempotencyId?: string;
    transactionIds?: string[];
}
export declare const AddInventoryItems: PlayFabHandler<AddInventoryItemsParams, AddInventoryItemsResult>;
export {};
//# sourceMappingURL=add-inventory-items.d.ts.map