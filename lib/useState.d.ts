declare type TXSetState<S, C = (s: S) => void> = (prevState: S, callback?: C) => S;
interface IXUseState {
    <S extends any>(state: S): [S, TXSetState<S>];
}
declare const xUseState: IXUseState;
export default xUseState;
