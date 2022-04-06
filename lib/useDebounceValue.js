"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var useState_1 = tslib_1.__importDefault(require("./useState"));
var useDebounce_1 = tslib_1.__importDefault(require("./useDebounce"));
function useDebounceValue(value, wait) {
    var _a = (0, useState_1.default)(value), state = _a[0], setState = _a[1];
    var updateValue = (0, useDebounce_1.default)(setState, wait);
    return [state, updateValue];
}
exports.default = useDebounceValue;
