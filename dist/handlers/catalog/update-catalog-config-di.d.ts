/**
 * UpdateCatalogConfig handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { UpdateCatalogConfigParams, UpdateCatalogConfigResult } from '../../types/handler-types.js';
export declare class UpdateCatalogConfigHandler extends BaseHandler<UpdateCatalogConfigParams, UpdateCatalogConfigResult> {
    constructor();
    execute(params: UpdateCatalogConfigParams): Promise<HandlerResponse<UpdateCatalogConfigResult>>;
}
export declare const updateCatalogConfigHandler: UpdateCatalogConfigHandler;
export declare const UpdateCatalogConfig: import("../../types/index.js").PlayFabHandler<UpdateCatalogConfigParams, UpdateCatalogConfigResult>;
//# sourceMappingURL=update-catalog-config-di.d.ts.map