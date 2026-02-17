#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_js_1 = require("./server.js");
(0, server_js_1.runServer)().catch((error) => {
    console.error("Fatal error running server:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map