import { useRef, useMemo, useCallback } from "react";
import useMounted from "./useMounted";
export default function useDebounce(func, wait, options) {
    var _a, _b;
    if (wait === void 0) { wait = 300; }
    // 最后一次执行时间
    var lastInvokeTime = useRef(0);
    // 最后一次调用时间
    var lastCallTime = useRef(0);
    // 最后一次执行时的参数集
    var lastArgs = useRef([]);
    // 待执行函数
    var funcRef = useRef(func);
    // 用于延时执行的定时器
    var timer = useRef(null);
    var mounted = useMounted();
    var leading = (_a = options === null || options === void 0 ? void 0 : options.leading) !== null && _a !== void 0 ? _a : false; // 默认以传统防抖设定为准，最后一次触发事件
    var minWait = (_b = options === null || options === void 0 ? void 0 : options.minWait) !== null && _b !== void 0 ? _b : 0; // 默认如果不传两次事件的最小差时，以传统防抖设定为准
    /**
     * 延时执行函数的定时器
     */
    var startTimer = useCallback(function (func, wait) {
        if (timer.current)
            clearTimeout(timer.current);
        timer.current = setTimeout(func, wait);
    }, []);
    /**
     * 执行回调函数并记录执行时间
     * @param time
     * @returns
     */
    var invokeFunc = function (time) {
        // 缓存参数
        var args = lastArgs.current;
        // 清空参数记录
        lastArgs.current = [];
        // 更新最后一次执行时间
        lastInvokeTime.current = time;
        // 执行函数
        return funcRef.current.apply(funcRef, args);
    };
    /**
     * 校验是否可以执行回调函数
     * @param time
     * @returns
     */
    var shouldInvoke = function (time) {
        var invokeDiff = time - lastInvokeTime.current;
        var callDiff = time - lastCallTime.current;
        return (
        // 首次调用直接激活
        lastInvokeTime.current === 0 ||
            // 正常使用，超过等待时间就可以激活，否则只能不断地清除
            callDiff > wait ||
            // 如果传入了两次事件间的最小时间，则只要上次调用时的时间超过这个时间即可激活
            !!(minWait && invokeDiff > minWait));
    };
    /**
     * 防抖主函数
     */
    var debounced = useMemo(function () {
        /**
         * 条件符合时会被执行的函数
         * @param args
         * @returns
         */
        var func = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // 组件已经不存在，不允许执行
            if (!mounted) {
                return false;
            }
            lastArgs.current = args;
            var time = Date.now();
            // 更新最后一次调用时间
            lastCallTime.current = time;
            // 设定条件为立刻响应的操作
            if (leading) {
                var ableInvoke = shouldInvoke(time);
                // 条件不符合，不允许执行
                if (!ableInvoke) {
                    return;
                }
                // 执行方法
                return invokeFunc(time);
            }
            // 非首次调用激活的
            // 计算上次调用的时间差
            var invokeDiff = time - lastInvokeTime.current;
            // 如果有两次时间间隔，且已经超过上次执行，则直接执行事件
            if (minWait && invokeDiff > minWait) {
                return invokeFunc(time);
            }
            // 无两次时间间隔，或未超过等待时间，等待时间到达后再执行
            return startTimer(function () { return invokeFunc(time); }, wait);
        };
        func.cancel = function () {
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
