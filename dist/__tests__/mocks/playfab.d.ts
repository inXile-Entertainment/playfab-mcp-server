/**
 * Mock implementations for PlayFab SDK
 */
export declare const mockPlayFabError: {
    error: string;
    errorCode: number;
    errorMessage: string;
    code: number;
};
export declare const mockPlayFabSuccess: <T>(data: T) => {
    data: T;
};
export declare const mockPlayFab: {
    settings: {
        titleId: string;
        developerSecretKey: string;
    };
};
export declare const mockPlayFabAdminAPI: {
    GetAllSegments: jest.Mock<any, any, any>;
    GetPlayersInSegment: jest.Mock<any, any, any>;
    BanUsers: jest.Mock<any, any, any>;
    RevokeAllBansForUser: jest.Mock<any, any, any>;
    GetUserAccountInfo: jest.Mock<any, any, any>;
    GetUserData: jest.Mock<any, any, any>;
    UpdateUserData: jest.Mock<any, any, any>;
    GetTitleData: jest.Mock<any, any, any>;
    SetTitleData: jest.Mock<any, any, any>;
    GetTitleInternalData: jest.Mock<any, any, any>;
    SetTitleInternalData: jest.Mock<any, any, any>;
    GetTitleNews: jest.Mock<any, any, any>;
    AddLocalizedNews: jest.Mock<any, any, any>;
};
export declare const mockPlayFabAuthenticationAPI: {
    GetEntityToken: jest.Mock<any, any, any>;
};
export declare const mockPlayFabEconomyAPI: {
    SearchItems: jest.Mock<any, any, any>;
    CreateDraftItem: jest.Mock<any, any, any>;
    UpdateDraftItem: jest.Mock<any, any, any>;
    DeleteItem: jest.Mock<any, any, any>;
    PublishDraftItem: jest.Mock<any, any, any>;
    GetItem: jest.Mock<any, any, any>;
    UpdateCatalogConfig: jest.Mock<any, any, any>;
    GetCatalogConfig: jest.Mock<any, any, any>;
    AddInventoryItems: jest.Mock<any, any, any>;
    GetInventoryItems: jest.Mock<any, any, any>;
    GetInventoryCollectionIds: jest.Mock<any, any, any>;
    DeleteInventoryItems: jest.Mock<any, any, any>;
    SubtractInventoryItems: jest.Mock<any, any, any>;
    UpdateInventoryItems: jest.Mock<any, any, any>;
    ExecuteInventoryOperations: jest.Mock<any, any, any>;
};
export declare const mockPlayFabProfileAPI: {
    GetProfile: jest.Mock<any, any, any>;
    GetProfiles: jest.Mock<any, any, any>;
    GetTitlePlayersFromMasterPlayerAccountIds: jest.Mock<any, any, any>;
};
export declare const mockPlayFabServerAPI: {
    GrantItemsToUsers: jest.Mock<any, any, any>;
};
export declare function resetAllMocks(): void;
export declare function setupCommonMocks(): void;
//# sourceMappingURL=playfab.d.ts.map