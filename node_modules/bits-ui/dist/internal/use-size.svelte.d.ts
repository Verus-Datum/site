import { type WritableBox } from "svelte-toolbelt";
export declare function useSize(node: WritableBox<HTMLElement | null>): {
    readonly value: {
        width: number;
        height: number;
    } | undefined;
};
