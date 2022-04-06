import { useState, useCallback } from "react";
import useMounted from "./useMounted";
var xUseState = function (defaultState) {
    var _a = useState(defaultState), state = _a[0], setState = _a[1];
    // 获取组件状态
    var mounted = useMounted();
    //
    var xSetState = useCallback(function (state, callback) {
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
export default xUseState;
