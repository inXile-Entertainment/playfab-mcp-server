"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests for SearchItems handler
 */
const search_items_1 = require("../search-items");
const playfab_1 = require("../../../config/playfab");
const playfab_wrapper_1 = require("../../../utils/playfab-wrapper");
const errors_1 = require("../../../utils/errors");
// Mock dependencies
jest.mock('../../../config/playfab');
jest.mock('../../../utils/playfab-wrapper', () => ({
    callAdminAPI: jest.fn(),
    addCustomTags: jest.fn((request) => ({ ...request, CustomTags: { mcp: 'true' } })),
}));
const mockCallAdminAPI = playfab_wrapper_1.callAdminAPI;
describe('SearchItems Handler', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should search items with required parameters', async () => {
        const mockResponse = {
            Items: [
                { Id: 'item1', Title: { en: 'Item 1' } },
                { Id: 'item2', Title: { en: 'Item 2' } },
            ],
            ContinuationToken: 'next-page-token',
        };
        mockCallAdminAPI.mockResolvedValueOnce(mockResponse);
        const result = await (0, search_items_1.SearchItems)({ Count: 10 });
        expect(result).toEqual({
            success: true,
            items: mockResponse.Items,
            continuationToken: mockResponse.ContinuationToken,
        });
        expect(mockCallAdminAPI).toHaveBeenCalledWith(playfab_1.PlayFabEconomyAPI.SearchItems, expect.objectContaining({
            Count: 10,
            CustomTags: { mcp: 'true' },
        }), 'SearchItems');
    });
    it('should search items with all optional parameters', async () => {
        const mockResponse = {
            Items: [],
            ContinuationToken: undefined,
        };
        mockCallAdminAPI.mockResolvedValueOnce(mockResponse);
        const params = {
            Count: 25,
            ContinuationToken: 'previous-token',
            Filter: "type eq 'weapon'",
            OrderBy: 'rating/average desc',
            Search: 'sword',
        };
        const result = await (0, search_items_1.SearchItems)(params);
        expect(result).toEqual({
            success: true,
            items: [],
            continuationToken: undefined,
        });
        expect(mockCallAdminAPI).toHaveBeenCalledWith(playfab_1.PlayFabEconomyAPI.SearchItems, expect.objectContaining({
            ...params,
            CustomTags: { mcp: 'true' },
        }), 'SearchItems');
    });
    it('should use default count when not provided', async () => {
        mockCallAdminAPI.mockResolvedValueOnce({ Items: [] });
        await (0, search_items_1.SearchItems)({});
        expect(mockCallAdminAPI).toHaveBeenCalledWith(playfab_1.PlayFabEconomyAPI.SearchItems, expect.objectContaining({
            Count: 10,
        }), 'SearchItems');
    });
    it('should validate count range', async () => {
        await expect((0, search_items_1.SearchItems)({ Count: 0 }))
            .rejects.toThrow(errors_1.ValidationError);
        await expect((0, search_items_1.SearchItems)({ Count: 51 }))
            .rejects.toThrow(errors_1.ValidationError);
    });
    it('should validate string parameters', async () => {
        await expect((0, search_items_1.SearchItems)({ Count: 10, Search: 123 }))
            .rejects.toThrow(errors_1.ValidationError);
        await expect((0, search_items_1.SearchItems)({ Count: 10, Filter: {} }))
            .rejects.toThrow(errors_1.ValidationError);
    });
    it('should validate string length limits', async () => {
        const longString = 'a'.repeat(2049);
        await expect((0, search_items_1.SearchItems)({ Count: 10, Search: longString }))
            .rejects.toThrow(errors_1.ValidationError);
    });
    it('should handle API errors', async () => {
        const apiError = new Error('API Error');
        mockCallAdminAPI.mockRejectedValueOnce(apiError);
        await expect((0, search_items_1.SearchItems)({ Count: 10 }))
            .rejects.toThrow('API Error');
    });
    it('should pass through custom tags', async () => {
        mockCallAdminAPI.mockResolvedValueOnce({ Items: [] });
        await (0, search_items_1.SearchItems)({ Count: 10 });
        const callArgs = mockCallAdminAPI.mock.calls[0];
        expect(callArgs?.[1]).toHaveProperty('CustomTags', expect.objectContaining({
            mcp: 'true',
        }));
    });
});
//# sourceMappingURL=search-items.test.js.map