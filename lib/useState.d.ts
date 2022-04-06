interface ISetStateCallback<S> {
    (s: S): void;
}
interface IXSetState<S, C = ISetStateCallback<S>> {
    (state: S, callback?: C): void;
}
interface IXUseState {
    <S extends any>(state: S): [S, IXSetState<S>];
}
declare const xUseState: IXUseState;
export default xUseState;
