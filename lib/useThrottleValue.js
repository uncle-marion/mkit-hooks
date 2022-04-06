"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var useThrottle_1 = tslib_1.__importDefault(require("./useThrottle"));
function useThrottleValue(value, wait) {
    var _a = (0, react_1.useState)(value), state = _a[0], setState = _a[1];
    var updateValue = (0, useThrottle_1.default)(setState, wait);
    return [state, updateValue];
}
exports.default = useThrottleValue;
