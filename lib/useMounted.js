"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useMounted() {
    // 组件卸载标记
    var mounted = (0, react_1.useRef)(true);
    // 标记当前组件是否已卸载，避免内存溢出问题
    (0, react_1.useEffect)(function () {
        mounted.current = true;
        return function () {
            mounted.current = false;
        };
    }, []);
    return mounted.current;
}
exports.default = useMounted;
