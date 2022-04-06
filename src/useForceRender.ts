import { useState } from "react";

const useUpdate = () => {
  const [, setFlag] = useState<number>();
  const update = () => {
    setFlag(Date.now());
  };

  return update;
};

export default useUpdate;
