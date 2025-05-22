import type { TextSelectionLayerImplProps } from "./types.js";
import type { ReadableBoxedValues } from "../../../internal/box.svelte.js";
type TextSelectionLayerStateProps = ReadableBoxedValues<Required<Omit<TextSelectionLayerImplProps, "children" | "preventOverflowTextSelection">>>;
export declare class TextSelectionLayerState {
    #private;
    readonly opts: TextSelectionLayerStateProps;
    constructor(opts: TextSelectionLayerStateProps);
}
export declare function useTextSelectionLayer(props: TextSelectionLayerStateProps): TextSelectionLayerState;
export {};
