import { __assign } from "tslib";
import useDebounce from "./useDebounce";
/**
 * 简单的节流，直接调用防抖即可
 * @param func
 * @param wait
 * @param options
 * @returns
 */
export default function useThrottle(func, wait, options) {
    if (wait === void 0) { wait = 500; }
    if (options === void 0) { options = {}; }
    return useDebounce(func, wait, __assign(__assign({}, options), { minWait: wait }));
}
