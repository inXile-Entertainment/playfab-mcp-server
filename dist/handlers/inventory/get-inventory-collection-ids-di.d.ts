/**
 * GetInventoryCollectionIds handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { GetInventoryCollectionIdsParams, GetInventoryCollectionIdsResult } from '../../types/handler-types.js';
export declare class GetInventoryCollectionIdsHandler extends BaseHandler<GetInventoryCollectionIdsParams, GetInventoryCollectionIdsResult> {
    constructor();
    execute(params: GetInventoryCollectionIdsParams): Promise<HandlerResponse<GetInventoryCollectionIdsResult>>;
}
export declare const getInventoryCollectionIdsHandler: GetInventoryCollectionIdsHandler;
export declare const GetInventoryCollectionIds: import("../../types/index.js").PlayFabHandler<GetInventoryCollectionIdsParams, GetInventoryCollectionIdsResult>;
//# sourceMappingURL=get-inventory-collection-ids-di.d.ts.map