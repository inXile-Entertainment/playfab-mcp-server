"use strict";
/**
 * GetAllSegments handler with dependency injection
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllSegments = exports.getAllSegmentsHandler = exports.GetAllSegmentsHandler = void 0;
const base_handler_js_1 = require("../base-handler.js");
class GetAllSegmentsHandler extends base_handler_js_1.BaseHandler {
    constructor() {
        super('GetAllSegments');
    }
    async execute(_params) {
        try {
            this.logInfo('Getting all segments');
            // Build request object
            const request = this.addCustomTags({});
            // Make API call
            const result = await this.callAdminAPI(this.context.apis.adminAPI.GetAllSegments, request, 'GetAllSegments');
            const transformedSegments = (result.Segments || []).map(segment => ({
                Id: segment.Id || '',
                Name: segment.Name || '',
                Description: segment.Description
            }));
            this.logInfo('Segments retrieved', {
                segmentCount: transformedSegments.length
            });
            return {
                success: true,
                segments: transformedSegments
            };
        }
        catch (error) {
            this.logError('Failed to get all segments', error);
            throw error;
        }
    }
}
exports.GetAllSegmentsHandler = GetAllSegmentsHandler;
// Export a singleton instance
exports.getAllSegmentsHandler = new GetAllSegmentsHandler();
// Export the handler function for backward compatibility
exports.GetAllSegments = exports.getAllSegmentsHandler.toHandler();
//# sourceMappingURL=get-all-segments-di.js.map