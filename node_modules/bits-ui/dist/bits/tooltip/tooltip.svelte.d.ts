import type { ReadableBoxedValues, WritableBoxedValues } from "../../internal/box.svelte.js";
import type { WithRefProps } from "../../internal/types.js";
import { CustomEventDispatcher } from "../../internal/events.js";
export declare const TooltipOpenEvent: CustomEventDispatcher<unknown>;
type TooltipProviderStateProps = ReadableBoxedValues<{
    delayDuration: number;
    disableHoverableContent: boolean;
    disableCloseOnTriggerClick: boolean;
    disabled: boolean;
    ignoreNonKeyboardFocus: boolean;
    skipDelayDuration: number;
}>;
declare class TooltipProviderState {
    #private;
    readonly opts: TooltipProviderStateProps;
    isOpenDelayed: boolean;
    isPointerInTransit: import("svelte-toolbelt").WritableBox<boolean>;
    constructor(opts: TooltipProviderStateProps);
    onOpen: () => void;
    onClose: () => void;
}
type TooltipRootStateProps = ReadableBoxedValues<{
    delayDuration: number | undefined;
    disableHoverableContent: boolean | undefined;
    disableCloseOnTriggerClick: boolean | undefined;
    disabled: boolean | undefined;
    ignoreNonKeyboardFocus: boolean | undefined;
}> & WritableBoxedValues<{
    open: boolean;
}>;
declare class TooltipRootState {
    #private;
    readonly opts: TooltipRootStateProps;
    readonly provider: TooltipProviderState;
    delayDuration: number;
    disableHoverableContent: boolean;
    disableCloseOnTriggerClick: boolean;
    disabled: boolean;
    ignoreNonKeyboardFocus: boolean;
    contentNode: HTMLElement | null;
    triggerNode: HTMLElement | null;
    stateAttr: string;
    constructor(opts: TooltipRootStateProps, provider: TooltipProviderState);
    handleOpen: () => void;
    handleClose: () => void;
    onTriggerEnter: () => void;
    onTriggerLeave: () => void;
}
type TooltipTriggerStateProps = WithRefProps<ReadableBoxedValues<{
    disabled: boolean;
}>>;
declare class TooltipTriggerState {
    #private;
    readonly opts: TooltipTriggerStateProps;
    readonly root: TooltipRootState;
    constructor(opts: TooltipTriggerStateProps, root: TooltipRootState);
    handlePointerUp: () => void;
    props: {
        id: string;
        "aria-describedby": string | undefined;
        "data-state": string;
        "data-disabled": "" | undefined;
        "data-delay-duration": string;
        "data-tooltip-trigger": string;
        tabindex: number | undefined;
        disabled: boolean;
        onpointerup: () => void;
        onpointerdown: () => void;
        onpointermove: (e: PointerEvent) => void;
        onpointerleave: () => void;
        onfocus: (e: FocusEvent & {
            currentTarget: HTMLElement;
        }) => void;
        onblur: () => void;
        onclick: () => void;
    };
}
type TooltipContentStateProps = WithRefProps & ReadableBoxedValues<{
    onInteractOutside: (e: PointerEvent) => void;
    onEscapeKeydown: (e: KeyboardEvent) => void;
}>;
declare class TooltipContentState {
    readonly opts: TooltipContentStateProps;
    readonly root: TooltipRootState;
    constructor(opts: TooltipContentStateProps, root: TooltipRootState);
    onInteractOutside: (e: PointerEvent) => void;
    onEscapeKeydown: (e: KeyboardEvent) => void;
    onOpenAutoFocus: (e: Event) => void;
    onCloseAutoFocus: (e: Event) => void;
    snippetProps: {
        open: boolean;
    };
    props: {
        readonly id: string;
        readonly "data-state": string;
        readonly "data-disabled": "" | undefined;
        readonly style: {
            readonly pointerEvents: "auto";
            readonly outline: "none";
        };
        readonly "data-tooltip-content": "";
    };
    popperProps: {
        onInteractOutside: (e: PointerEvent) => void;
        onEscapeKeydown: (e: KeyboardEvent) => void;
        onOpenAutoFocus: (e: Event) => void;
        onCloseAutoFocus: (e: Event) => void;
    };
}
export declare function useTooltipProvider(props: TooltipProviderStateProps): TooltipProviderState;
export declare function useTooltipRoot(props: TooltipRootStateProps): TooltipRootState;
export declare function useTooltipTrigger(props: TooltipTriggerStateProps): TooltipTriggerState;
export declare function useTooltipContent(props: TooltipContentStateProps): TooltipContentState;
export {};
