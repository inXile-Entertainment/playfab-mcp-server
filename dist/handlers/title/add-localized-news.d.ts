import { PlayFabHandler } from "../../types/index.js";
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
export declare const AddLocalizedNews: PlayFabHandler<AddLocalizedNewsParams, AddLocalizedNewsResult>;
export {};
//# sourceMappingURL=add-localized-news.d.ts.map