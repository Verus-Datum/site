import type { ReadableBoxedValues, WritableBoxedValues } from "../../internal/box.svelte.js";
import type { BitsFocusEvent, BitsPointerEvent, WithRefProps } from "../../internal/types.js";
type LinkPreviewRootStateProps = WritableBoxedValues<{
    open: boolean;
}> & ReadableBoxedValues<{
    openDelay: number;
    closeDelay: number;
}>;
declare class LinkPreviewRootState {
    readonly opts: LinkPreviewRootStateProps;
    hasSelection: boolean;
    isPointerDownOnContent: boolean;
    containsSelection: boolean;
    timeout: number | null;
    contentNode: HTMLElement | null;
    contentMounted: boolean;
    triggerNode: HTMLElement | null;
    isOpening: boolean;
    constructor(opts: LinkPreviewRootStateProps);
    clearTimeout(): void;
    handleOpen(): void;
    immediateClose(): void;
    handleClose(): void;
}
type LinkPreviewTriggerStateProps = WithRefProps;
declare class LinkPreviewTriggerState {
    readonly opts: LinkPreviewTriggerStateProps;
    readonly root: LinkPreviewRootState;
    constructor(opts: LinkPreviewTriggerStateProps, root: LinkPreviewRootState);
    onpointerenter(e: BitsPointerEvent): void;
    onpointerleave(e: BitsPointerEvent): void;
    onfocus(e: BitsFocusEvent): void;
    onblur(_: BitsFocusEvent): void;
    props: {
        readonly id: string;
        readonly "aria-haspopup": "dialog";
        readonly "aria-expanded": "true" | "false";
        readonly "data-state": "open" | "closed";
        readonly "aria-controls": string | undefined;
        readonly role: "button";
        readonly "data-link-preview-trigger": "";
        readonly onpointerenter: (e: BitsPointerEvent) => void;
        readonly onfocus: (e: BitsFocusEvent) => void;
        readonly onblur: (_: BitsFocusEvent) => void;
        readonly onpointerleave: (e: BitsPointerEvent) => void;
    };
}
type LinkPreviewContentStateProps = WithRefProps & ReadableBoxedValues<{
    onInteractOutside: (e: PointerEvent) => void;
    onEscapeKeydown: (e: KeyboardEvent) => void;
}>;
declare class LinkPreviewContentState {
    readonly opts: LinkPreviewContentStateProps;
    readonly root: LinkPreviewRootState;
    constructor(opts: LinkPreviewContentStateProps, root: LinkPreviewRootState);
    onpointerdown(e: BitsPointerEvent): void;
    onpointerenter(e: BitsPointerEvent): void;
    onfocusout(e: BitsFocusEvent): void;
    onInteractOutside: (e: PointerEvent) => void;
    onEscapeKeydown: (e: KeyboardEvent) => void;
    onOpenAutoFocus: (e: Event) => void;
    onCloseAutoFocus: (e: Event) => void;
    snippetProps: {
        open: boolean;
    };
    props: {
        readonly id: string;
        readonly tabindex: -1;
        readonly "data-state": "open" | "closed";
        readonly "data-link-preview-content": "";
        readonly onpointerdown: (e: BitsPointerEvent) => void;
        readonly onpointerenter: (e: BitsPointerEvent) => void;
        readonly onfocusout: (e: BitsFocusEvent) => void;
    };
    popperProps: {
        onInteractOutside: (e: PointerEvent) => void;
        onEscapeKeydown: (e: KeyboardEvent) => void;
        onOpenAutoFocus: (e: Event) => void;
        onCloseAutoFocus: (e: Event) => void;
    };
}
export declare function useLinkPreviewRoot(props: LinkPreviewRootStateProps): LinkPreviewRootState;
export declare function useLinkPreviewTrigger(props: LinkPreviewTriggerStateProps): LinkPreviewTriggerState;
export declare function useLinkPreviewContent(props: LinkPreviewContentStateProps): LinkPreviewContentState;
export {};
