"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var useDebounce_1 = tslib_1.__importDefault(require("./useDebounce"));
/**
 * 简单的节流，直接调用防抖即可
 * @param func
 * @param wait
 * @param options
 * @returns
 */
function useThrottle(func, wait, options) {
    if (wait === void 0) { wait = 500; }
    if (options === void 0) { options = {}; }
    return (0, useDebounce_1.default)(func, wait, tslib_1.__assign(tslib_1.__assign({}, options), { minWait: wait }));
}
exports.default = useThrottle;
