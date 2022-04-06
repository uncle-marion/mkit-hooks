import { useState } from "react";

import useThrottle from "./useThrottle";
export default function useThrottleValue(value: any, wait: number) {
  const [state, setState] = useState(value);

  const updateValue = useThrottle(setState, wait);

  return [state, updateValue];
}
