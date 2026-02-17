"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests for AddInventoryItems handler
 */
const add_inventory_items_1 = require("../add-inventory-items");
const playfab_1 = require("../../../config/playfab");
const playfab_wrapper_1 = require("../../../utils/playfab-wrapper");
const errors_1 = require("../../../utils/errors");
// Mock dependencies
jest.mock('../../../config/playfab');
jest.mock('../../../utils/playfab-wrapper', () => ({
    callPlayerAPI: jest.fn(),
    addCustomTags: jest.fn((request) => ({ ...request, CustomTags: { mcp: 'true' } })),
}));
const mockCallPlayerAPI = playfab_wrapper_1.callPlayerAPI;
describe('AddInventoryItems Handler', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should add inventory items with required parameters', async () => {
        const mockResponse = {
            ETag: 'etag-123',
            IdempotencyId: 'idempotency-456',
            TransactionIds: ['transaction-789'],
        };
        mockCallPlayerAPI.mockResolvedValueOnce(mockResponse);
        const params = {
            TitlePlayerAccountId: 'A1B2C3D4E5F67890',
            Amount: 5,
            Item: { Id: 'item1', Type: 'Currency' },
        };
        const result = await (0, add_inventory_items_1.AddInventoryItems)(params);
        expect(result).toEqual({
            success: true,
            eTag: mockResponse.ETag,
            idempotencyId: mockResponse.IdempotencyId,
            transactionIds: mockResponse.TransactionIds,
        });
        expect(mockCallPlayerAPI).toHaveBeenCalledWith(playfab_1.PlayFabEconomyAPI.AddInventoryItems, expect.objectContaining({
            Amount: 5,
            Item: { Id: 'item1', Type: 'Currency' },
            Entity: {
                Id: 'A1B2C3D4E5F67890',
                Type: 'title_player_account',
            },
            CustomTags: { mcp: 'true' },
        }), 'AddInventoryItems');
    });
    it('should add inventory items with all optional parameters', async () => {
        const mockResponse = {
            ETag: 'etag-123',
            IdempotencyId: 'custom-idempotency',
            TransactionIds: ['transaction-789'],
        };
        mockCallPlayerAPI.mockResolvedValueOnce(mockResponse);
        const params = {
            TitlePlayerAccountId: 'A1B2C3D4E5F67890',
            Amount: 10,
            Item: { Id: 'item2', Type: 'Item' },
            CollectionId: 'main',
            DurationInSeconds: 3600,
            IdempotencyId: 'custom-idempotency',
            NewStackValues: { displayName: 'Enhanced Item' },
        };
        const result = await (0, add_inventory_items_1.AddInventoryItems)(params);
        expect(result).toEqual({
            success: true,
            eTag: mockResponse.ETag,
            idempotencyId: mockResponse.IdempotencyId,
            transactionIds: mockResponse.TransactionIds,
        });
        expect(mockCallPlayerAPI).toHaveBeenCalledWith(playfab_1.PlayFabEconomyAPI.AddInventoryItems, expect.objectContaining({
            Amount: 10,
            Item: { Id: 'item2', Type: 'Item' },
            Entity: {
                Id: 'A1B2C3D4E5F67890',
                Type: 'title_player_account',
            },
            CollectionId: 'main',
            DurationInSeconds: 3600,
            IdempotencyId: 'custom-idempotency',
            NewStackValues: { displayName: 'Enhanced Item' },
            CustomTags: { mcp: 'true' },
        }), 'AddInventoryItems');
    });
    it('should throw validation error for missing TitlePlayerAccountId', async () => {
        const params = {
            Amount: 5,
            Item: { Id: 'item1', Type: 'Currency' },
        };
        await expect((0, add_inventory_items_1.AddInventoryItems)(params))
            .rejects.toThrow(errors_1.ValidationError);
    });
    it('should throw validation error for invalid Amount', async () => {
        const params = {
            TitlePlayerAccountId: 'A1B2C3D4E5F67890',
            Amount: 'invalid',
            Item: { Id: 'item1', Type: 'Currency' },
        };
        await expect((0, add_inventory_items_1.AddInventoryItems)(params))
            .rejects.toThrow(errors_1.ValidationError);
    });
    it('should throw validation error for missing Item', async () => {
        const params = {
            TitlePlayerAccountId: 'A1B2C3D4E5F67890',
            Amount: 5,
        };
        await expect((0, add_inventory_items_1.AddInventoryItems)(params))
            .rejects.toThrow('Item is required');
    });
    it('should throw validation error for negative Amount', async () => {
        const params = {
            TitlePlayerAccountId: 'A1B2C3D4E5F67890',
            Amount: -5,
            Item: { Id: 'item1', Type: 'Currency' },
        };
        await expect((0, add_inventory_items_1.AddInventoryItems)(params))
            .rejects.toThrow(errors_1.ValidationError);
    });
    it('should throw validation error for negative DurationInSeconds', async () => {
        const params = {
            TitlePlayerAccountId: 'A1B2C3D4E5F67890',
            Amount: 5,
            Item: { Id: 'item1', Type: 'Currency' },
            DurationInSeconds: -100,
        };
        await expect((0, add_inventory_items_1.AddInventoryItems)(params))
            .rejects.toThrow(errors_1.ValidationError);
    });
    it('should handle API errors', async () => {
        const apiError = new Error('PlayFab API Error');
        mockCallPlayerAPI.mockRejectedValueOnce(apiError);
        const params = {
            TitlePlayerAccountId: 'A1B2C3D4E5F67890',
            Amount: 5,
            Item: { Id: 'item1', Type: 'Currency' },
        };
        await expect((0, add_inventory_items_1.AddInventoryItems)(params))
            .rejects.toThrow('PlayFab API Error');
    });
    it('should handle zero Amount for currency', async () => {
        const mockResponse = {
            ETag: 'etag-123',
            IdempotencyId: 'idempotency-456',
            TransactionIds: ['transaction-789'],
        };
        mockCallPlayerAPI.mockResolvedValueOnce(mockResponse);
        const params = {
            TitlePlayerAccountId: 'A1B2C3D4E5F67890',
            Amount: 0,
            Item: { Id: 'currency1', Type: 'Currency' },
        };
        const result = await (0, add_inventory_items_1.AddInventoryItems)(params);
        expect(result.success).toBe(true);
        expect(mockCallPlayerAPI).toHaveBeenCalledWith(playfab_1.PlayFabEconomyAPI.AddInventoryItems, expect.objectContaining({
            Amount: 0,
        }), 'AddInventoryItems');
    });
    it('should pass through custom tags', async () => {
        const mockResponse = {
            ETag: 'etag-123',
            IdempotencyId: 'idempotency-456',
            TransactionIds: ['transaction-789'],
        };
        mockCallPlayerAPI.mockResolvedValueOnce(mockResponse);
        const params = {
            TitlePlayerAccountId: 'A1B2C3D4E5F67890',
            Amount: 5,
            Item: { Id: 'item1', Type: 'Currency' },
        };
        await (0, add_inventory_items_1.AddInventoryItems)(params);
        const callArgs = mockCallPlayerAPI.mock.calls[0];
        expect(callArgs?.[1]).toHaveProperty('CustomTags', expect.objectContaining({
            mcp: 'true',
        }));
    });
});
//# sourceMappingURL=add-inventory-items.test.js.map