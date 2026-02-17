"use strict";
/**
 * GetPlayersInSegments handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPlayersInSegments = exports.getPlayersInSegmentsHandler = exports.GetPlayersInSegmentsHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class GetPlayersInSegmentsHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('GetPlayersInSegments');
    }
    async execute(params) {
        try {
            this.logInfo('Getting players in segment', {
                segmentId: params.SegmentId,
                maxBatchSize: params.MaxBatchSize,
                hasContinuationToken: !!params.ContinuationToken
            });
            // Build request object
            const request = this.addCustomTags({
                SegmentId: params.SegmentId,
                SecondsToLive: params.SecondsToLive,
                MaxBatchSize: params.MaxBatchSize,
                ContinuationToken: params.ContinuationToken
            });
            // Make API call
            const result = await this.callAdminAPI(this.context.apis.adminAPI.GetPlayersInSegment, request, 'GetPlayersInSegment');
            this.logInfo('Players in segment retrieved', {
                segmentId: params.SegmentId,
                profileCount: result.PlayerProfiles?.length || 0,
                totalProfiles: result.ProfilesInSegment || 0,
                hasContinuationToken: !!result.ContinuationToken
            });
            return {
                success: true,
                playerProfiles: result.PlayerProfiles || [],
                continuationToken: result.ContinuationToken,
                profilesInSegment: result.ProfilesInSegment || 0
            };
        }
        catch (error) {
            this.logError('Failed to get players in segment', error);
            throw error;
        }
    }
}
exports.GetPlayersInSegmentsHandler = GetPlayersInSegmentsHandler;
// Export a singleton instance
exports.getPlayersInSegmentsHandler = new GetPlayersInSegmentsHandler();
// Export the handler function for backward compatibility
exports.GetPlayersInSegments = exports.getPlayersInSegmentsHandler.toHandler();
//# sourceMappingURL=get-players-in-segments-di.js.map