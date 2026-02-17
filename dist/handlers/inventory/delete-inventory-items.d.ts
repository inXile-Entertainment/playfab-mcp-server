import { PlayFabHandler } from "../../types/index.js";
import { DeleteInventoryItemsParams, DeleteInventoryItemsResult } from "../../types/handler-types.js";
interface DeleteInventoryParams extends DeleteInventoryItemsParams {
    ConfirmDeletion?: boolean;
}
export declare const DeleteInventoryItems: PlayFabHandler<DeleteInventoryParams, DeleteInventoryItemsResult>;
export {};
//# sourceMappingURL=delete-inventory-items.d.ts.map