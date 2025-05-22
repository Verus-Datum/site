import { type Getter } from "svelte-toolbelt";
export type ScrollBodyOption = {
    padding?: boolean | number;
    margin?: boolean | number;
};
export declare function useBodyScrollLock(initialState?: boolean | undefined, restoreScrollDelay?: Getter<number | null>): import("svelte-toolbelt").WritableBox<boolean> | undefined;
