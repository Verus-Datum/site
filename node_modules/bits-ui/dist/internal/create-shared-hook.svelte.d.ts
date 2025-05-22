import type { AnyFn } from "./types.js";
export declare function createSharedHook<T extends AnyFn>(factory: T): T;
