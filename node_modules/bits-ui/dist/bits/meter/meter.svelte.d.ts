import type { ReadableBoxedValues } from "../../internal/box.svelte.js";
import type { WithRefProps } from "../../internal/types.js";
type MeterRootStateProps = WithRefProps<ReadableBoxedValues<{
    value: number;
    max: number;
    min: number;
}>>;
declare class MeterRootState {
    readonly opts: MeterRootStateProps;
    constructor(opts: MeterRootStateProps);
    props: {
        readonly role: "meter";
        readonly value: number;
        readonly "aria-valuemin": number;
        readonly "aria-valuemax": number;
        readonly "aria-valuenow": number;
        readonly "data-value": number;
        readonly "data-max": number;
        readonly "data-min": number;
        readonly "data-meter-root": "";
    };
}
export declare function useMeterRootState(props: MeterRootStateProps): MeterRootState;
export {};
