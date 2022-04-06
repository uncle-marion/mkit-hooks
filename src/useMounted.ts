import { useEffect, useRef } from "react";

export default function useMounted() {
  // 组件卸载标记
  const mounted = useRef(true);
  // 标记当前组件是否已卸载，避免内存溢出问题
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return mounted.current;
}
