import type { ReadableBoxedValues, WritableBoxedValues } from "../../internal/box.svelte.js";
import type { BitsMouseEvent, WithRefProps } from "../../internal/types.js";
type ToggleRootStateProps = WithRefProps<ReadableBoxedValues<{
    disabled: boolean;
}> & WritableBoxedValues<{
    pressed: boolean;
}>>;
declare class ToggleRootState {
    #private;
    readonly opts: ToggleRootStateProps;
    constructor(opts: ToggleRootStateProps);
    onclick(_: BitsMouseEvent): void;
    snippetProps: {
        pressed: boolean;
    };
    props: {
        readonly "data-toggle-root": "";
        readonly id: string;
        readonly "data-disabled": "" | undefined;
        readonly "aria-pressed": "true" | "false";
        readonly "data-state": "off" | "on";
        readonly disabled: true | undefined;
        readonly onclick: (_: BitsMouseEvent) => void;
    };
}
export declare function useToggleRoot(props: ToggleRootStateProps): ToggleRootState;
export declare function getToggleDataState(condition: boolean): "on" | "off";
export {};
