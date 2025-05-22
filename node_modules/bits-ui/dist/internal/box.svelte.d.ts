import type { ReadableBox, WritableBox } from "svelte-toolbelt";
export type Box<T> = ReadableBox<T> | WritableBox<T>;
export type WritableBoxedValues<T> = {
    [K in keyof T]: WritableBox<T[K]>;
};
export type ReadableBoxedValues<T> = {
    [K in keyof T]: ReadableBox<T[K]>;
};
type WatcherCallback<T> = (curr: T, prev: T) => void | Promise<void> | (() => void) | (() => Promise<void>);
type WatchOptions = {
    /**
     * Whether to eagerly run the watcher before the state is updated.
     */
    immediate?: boolean;
    /**
     * Whether to run the watcher only once.
     */
    once?: boolean;
};
export declare function watch<T>(box: Box<T>, callback: WatcherCallback<T>, options?: WatchOptions): () => void;
export {};
