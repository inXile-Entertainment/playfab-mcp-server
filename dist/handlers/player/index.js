"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserData = exports.GetUserData = exports.GetUserAccountInfo = exports.RevokeAllBansForUser = exports.BanUsers = exports.GetTitlePlayerAccountIdsFromPlayFabIds = exports.GetPlayersInSegments = exports.GetAllSegments = void 0;
var get_all_segments_js_1 = require("./get-all-segments.js");
Object.defineProperty(exports, "GetAllSegments", { enumerable: true, get: function () { return get_all_segments_js_1.GetAllSegments; } });
var get_players_in_segments_js_1 = require("./get-players-in-segments.js");
Object.defineProperty(exports, "GetPlayersInSegments", { enumerable: true, get: function () { return get_players_in_segments_js_1.GetPlayersInSegments; } });
var get_title_player_account_ids_js_1 = require("./get-title-player-account-ids.js");
Object.defineProperty(exports, "GetTitlePlayerAccountIdsFromPlayFabIds", { enumerable: true, get: function () { return get_title_player_account_ids_js_1.GetTitlePlayerAccountIdsFromPlayFabIds; } });
var ban_users_js_1 = require("./ban-users.js");
Object.defineProperty(exports, "BanUsers", { enumerable: true, get: function () { return ban_users_js_1.BanUsers; } });
var revoke_all_bans_for_user_js_1 = require("./revoke-all-bans-for-user.js");
Object.defineProperty(exports, "RevokeAllBansForUser", { enumerable: true, get: function () { return revoke_all_bans_for_user_js_1.RevokeAllBansForUser; } });
var get_user_account_info_js_1 = require("./get-user-account-info.js");
Object.defineProperty(exports, "GetUserAccountInfo", { enumerable: true, get: function () { return get_user_account_info_js_1.GetUserAccountInfo; } });
// DI版を優先的に使用
var get_user_data_di_js_1 = require("./get-user-data-di.js");
Object.defineProperty(exports, "GetUserData", { enumerable: true, get: function () { return get_user_data_di_js_1.GetUserData; } });
var update_user_data_js_1 = require("./update-user-data.js");
Object.defineProperty(exports, "UpdateUserData", { enumerable: true, get: function () { return update_user_data_js_1.UpdateUserData; } });
//# sourceMappingURL=index.js.map