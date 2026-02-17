/**
 * GetCatalogConfig handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { GetCatalogConfigParams, GetCatalogConfigResult } from '../../types/handler-types.js';
export declare class GetCatalogConfigHandler extends BaseHandler<GetCatalogConfigParams, GetCatalogConfigResult> {
    constructor();
    execute(params: GetCatalogConfigParams): Promise<HandlerResponse<GetCatalogConfigResult>>;
}
export declare const getCatalogConfigHandler: GetCatalogConfigHandler;
export declare const GetCatalogConfig: import("../../types/index.js").PlayFabHandler<GetCatalogConfigParams, GetCatalogConfigResult>;
//# sourceMappingURL=get-catalog-config-di.d.ts.map