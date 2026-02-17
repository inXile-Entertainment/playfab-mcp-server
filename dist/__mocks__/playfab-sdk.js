"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Mock for playfab-sdk module
 */
const playfab_1 = require("../__tests__/mocks/playfab");
module.exports = {
    PlayFab: playfab_1.mockPlayFab,
    PlayFabAdmin: playfab_1.mockPlayFabAdminAPI,
    PlayFabAuthentication: playfab_1.mockPlayFabAuthenticationAPI,
    PlayFabEconomy: playfab_1.mockPlayFabEconomyAPI,
    PlayFabProfiles: playfab_1.mockPlayFabProfileAPI,
    PlayFabServer: playfab_1.mockPlayFabServerAPI,
};
//# sourceMappingURL=playfab-sdk.js.map