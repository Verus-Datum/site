export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;
/**
 * will return `true` if `T` is `any`, or `false` otherwise
 */
export type IsAny<T> = IfAny<T, true, false>;
type Callback<T> = IsAny<T> extends true ? (param: any) => void : [T] extends [void] ? () => void : (param: T) => void;
export type EventHookOn<T = unknown> = (fn: Callback<T>) => {
    off: () => void;
};
export type EventHookOff<T = unknown> = (fn: Callback<T>) => void;
export type EventHookTrigger<T = unknown> = (param?: T) => Promise<unknown[]>;
export interface EventHook<T = unknown> {
    on: EventHookOn<T>;
    off: EventHookOff<T>;
    trigger: EventHookTrigger<T>;
}
export declare function createEventHook<T = unknown>(): EventHook<T>;
export {};
