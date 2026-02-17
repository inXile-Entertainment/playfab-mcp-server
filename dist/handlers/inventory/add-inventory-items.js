"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddInventoryItems = void 0;
const playfab_js_1 = require("../../config/playfab.js");
const playfab_wrapper_js_1 = require("../../utils/playfab-wrapper.js");
const input_validator_js_1 = require("../../utils/input-validator.js");
const AddInventoryItems = async (params) => {
    // Validate required parameters
    const titlePlayerAccountId = (0, input_validator_js_1.validatePlayerId)(params.TitlePlayerAccountId, 'TitlePlayerAccountId');
    const amount = (0, input_validator_js_1.validateCurrencyAmount)(params.Amount, 'Amount');
    if (!titlePlayerAccountId) {
        throw new Error('TitlePlayerAccountId is required');
    }
    // Build request with validated parameters
    const itemObject = (0, input_validator_js_1.validateObject)(params.Item, 'Item', { required: true });
    if (!itemObject) {
        throw new Error('Item is required');
    }
    const validatedParams = {
        Amount: amount,
        Item: itemObject,
        Entity: {
            Id: titlePlayerAccountId,
            Type: "title_player_account"
        }
    };
    // Optional parameters
    const collectionId = (0, input_validator_js_1.validateString)(params.CollectionId, 'CollectionId');
    if (collectionId)
        validatedParams.CollectionId = collectionId;
    const durationInSeconds = (0, input_validator_js_1.validateNumber)(params.DurationInSeconds, 'DurationInSeconds', {
        min: 0,
        integer: true
    });
    if (durationInSeconds !== undefined)
        validatedParams.DurationInSeconds = durationInSeconds;
    const idempotencyId = (0, input_validator_js_1.validateString)(params.IdempotencyId, 'IdempotencyId');
    if (idempotencyId)
        validatedParams.IdempotencyId = idempotencyId;
    if (params.NewStackValues !== undefined) {
        validatedParams.NewStackValues = (0, input_validator_js_1.validateObject)(params.NewStackValues, 'NewStackValues');
    }
    // Make API call with validated parameters
    const request = (0, playfab_wrapper_js_1.addCustomTags)(validatedParams);
    const result = await (0, playfab_wrapper_js_1.callPlayerAPI)(playfab_js_1.PlayFabEconomyAPI.AddInventoryItems, request, 'AddInventoryItems');
    return {
        success: true,
        eTag: result.ETag,
        idempotencyId: result.IdempotencyId,
        transactionIds: result.TransactionIds,
    };
};
exports.AddInventoryItems = AddInventoryItems;
//# sourceMappingURL=add-inventory-items.js.map