export interface ControlFunctions {
    cancel: () => void;
}
export interface IDebounceOptions {
    leading?: boolean;
    minWait?: number;
}
export interface IDebouncedFunction<T extends (...args: any[]) => ReturnType<T>> extends ControlFunctions {
    (...args: Parameters<T>): ReturnType<T> | undefined;
}
export default function useDebounce<T extends (...args: any[]) => ReturnType<T>>(func: T, wait?: number, options?: IDebounceOptions): IDebouncedFunction<T>;
