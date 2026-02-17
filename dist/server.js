#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
exports.runServer = runServer;
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const dotenv = __importStar(require("dotenv"));
const pf = __importStar(require("playfab-sdk"));
const PlayFab = pf.PlayFab;
const PlayFabAdminAPI = pf.PlayFabAdmin;
const PlayFabAuthenticationAPI = pf.PlayFabAuthentication;
const PlayFabEconomyAPI = pf.PlayFabEconomy;
const PlayFabProfileAPI = pf.PlayFabProfiles;
const PlayFabServerAPI = pf.PlayFabServer;
dotenv.config({ quiet: true });
PlayFab.settings.titleId = process.env['PLAYFAB_TITLE_ID'];
PlayFab.settings.developerSecretKey = process.env['PLAYFAB_DEV_SECRET_KEY'];
const di_setup_js_1 = require("./config/di-setup.js");
(0, di_setup_js_1.setupDependencies)();
const catalogTools = __importStar(require("./tools/catalog/index.js"));
const inventoryTools = __importStar(require("./tools/inventory/index.js"));
const playerTools = __importStar(require("./tools/player/index.js"));
const titleTools = __importStar(require("./tools/title/index.js"));
const catalogHandlers = __importStar(require("./handlers/catalog/index.js"));
const inventoryHandlers = __importStar(require("./handlers/inventory/index.js"));
const playerHandlers = __importStar(require("./handlers/player/index.js"));
const titleHandlers = __importStar(require("./handlers/title/index.js"));
const analyticsTools = __importStar(require("./tools/analytics/index.js"));
const analyticsHandlers = __importStar(require("./handlers/analytics/index.js"));
const logger_js_1 = require("./utils/logger.js");
const router_js_1 = require("./utils/router.js");
const logger = (0, logger_js_1.createLogger)('server');
// Register all handlers
router_js_1.router.registerBatch({
    // Catalog handlers
    'search_items': catalogHandlers.SearchItems,
    'create_draft_item': catalogHandlers.CreateDraftItem,
    'update_draft_item': catalogHandlers.UpdateDraftItem,
    'delete_item': catalogHandlers.DeleteItem,
    'publish_draft_item': catalogHandlers.PublishDraftItem,
    'get_item': catalogHandlers.GetItem,
    'update_catalog_config': catalogHandlers.UpdateCatalogConfig,
    'get_catalog_config': catalogHandlers.GetCatalogConfig,
    'batch_create_draft_items': catalogHandlers.BatchCreateDraftItems,
    // Inventory handlers
    'add_inventory_items': inventoryHandlers.AddInventoryItems,
    'get_inventory_items': inventoryHandlers.GetInventoryItems,
    'get_inventory_collection_ids': inventoryHandlers.GetInventoryCollectionIds,
    'delete_inventory_items': inventoryHandlers.DeleteInventoryItems,
    'subtract_inventory_items': inventoryHandlers.SubtractInventoryItems,
    'update_inventory_items': inventoryHandlers.UpdateInventoryItems,
    'execute_inventory_operations': inventoryHandlers.ExecuteInventoryOperations,
    'grant_items_to_users': inventoryHandlers.GrantItemsToUsers,
    // Player handlers
    'get_title_player_account_ids': playerHandlers.GetTitlePlayerAccountIdsFromPlayFabIds,
    'get_all_segments': playerHandlers.GetAllSegments,
    'get_players_in_segments': playerHandlers.GetPlayersInSegments,
    'ban_users': playerHandlers.BanUsers,
    'revoke_all_bans_for_user': playerHandlers.RevokeAllBansForUser,
    'get_user_account_info': playerHandlers.GetUserAccountInfo,
    'get_user_data': playerHandlers.GetUserData,
    'update_user_data': playerHandlers.UpdateUserData,
    // Title handlers
    'get_title_data': titleHandlers.GetTitleData,
    'set_title_data': titleHandlers.SetTitleData,
    'get_title_internal_data': titleHandlers.GetTitleInternalData,
    'set_title_internal_data': titleHandlers.SetTitleInternalData,
    'get_title_news': titleHandlers.GetTitleNews,
    'add_localized_news': titleHandlers.AddLocalizedNews,
    // Analytics handlers
    'query_analytics': analyticsHandlers.QueryAnalytics,
});
exports.server = new index_js_1.Server({
    name: "playfab-mcp-server",
    version: "0.1.0",
}, {
    capabilities: {
        tools: {},
    },
});
exports.server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => ({
    tools: [
        catalogTools.SEARCH_ITEMS_TOOL,
        catalogTools.CREATE_DRAFT_ITEM_TOOL,
        catalogTools.UPDATE_DRAFT_ITEM_TOOL,
        catalogTools.DELETE_ITEM_TOOL,
        catalogTools.PUBLISH_DRAFT_ITEM_TOOL,
        catalogTools.GET_ITEM_TOOL,
        catalogTools.UPDATE_CATALOG_CONFIG_TOOL,
        catalogTools.GET_CATALOG_CONFIG_TOOL,
        catalogTools.BATCH_CREATE_DRAFT_ITEMS_TOOL,
        inventoryTools.ADD_INVENTORY_ITEMS_TOOL,
        inventoryTools.GET_INVENTORY_ITEMS_TOOL,
        inventoryTools.GET_INVENTORY_COLLECTION_IDS_TOOL,
        inventoryTools.DELETE_INVENTORY_ITEMS_TOOL,
        inventoryTools.SUBTRACT_INVENTORY_ITEMS_TOOL,
        inventoryTools.UPDATE_INVENTORY_ITEMS_TOOL,
        inventoryTools.EXECUTE_INVENTORY_OPERATIONS_TOOL,
        inventoryTools.GRANT_ITEMS_TO_USERS_TOOL,
        playerTools.GET_TITLE_PLAYER_ACCOUNT_IDS_FROM_PLAYFAB_IDS_TOOL,
        playerTools.GET_ALL_SEGMENTS_TOOL,
        playerTools.GET_PLAYERS_IN_SEGMENTS_TOOL,
        playerTools.BAN_USERS_TOOL,
        playerTools.REVOKE_ALL_BANS_FOR_USER_TOOL,
        playerTools.GET_USER_ACCOUNT_INFO_TOOL,
        playerTools.GET_USER_DATA_TOOL,
        playerTools.UPDATE_USER_DATA_TOOL,
        titleTools.SET_TITLE_DATA_TOOL,
        titleTools.GET_TITLE_DATA_TOOL,
        titleTools.SET_TITLE_INTERNAL_DATA_TOOL,
        titleTools.GET_TITLE_INTERNAL_DATA_TOOL,
        titleTools.ADD_LOCALIZED_NEWS_TOOL,
        titleTools.GET_TITLE_NEWS_TOOL,
        analyticsTools.QUERY_ANALYTICS_TOOL,
    ],
}));
exports.server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const perfLogger = new logger_js_1.PerformanceLogger(`Tool call: ${name}`);
    const startTime = Date.now();
    try {
        const result = await new Promise((resolve, reject) => {
            PlayFabAuthenticationAPI.GetEntityToken({
                CustomTags: {
                    user: PlayFab.buildIdentifier,
                    mcp: 'true'
                }
            }, (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                // Check if handler exists
                if (!router_js_1.router.has(name)) {
                    reject(new Error(`Unknown tool: ${name}`));
                    return;
                }
                // Execute handler using router
                router_js_1.router.execute(name, args)
                    .then(toolResult => resolve(toolResult))
                    .catch(toolError => reject(toolError));
            });
        });
        const duration = Date.now() - startTime;
        (0, logger_js_1.logToolCall)(name, args, result, duration);
        perfLogger.end({ tool: name });
        return {
            content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
    }
    catch (error) {
        const duration = Date.now() - startTime;
        (0, logger_js_1.logToolCall)(name, args, null, duration, error);
        perfLogger.error(error, { tool: name });
        const isDevelopment = process.env['NODE_ENV'] !== 'production';
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        const errorDetails = isDevelopment && error instanceof Error ? `\n${error.stack}` : '';
        return {
            content: [{ type: "text", text: `Error occurred: ${errorMessage}${errorDetails}` }],
            isError: true,
        };
    }
});
async function runServer() {
    logger.info('Starting PlayFab MCP Server...');
    const transport = new stdio_js_1.StdioServerTransport();
    await exports.server.connect(transport);
    logger.info('PlayFab MCP Server running on stdio');
}
//# sourceMappingURL=server.js.map