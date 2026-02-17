/**
 * AddLocalizedNews handler with dependency injection
 */
import { BaseHandler } from '../base-handler.js';
import { HandlerResponse } from '../../types/index.js';
interface AddLocalizedNewsParams {
    DefaultTitle: string;
    DefaultBody: string;
    Timestamp?: string;
    Localizations?: Array<{
        Language: string;
        Title: string;
        Body: string;
    }>;
}
interface LocalizationResult {
    language: string;
    success: boolean;
    error?: string;
}
interface AddLocalizedNewsResult {
    newsId?: string;
    localizations: LocalizationResult[];
    message: string;
}
export declare class AddLocalizedNewsHandler extends BaseHandler<AddLocalizedNewsParams, AddLocalizedNewsResult> {
    constructor();
    execute(params: AddLocalizedNewsParams): Promise<HandlerResponse<AddLocalizedNewsResult>>;
}
export declare const addLocalizedNewsHandler: AddLocalizedNewsHandler;
export declare const AddLocalizedNews: import("../../types/index.js").PlayFabHandler<AddLocalizedNewsParams, AddLocalizedNewsResult>;
export {};
//# sourceMappingURL=add-localized-news-di.d.ts.map