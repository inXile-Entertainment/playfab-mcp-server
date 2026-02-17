"use strict";
/**
 * Export all tool definitions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEARCH_ITEMS_TOOL = void 0;
exports.getAllTools = getAllTools;
// Catalog tools
var search_items_1 = require("./catalog/search-items");
Object.defineProperty(exports, "SEARCH_ITEMS_TOOL", { enumerable: true, get: function () { return search_items_1.SEARCH_ITEMS_TOOL; } });
// Inventory tools
// TODO: Export inventory tools after migration
// Player tools  
// TODO: Export player tools after migration
// Title tools
// TODO: Export title tools after migration
/**
 * Get all available tools as an array
 */
function getAllTools() {
    return [
    // Catalog
    // TODO: Add tools after importing them
    // TODO: Add other tools after migration
    ];
}
//# sourceMappingURL=index.js.map