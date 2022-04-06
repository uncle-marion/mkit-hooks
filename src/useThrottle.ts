import useDebounce, { IDebouncedFunction, IDebounceOptions } from "./useDebounce";

interface IThrottleOptions extends IDebounceOptions {
  trailing?: boolean; // 到期后是否执行
}

/**
 * 简单的节流，直接调用防抖即可
 * @param func
 * @param wait
 * @param options
 * @returns
 */
export default function useThrottle<T extends (...args: any[]) => ReturnType<T>>(
  func: T,
  wait: number = 500,
  options: IThrottleOptions = {}
): IDebouncedFunction<T> {
  return useDebounce(func, wait, { ...options, minWait: wait });
}
