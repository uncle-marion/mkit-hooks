"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var useMounted_1 = tslib_1.__importDefault(require("./useMounted"));
var xUseState = function (initState) {
    // 初始化状态
    var _a = (0, react_1.useState)(initState), state = _a[0], setState = _a[1];
    // 初始化回调函数
    var cb = (0, react_1.useRef)(null);
    // 获取组件状态
    var mounted = (0, useMounted_1.default)();
    (0, react_1.useEffect)(function () {
        cb.current && cb.current(state);
    }, [state]);
    // 覆写setState方法
    var xSetState = (0, react_1.useCallback)(
    // 参数从一个变成两个，第二个参数为回调方法
    function (state, callback) {
        if (callback === void 0) { callback = function () { }; }
        // 如果组件已经卸载就不再更新state
        if (!mounted) {
            console.warn("组件卸载, 已无法正常写入");
        }
        else {
            cb.current = callback;
            // 调用系统方法更新state
            setState(state);
        }
    }, [mounted]);
    // 返回与useState一致
    return [state, xSetState];
};
exports.default = xUseState;
