import { type ReadableBox } from "svelte-toolbelt";
export declare function usePresence(present: ReadableBox<boolean>, id: ReadableBox<string>): {
    readonly current: boolean;
};
