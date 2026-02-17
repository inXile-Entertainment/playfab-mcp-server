/**
 * Logging utility using Pino
 */
import pino from 'pino';
export declare const logger: pino.Logger<never, boolean>;
export declare const createLogger: (module: string) => pino.Logger<never, boolean>;
export interface LogContext {
    requestId?: string;
    method?: string;
    userId?: string;
    entityId?: string;
    titleId?: string;
    [key: string]: unknown;
}
export declare const createRequestLogger: (context: LogContext) => pino.Logger<never, boolean>;
export declare class PerformanceLogger {
    private startTime;
    private logger;
    constructor(operationName: string, logger?: pino.Logger);
    end(additionalData?: Record<string, unknown>): void;
    error(error: unknown, additionalData?: Record<string, unknown>): void;
}
export declare const logAPICall: (method: string, request: unknown, response: unknown, duration: number, error?: unknown) => void;
export declare const logToolCall: (toolName: string, args: unknown, result: unknown, duration: number, error?: unknown) => void;
//# sourceMappingURL=logger.d.ts.map