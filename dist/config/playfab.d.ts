export declare const PlayFab: PlayFabModule.IPlayFab;
export declare const PlayFabAdminAPI: PlayFabAdminModule.IPlayFabAdmin;
export declare const PlayFabAuthenticationAPI: PlayFabAuthenticationModule.IPlayFabAuthentication;
export declare const PlayFabEconomyAPI: PlayFabEconomyModule.IPlayFabEconomy;
export declare const PlayFabProfileAPI: PlayFabProfilesModule.IPlayFabProfiles;
export declare const PlayFabServerAPI: PlayFabServerModule.IPlayFabServer;
/**
 * Get current PlayFab configuration
 */
export declare function getPlayFabConfig(): {
    titleId: string;
    hasSecretKey: boolean;
};
/**
 * Check if PlayFab is properly configured
 */
export declare function isPlayFabConfigured(): boolean;
//# sourceMappingURL=playfab.d.ts.map