import { useState } from "react";
import useThrottle from "./useThrottle";
export default function useThrottleValue(value, wait) {
    var _a = useState(value), state = _a[0], setState = _a[1];
    var updateValue = useThrottle(setState, wait);
    return [state, updateValue];
}
