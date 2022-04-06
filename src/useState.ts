import { useState, useCallback, useRef, useEffect } from "react";

import useMounted from "./useMounted";

interface ISetStateCallback<S> {
  (s: S): void;
}
interface IXSetState<S, C = ISetStateCallback<S>> {
  (state: S, callback?: C): void;
}

interface IXUseState {
  <S extends any>(state: S): [S, IXSetState<S>];
}

const xUseState: IXUseState = <S>(initState: S) => {
  // 初始化状态
  const [state, setState] = useState<S>(initState);
  // 初始化回调函数
  const cb = useRef<ISetStateCallback<S> | null>(null);
  // 获取组件状态
  const mounted = useMounted();

  useEffect(() => {
    cb.current && cb.current(state);
  }, [state]);

  // 覆写setState方法
  const xSetState = useCallback<IXSetState<S>>(
    // 参数从一个变成两个，第二个参数为回调方法
    (state: S, callback: ISetStateCallback<S> = () => {}) => {
      // 如果组件已经卸载就不再更新state
      if (!mounted) {
        console.warn("组件卸载, 已无法正常写入");
      } else {
        cb.current = callback;
        // 调用系统方法更新state
        setState(state);
      }
    },
    [mounted]
  );
  // 返回与useState一致
  return [state, xSetState];
};

export default xUseState;
