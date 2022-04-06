import useState from "./useState";
import useDebounce from "./useDebounce";
export default function useDebounceValue(value, wait) {
    var _a = useState(value), state = _a[0], setState = _a[1];
    var updateValue = useDebounce(setState, wait);
    return [state, updateValue];
}
