"use strict";
/**
 * Mock implementations for PlayFab SDK
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockPlayFabServerAPI = exports.mockPlayFabProfileAPI = exports.mockPlayFabEconomyAPI = exports.mockPlayFabAuthenticationAPI = exports.mockPlayFabAdminAPI = exports.mockPlayFab = exports.mockPlayFabSuccess = exports.mockPlayFabError = void 0;
exports.resetAllMocks = resetAllMocks;
exports.setupCommonMocks = setupCommonMocks;
exports.mockPlayFabError = {
    error: 'TestError',
    errorCode: 1000,
    errorMessage: 'Test error message',
    code: 400,
};
const mockPlayFabSuccess = (data) => ({
    data,
});
exports.mockPlayFabSuccess = mockPlayFabSuccess;
// Mock PlayFab SDK modules
exports.mockPlayFab = {
    settings: {
        titleId: 'TEST1',
        developerSecretKey: 'testsecretkey123456789012345678901234567890',
    },
};
exports.mockPlayFabAdminAPI = {
    GetAllSegments: jest.fn(),
    GetPlayersInSegment: jest.fn(),
    BanUsers: jest.fn(),
    RevokeAllBansForUser: jest.fn(),
    GetUserAccountInfo: jest.fn(),
    GetUserData: jest.fn(),
    UpdateUserData: jest.fn(),
    GetTitleData: jest.fn(),
    SetTitleData: jest.fn(),
    GetTitleInternalData: jest.fn(),
    SetTitleInternalData: jest.fn(),
    GetTitleNews: jest.fn(),
    AddLocalizedNews: jest.fn(),
};
exports.mockPlayFabAuthenticationAPI = {
    GetEntityToken: jest.fn(),
};
exports.mockPlayFabEconomyAPI = {
    SearchItems: jest.fn(),
    CreateDraftItem: jest.fn(),
    UpdateDraftItem: jest.fn(),
    DeleteItem: jest.fn(),
    PublishDraftItem: jest.fn(),
    GetItem: jest.fn(),
    UpdateCatalogConfig: jest.fn(),
    GetCatalogConfig: jest.fn(),
    AddInventoryItems: jest.fn(),
    GetInventoryItems: jest.fn(),
    GetInventoryCollectionIds: jest.fn(),
    DeleteInventoryItems: jest.fn(),
    SubtractInventoryItems: jest.fn(),
    UpdateInventoryItems: jest.fn(),
    ExecuteInventoryOperations: jest.fn(),
};
exports.mockPlayFabProfileAPI = {
    GetProfile: jest.fn(),
    GetProfiles: jest.fn(),
    GetTitlePlayersFromMasterPlayerAccountIds: jest.fn(),
};
exports.mockPlayFabServerAPI = {
    GrantItemsToUsers: jest.fn(),
};
// Helper to reset all mocks
function resetAllMocks() {
    jest.clearAllMocks();
}
// Helper to setup common mock responses
function setupCommonMocks() {
    // Mock GetEntityToken to always succeed
    exports.mockPlayFabAuthenticationAPI.GetEntityToken.mockImplementation((request, callback) => {
        callback(null, (0, exports.mockPlayFabSuccess)({
            EntityToken: 'mock-entity-token',
            TokenExpiration: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        }));
    });
}
//# sourceMappingURL=playfab.js.map