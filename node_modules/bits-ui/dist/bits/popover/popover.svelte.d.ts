import { type ReadableBoxedValues } from "svelte-toolbelt";
import type { WritableBoxedValues } from "../../internal/box.svelte.js";
import type { BitsKeyboardEvent, BitsMouseEvent, BitsPointerEvent, WithRefProps } from "../../internal/types.js";
type PopoverRootStateProps = WritableBoxedValues<{
    open: boolean;
}>;
declare class PopoverRootState {
    readonly opts: PopoverRootStateProps;
    contentNode: HTMLElement | null;
    triggerNode: HTMLElement | null;
    constructor(opts: PopoverRootStateProps);
    toggleOpen(): void;
    handleClose(): void;
}
type PopoverTriggerStateProps = WithRefProps & ReadableBoxedValues<{
    disabled: boolean;
}>;
declare class PopoverTriggerState {
    #private;
    readonly opts: PopoverTriggerStateProps;
    readonly root: PopoverRootState;
    constructor(opts: PopoverTriggerStateProps, root: PopoverRootState);
    onclick(e: BitsMouseEvent): void;
    onkeydown(e: BitsKeyboardEvent): void;
    props: {
        readonly id: string;
        readonly "aria-haspopup": "dialog";
        readonly "aria-expanded": "true" | "false";
        readonly "data-state": "open" | "closed";
        readonly "aria-controls": string | undefined;
        readonly "data-popover-trigger": "";
        readonly disabled: boolean;
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
        readonly onclick: (e: BitsMouseEvent) => void;
    };
}
type PopoverContentStateProps = WithRefProps & ReadableBoxedValues<{
    onInteractOutside: (e: PointerEvent) => void;
    onEscapeKeydown: (e: KeyboardEvent) => void;
    onCloseAutoFocus: (e: Event) => void;
}>;
declare class PopoverContentState {
    readonly opts: PopoverContentStateProps;
    readonly root: PopoverRootState;
    constructor(opts: PopoverContentStateProps, root: PopoverRootState);
    onInteractOutside: (e: PointerEvent) => void;
    onEscapeKeydown: (e: KeyboardEvent) => void;
    onCloseAutoFocus: (e: Event) => void;
    snippetProps: {
        open: boolean;
    };
    props: {
        readonly id: string;
        readonly tabindex: -1;
        readonly "data-state": "open" | "closed";
        readonly "data-popover-content": "";
        readonly style: {
            readonly pointerEvents: "auto";
        };
    };
    popperProps: {
        onInteractOutside: (e: PointerEvent) => void;
        onEscapeKeydown: (e: KeyboardEvent) => void;
        onCloseAutoFocus: (e: Event) => void;
    };
}
type PopoverCloseStateProps = WithRefProps;
declare class PopoverCloseState {
    readonly opts: PopoverCloseStateProps;
    readonly root: PopoverRootState;
    constructor(opts: PopoverCloseStateProps, root: PopoverRootState);
    onclick(_: BitsPointerEvent): void;
    onkeydown(e: BitsKeyboardEvent): void;
    props: {
        readonly id: string;
        readonly onclick: (_: BitsPointerEvent) => void;
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
        readonly type: "button";
        readonly "data-popover-close": "";
    };
}
export declare function usePopoverRoot(props: PopoverRootStateProps): PopoverRootState;
export declare function usePopoverTrigger(props: PopoverTriggerStateProps): PopoverTriggerState;
export declare function usePopoverContent(props: PopoverContentStateProps): PopoverContentState;
export declare function usePopoverClose(props: PopoverCloseStateProps): PopoverCloseState;
export {};
