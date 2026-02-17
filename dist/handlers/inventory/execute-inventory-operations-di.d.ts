/**
 * ExecuteInventoryOperations handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
import { ExecuteInventoryOperationsParams, ExecuteInventoryOperationsResult } from '../../types/handler-types.js';
export declare class ExecuteInventoryOperationsHandler extends BaseHandler<ExecuteInventoryOperationsParams, ExecuteInventoryOperationsResult> {
    constructor();
    execute(params: ExecuteInventoryOperationsParams): Promise<HandlerResponse<ExecuteInventoryOperationsResult>>;
}
export declare const executeInventoryOperationsHandler: ExecuteInventoryOperationsHandler;
export declare const ExecuteInventoryOperations: import("../../types/index.js").PlayFabHandler<ExecuteInventoryOperationsParams, ExecuteInventoryOperationsResult>;
//# sourceMappingURL=execute-inventory-operations-di.d.ts.map