"use strict";
/**
 * Base handler class with dependency injection support
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHandler = void 0;
const di_setup_js_1 = require("../config/di-setup.js");
class BaseHandler {
    context;
    constructor(handlerName) {
        this.context = (0, di_setup_js_1.createHandlerContext)(handlerName);
    }
    /**
     * Create a handler function that can be used in the existing system
     */
    toHandler() {
        return (async (params) => {
            const response = await this.execute(params);
            if (!response.success) {
                throw response;
            }
            // Extract the result data, excluding the success property
            const { success, ...result } = response;
            return { ...result, success };
        });
    }
    /**
     * Helper method to log info
     */
    logInfo(message, data) {
        if (data !== undefined) {
            this.context.logger.info(data, message);
        }
        else {
            this.context.logger.info(message);
        }
    }
    /**
     * Helper method to log errors
     */
    logError(message, error) {
        this.context.logger.error({ error }, message);
    }
    /**
     * Helper method to validate required string
     */
    validateRequiredString(value, fieldName, options) {
        return this.context.utils.validator.validateRequiredString(value, fieldName, options);
    }
    /**
     * Helper method to validate optional string
     */
    validateString(value, fieldName, options) {
        return this.context.utils.validator.validateString(value, fieldName, options);
    }
    /**
     * Helper method to validate number
     */
    validateNumber(value, fieldName, options) {
        return this.context.utils.validator.validateNumber(value, fieldName, options);
    }
    /**
     * Helper method to validate pagination count
     */
    validatePaginationCount(value, fieldName, min, defaultValue) {
        return this.context.utils.validator.validatePaginationCount(value, fieldName, min, defaultValue);
    }
    /**
     * Helper method to create error response
     */
    createErrorResponse(code, message, data) {
        return this.context.utils.errors.createErrorResponse(code, message, data);
    }
    /**
     * Helper method to add custom tags
     */
    addCustomTags(request) {
        return this.context.utils.wrapper.addCustomTags(request);
    }
    /**
     * Helper method to call admin API
     */
    async callAdminAPI(apiMethod, request, methodName) {
        return this.context.utils.wrapper.callAdminAPI(apiMethod, request, methodName);
    }
    /**
     * Helper method to call player API
     */
    async callPlayerAPI(apiMethod, request, methodName) {
        return this.context.utils.wrapper.callPlayerAPI(apiMethod, request, methodName);
    }
    /**
     * Helper method to call bulk API
     */
    async callBulkAPI(apiMethod, request, methodName) {
        return this.context.utils.wrapper.callBulkAPI(apiMethod, request, methodName);
    }
}
exports.BaseHandler = BaseHandler;
//# sourceMappingURL=base-handler.js.map