import useState from "./useState";

import useDebounce from "./useDebounce";
export default function useDebounceValue(value: any, wait: number) {
  const [state, setState] = useState(value);

  const updateValue = useDebounce(setState, wait);

  return [state, updateValue];
}
