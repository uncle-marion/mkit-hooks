import { useState, useCallback, useRef, useEffect } from "react";
import useMounted from "./useMounted";
var xUseState = function (initState) {
    // 初始化状态
    var _a = useState(initState), state = _a[0], setState = _a[1];
    // 初始化回调函数
    var cb = useRef(null);
    // 获取组件状态
    var mounted = useMounted();
    useEffect(function () {
        cb.current && cb.current(state);
    }, [state]);
    // 覆写setState方法
    var xSetState = useCallback(
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
export default xUseState;
