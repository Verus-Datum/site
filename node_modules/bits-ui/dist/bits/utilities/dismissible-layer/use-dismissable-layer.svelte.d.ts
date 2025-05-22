import { type WritableBox } from "svelte-toolbelt";
import type { DismissibleLayerImplProps } from "./types.js";
import type { ReadableBoxedValues } from "../../../internal/box.svelte.js";
type DismissibleLayerStateProps = ReadableBoxedValues<Required<Omit<DismissibleLayerImplProps, "children">>>;
export declare class DismissibleLayerState {
    #private;
    readonly opts: DismissibleLayerStateProps;
    node: WritableBox<HTMLElement | null>;
    currNode: HTMLElement | null;
    constructor(opts: DismissibleLayerStateProps);
    props: {
        onfocuscapture: () => void;
        onblurcapture: () => void;
    };
}
export declare function useDismissibleLayer(props: DismissibleLayerStateProps): DismissibleLayerState;
export type FocusOutsideEvent = CustomEvent<{
    originalEvent: FocusEvent;
}>;
export {};
