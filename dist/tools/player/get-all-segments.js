"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_ALL_SEGMENTS_TOOL = void 0;
exports.GET_ALL_SEGMENTS_TOOL = {
    name: "get_all_segments",
    description: "Retrieves an array of player segment definitions. " +
        "Results from this can be used in subsequent API calls " +
        "such as GetPlayersInSegment which requires a Segment ID. " +
        "While segment names can change the ID for that segment will not change.",
    inputSchema: {
        type: "object",
        properties: {},
        required: [],
    },
};
//# sourceMappingURL=get-all-segments.js.map