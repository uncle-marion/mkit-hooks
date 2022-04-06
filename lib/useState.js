"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var useMounted_1 = tslib_1.__importDefault(require("./useMounted"));
var xUseState = function (defaultState) {
    var _a = (0, react_1.useState)(defaultState), state = _a[0], setState = _a[1];
    // 获取组件状态
    var mounted = (0, useMounted_1.default)();
    //
    var xSetState = (0, react_1.useCallback)(function (state, callback) {
        console.log(state, callback, "%%%%%%%%%%%%%%%%%%^^^^^^^^^^^^^");
        // 如果组件已经卸载就不再更新state
        if (!mounted) {
            console.log("组件已卸载");
            return false;
        }
        callback && callback(state);
        // 调用系统方法更新state
        return setState(state);
    }, [mounted]);
    return [state, xSetState];
};
exports.default = xUseState;
