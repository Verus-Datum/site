import type { Box } from "./box.svelte.js";
import type { AnyFn, Fn } from "./types.js";
export type UseTimeoutFnOptions = {
    /**
     * Start the timer immediate after calling this function
     *
     * @default true
     */
    immediate?: boolean;
};
export type Stoppable<StartFnArgs extends unknown[] = unknown[]> = {
    /**
     * A ref indicate whether a stoppable instance is executing
     */
    isPending: Readonly<Box<boolean>>;
    /**
     * Stop the effect from executing
     */
    stop: Fn;
    /**
     * Start the effects
     */
    start: (...args: StartFnArgs) => void;
};
export declare function useTimeoutFn<T extends AnyFn>(cb: T, interval: number, options?: UseTimeoutFnOptions): Stoppable<Parameters<T> | []>;
