import { useState, useCallback } from "react";

import useMounted from "./useMounted";

type TXSetState<S, C = (s: S) => void> = (prevState: S, callback?: C) => S;

interface IXUseState {
  <S extends any>(state: S): [S, TXSetState<S>];
}

const xUseState: IXUseState = (defaultState) => {
  const [state, setState] = useState(defaultState);

  // 获取组件状态
  const mounted = useMounted();

  //
  const xSetState: TXSetState<any, any> = useCallback(
    (state, callback) => {
      console.log(state, callback, "%%%%%%%%%%%%%%%%%%^^^^^^^^^^^^^");
      // 如果组件已经卸载就不再更新state
      if (!mounted) {
        console.log("组件已卸载");
        return false;
      }
      callback && callback(state);
      // 调用系统方法更新state
      return setState(state);
    },
    [mounted]
  );
  return [state, xSetState];
};

export default xUseState;
