"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useUpdate = function () {
    var _a = (0, react_1.useState)(), setFlag = _a[1];
    var update = function () {
        setFlag(Date.now());
    };
    return update;
};
exports.default = useUpdate;
