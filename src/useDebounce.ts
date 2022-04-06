import { useRef, useMemo, useCallback } from "react";

import useMounted from "./useMounted";

export interface ControlFunctions {
  cancel: () => void;
}

// 配置项
export interface IDebounceOptions {
  leading?: boolean; // 首次触发时执行还是最后一次触发时执行
  minWait?: number; // 再次触发的最小时间间隔
}

// 声明hook方法的类型
export interface IDebouncedFunction<T extends (...args: any[]) => ReturnType<T>>
  extends ControlFunctions {
  (...args: Parameters<T>): ReturnType<T> | undefined;
}

export default function useDebounce<T extends (...args: any[]) => ReturnType<T>>(
  func: T,
  wait: number = 300,
  options?: IDebounceOptions
): IDebouncedFunction<T> {
  // 最后一次执行时间
  const lastInvokeTime = useRef(0);
  // 最后一次调用时间
  const lastCallTime = useRef(0);
  // 最后一次执行时的参数集
  const lastArgs = useRef<any[]>([]);
  // 待执行函数
  const funcRef = useRef(func);

  // 用于延时执行的定时器
  const timer = useRef<NodeJS.Timeout | null>(null);

  const mounted = useMounted();

  const leading = options?.leading ?? false; // 默认以传统防抖设定为准，最后一次触发事件
  const minWait = options?.minWait ?? 0; // 默认如果不传两次事件的最小差时，以传统防抖设定为准

  /**
   * 延时执行函数的定时器
   */
  const startTimer = useCallback((func: () => void, wait: number) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(func, wait);
  }, []);

  /**
   * 执行回调函数并记录执行时间
   * @param time
   * @returns
   */
  const invokeFunc = (time: number) => {
    // 缓存参数
    const args = lastArgs.current;
    // 清空参数记录
    lastArgs.current = [];
    // 更新最后一次执行时间
    lastInvokeTime.current = time;
    // 执行函数
    return funcRef.current(...args);
  };

  /**
   * 校验是否可以执行回调函数
   * @param time
   * @returns
   */
  const shouldInvoke = (time: number) => {
    const invokeDiff = time - lastInvokeTime.current;
    const callDiff = time - lastCallTime.current;

    return (
      // 首次调用直接激活
      lastInvokeTime.current === 0 ||
      // 正常使用，超过等待时间就可以激活，否则只能不断地清除
      callDiff > wait ||
      // 如果传入了两次事件间的最小时间，则只要上次调用时的时间超过这个时间即可激活
      !!(minWait && invokeDiff > minWait)
    );
  };

  /**
   * 防抖主函数
   */
  const debounced = useMemo(() => {
    /**
     * 条件符合时会被执行的函数
     * @param args
     * @returns
     */
    const func: IDebouncedFunction<T> = (...args: Parameters<T>): any => {
      // 组件已经不存在，不允许执行
      if (!mounted) {
        return false;
      }

      lastArgs.current = args;
      const time = Date.now();
      // 更新最后一次调用时间
      lastCallTime.current = time;

      // 设定条件为立刻响应的操作
      if (leading) {
        const ableInvoke = shouldInvoke(time);
        // 条件不符合，不允许执行
        if (!ableInvoke) {
          return;
        }
        // 执行方法
        return invokeFunc(time);
      }
      // 非首次调用激活的
      // 计算上次调用的时间差
      const invokeDiff = time - lastInvokeTime.current;

      // 如果有两次时间间隔，且已经超过上次执行，则直接执行事件
      if (minWait && invokeDiff > minWait) {
        return invokeFunc(time);
      }

      // 无两次时间间隔，或未超过等待时间，等待时间到达后再执行
      return startTimer(() => invokeFunc(time), wait);
    };

    func.cancel = () => {
      // 清除定时器
      if (timer.current) {
        clearTimeout(timer.current);
      }
      lastInvokeTime.current = 0;
      lastCallTime.current = 0;
      timer.current = null;
    };

    return func;
  }, []);

  return debounced;
}
