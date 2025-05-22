import type { ReadableBoxedValues } from "../../internal/box.svelte.js";
import type { WithRefProps } from "../../internal/types.js";
type ProgressRootStateProps = WithRefProps<ReadableBoxedValues<{
    value: number | null;
    max: number;
    min: number;
}>>;
declare class ProgressRootState {
    readonly opts: ProgressRootStateProps;
    constructor(opts: ProgressRootStateProps);
    props: {
        readonly role: "progressbar";
        readonly value: number | null;
        readonly "aria-valuemin": number;
        readonly "aria-valuemax": number;
        readonly "aria-valuenow": number | undefined;
        readonly "data-value": number | undefined;
        readonly "data-state": "indeterminate" | "loading" | "loaded";
        readonly "data-max": number;
        readonly "data-min": number;
        readonly "data-indeterminate": "" | undefined;
        readonly "data-progress-root": "";
    };
}
export declare function useProgressRootState(props: ProgressRootStateProps): ProgressRootState;
export {};
