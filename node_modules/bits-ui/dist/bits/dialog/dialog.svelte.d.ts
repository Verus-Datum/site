import type { ReadableBoxedValues, WritableBoxedValues } from "../../internal/box.svelte.js";
import type { BitsKeyboardEvent, BitsMouseEvent, WithRefProps } from "../../internal/types.js";
type DialogVariant = "alert-dialog" | "dialog";
type DialogRootStateProps = WritableBoxedValues<{
    open: boolean;
}> & ReadableBoxedValues<{
    variant: DialogVariant;
}>;
declare class DialogRootState {
    readonly opts: DialogRootStateProps;
    triggerNode: HTMLElement | null;
    contentNode: HTMLElement | null;
    descriptionNode: HTMLElement | null;
    contentId: string | undefined;
    titleId: string | undefined;
    triggerId: string | undefined;
    descriptionId: string | undefined;
    cancelNode: HTMLElement | null;
    attrs: {
        readonly content: "data-dialog-content" | "data-alert-dialog-content";
        readonly trigger: "data-dialog-trigger" | "data-alert-dialog-trigger";
        readonly overlay: "data-dialog-overlay" | "data-alert-dialog-overlay";
        readonly title: "data-dialog-title" | "data-alert-dialog-title";
        readonly description: "data-dialog-description" | "data-alert-dialog-description";
        readonly close: "data-dialog-close" | "data-alert-dialog-close";
        readonly cancel: "data-dialog-cancel" | "data-alert-dialog-cancel";
        readonly action: "data-dialog-action" | "data-alert-dialog-action";
    };
    constructor(opts: DialogRootStateProps);
    handleOpen(): void;
    handleClose(): void;
    sharedProps: {
        readonly "data-state": "open" | "closed";
    };
}
type DialogTriggerStateProps = WithRefProps & ReadableBoxedValues<{
    disabled: boolean;
}>;
declare class DialogTriggerState {
    readonly opts: DialogTriggerStateProps;
    readonly root: DialogRootState;
    constructor(opts: DialogTriggerStateProps, root: DialogRootState);
    onclick(e: BitsMouseEvent): void;
    onkeydown(e: BitsKeyboardEvent): void;
    props: {
        readonly "data-state": "open" | "closed";
        readonly id: string;
        readonly "aria-haspopup": "dialog";
        readonly "aria-expanded": "true" | "false";
        readonly "aria-controls": string | undefined;
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
        readonly onclick: (e: BitsMouseEvent) => void;
        readonly disabled: true | undefined;
    };
}
type DialogCloseStateProps = WithRefProps & ReadableBoxedValues<{
    variant: "action" | "cancel" | "close";
    disabled: boolean;
}>;
declare class DialogCloseState {
    #private;
    readonly opts: DialogCloseStateProps;
    readonly root: DialogRootState;
    constructor(opts: DialogCloseStateProps, root: DialogRootState);
    onclick(e: BitsMouseEvent): void;
    onkeydown(e: BitsKeyboardEvent): void;
    props: {
        readonly "data-state": "open" | "closed";
        readonly id: string;
        readonly onclick: (e: BitsMouseEvent) => void;
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
        readonly disabled: true | undefined;
        readonly tabindex: 0;
    };
}
type DialogActionStateProps = WithRefProps;
declare class DialogActionState {
    #private;
    readonly opts: DialogActionStateProps;
    readonly root: DialogRootState;
    constructor(opts: DialogActionStateProps, root: DialogRootState);
    props: {
        readonly "data-state": "open" | "closed";
        readonly id: string;
    };
}
type DialogTitleStateProps = WithRefProps<ReadableBoxedValues<{
    level: 1 | 2 | 3 | 4 | 5 | 6;
}>>;
declare class DialogTitleState {
    readonly opts: DialogTitleStateProps;
    readonly root: DialogRootState;
    constructor(opts: DialogTitleStateProps, root: DialogRootState);
    props: {
        readonly "data-state": "open" | "closed";
        readonly id: string;
        readonly role: "heading";
        readonly "aria-level": 1 | 2 | 3 | 4 | 5 | 6;
    };
}
type DialogDescriptionStateProps = WithRefProps;
declare class DialogDescriptionState {
    readonly opts: DialogDescriptionStateProps;
    readonly root: DialogRootState;
    constructor(opts: DialogDescriptionStateProps, root: DialogRootState);
    props: {
        readonly "data-state": "open" | "closed";
        readonly id: string;
    };
}
type DialogContentStateProps = WithRefProps;
declare class DialogContentState {
    readonly opts: DialogContentStateProps;
    readonly root: DialogRootState;
    constructor(opts: DialogContentStateProps, root: DialogRootState);
    snippetProps: {
        open: boolean;
    };
    props: {
        readonly "data-state": "open" | "closed";
        readonly id: string;
        readonly role: "dialog" | "alertdialog";
        readonly "aria-modal": "true";
        readonly "aria-describedby": string | undefined;
        readonly "aria-labelledby": string | undefined;
        readonly style: {
            readonly pointerEvents: "auto";
            readonly outline: "none" | undefined;
        };
        readonly tabindex: -1 | undefined;
    };
}
type DialogOverlayStateProps = WithRefProps;
declare class DialogOverlayState {
    readonly opts: DialogOverlayStateProps;
    readonly root: DialogRootState;
    constructor(opts: DialogOverlayStateProps, root: DialogRootState);
    snippetProps: {
        open: boolean;
    };
    props: {
        readonly "data-state": "open" | "closed";
        readonly id: string;
        readonly style: {
            readonly pointerEvents: "auto";
        };
    };
}
type AlertDialogCancelStateProps = WithRefProps & ReadableBoxedValues<{
    disabled: boolean;
}>;
declare class AlertDialogCancelState {
    readonly opts: AlertDialogCancelStateProps;
    readonly root: DialogRootState;
    constructor(opts: AlertDialogCancelStateProps, root: DialogRootState);
    onclick(e: BitsMouseEvent): void;
    onkeydown(e: BitsKeyboardEvent): void;
    props: {
        readonly "data-state": "open" | "closed";
        readonly id: string;
        readonly onclick: (e: BitsMouseEvent) => void;
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
        readonly tabindex: 0;
    };
}
export declare function useDialogRoot(props: DialogRootStateProps): DialogRootState;
export declare function useDialogTrigger(props: DialogTriggerStateProps): DialogTriggerState;
export declare function useDialogTitle(props: DialogTitleStateProps): DialogTitleState;
export declare function useDialogContent(props: DialogContentStateProps): DialogContentState;
export declare function useDialogOverlay(props: DialogOverlayStateProps): DialogOverlayState;
export declare function useDialogDescription(props: DialogDescriptionStateProps): DialogDescriptionState;
export declare function useDialogClose(props: DialogCloseStateProps): DialogCloseState;
export declare function useAlertDialogCancel(props: AlertDialogCancelStateProps): AlertDialogCancelState;
export declare function useAlertDialogAction(props: DialogActionStateProps): DialogActionState;
export {};
