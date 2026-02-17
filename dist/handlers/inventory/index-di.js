"use strict";
/**
 * Export all inventory handlers with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInventoryItems = exports.SubtractInventoryItems = exports.GrantItemsToUsers = exports.GetInventoryItems = exports.GetInventoryCollectionIds = exports.ExecuteInventoryOperations = exports.DeleteInventoryItems = exports.AddInventoryItems = void 0;
var add_inventory_items_di_js_1 = require("./add-inventory-items-di.js");
Object.defineProperty(exports, "AddInventoryItems", { enumerable: true, get: function () { return add_inventory_items_di_js_1.AddInventoryItems; } });
var delete_inventory_items_di_js_1 = require("./delete-inventory-items-di.js");
Object.defineProperty(exports, "DeleteInventoryItems", { enumerable: true, get: function () { return delete_inventory_items_di_js_1.DeleteInventoryItems; } });
var execute_inventory_operations_di_js_1 = require("./execute-inventory-operations-di.js");
Object.defineProperty(exports, "ExecuteInventoryOperations", { enumerable: true, get: function () { return execute_inventory_operations_di_js_1.ExecuteInventoryOperations; } });
var get_inventory_collection_ids_di_js_1 = require("./get-inventory-collection-ids-di.js");
Object.defineProperty(exports, "GetInventoryCollectionIds", { enumerable: true, get: function () { return get_inventory_collection_ids_di_js_1.GetInventoryCollectionIds; } });
var get_inventory_items_di_js_1 = require("./get-inventory-items-di.js");
Object.defineProperty(exports, "GetInventoryItems", { enumerable: true, get: function () { return get_inventory_items_di_js_1.GetInventoryItems; } });
var grant_items_to_users_di_js_1 = require("./grant-items-to-users-di.js");
Object.defineProperty(exports, "GrantItemsToUsers", { enumerable: true, get: function () { return grant_items_to_users_di_js_1.GrantItemsToUsers; } });
var subtract_inventory_items_di_js_1 = require("./subtract-inventory-items-di.js");
Object.defineProperty(exports, "SubtractInventoryItems", { enumerable: true, get: function () { return subtract_inventory_items_di_js_1.SubtractInventoryItems; } });
var update_inventory_items_di_js_1 = require("./update-inventory-items-di.js");
Object.defineProperty(exports, "UpdateInventoryItems", { enumerable: true, get: function () { return update_inventory_items_di_js_1.UpdateInventoryItems; } });
//# sourceMappingURL=index-di.js.map