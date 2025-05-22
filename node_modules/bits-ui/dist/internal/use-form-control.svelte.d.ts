import type { Getter } from "svelte-toolbelt";
export declare function useFormControl(getNode: Getter<HTMLElement | null>): {
    readonly current: boolean;
};
