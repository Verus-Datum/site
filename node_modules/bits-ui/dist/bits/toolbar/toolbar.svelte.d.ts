import { type WritableBox } from "svelte-toolbelt";
import type { ReadableBoxedValues, WritableBoxedValues } from "../../internal/box.svelte.js";
import { type UseRovingFocusReturn } from "../../internal/use-roving-focus.svelte.js";
import type { Orientation } from "../../shared/index.js";
import type { BitsKeyboardEvent, BitsMouseEvent, WithRefProps } from "../../internal/types.js";
type ToolbarRootStateProps = WithRefProps<ReadableBoxedValues<{
    orientation: Orientation;
    loop: boolean;
}>>;
declare class ToolbarRootState {
    readonly opts: ToolbarRootStateProps;
    rovingFocusGroup: UseRovingFocusReturn;
    constructor(opts: ToolbarRootStateProps);
    props: {
        readonly id: string;
        readonly role: "toolbar";
        readonly "data-orientation": Orientation;
        readonly "data-toolbar-root": "";
    };
}
type ToolbarGroupBaseStateProps = WithRefProps<ReadableBoxedValues<{
    disabled: boolean;
}>>;
declare class ToolbarGroupBaseState {
    readonly opts: ToolbarGroupBaseStateProps;
    readonly root: ToolbarRootState;
    constructor(opts: ToolbarGroupBaseStateProps, root: ToolbarRootState);
    props: {
        readonly id: string;
        readonly "data-toolbar-group": "";
        readonly role: "group";
        readonly "data-orientation": "horizontal" | "vertical";
        readonly "data-disabled": "" | undefined;
    };
}
type ToolbarGroupSingleStateProps = ToolbarGroupBaseStateProps & WritableBoxedValues<{
    value: string;
}>;
declare class ToolbarGroupSingleState extends ToolbarGroupBaseState {
    readonly opts: ToolbarGroupSingleStateProps;
    readonly root: ToolbarRootState;
    isMulti: boolean;
    anyPressed: boolean;
    constructor(opts: ToolbarGroupSingleStateProps, root: ToolbarRootState);
    includesItem(item: string): boolean;
    toggleItem(item: string): void;
}
type ToolbarGroupMultipleStateProps = ToolbarGroupBaseStateProps & WritableBoxedValues<{
    value: string[];
}>;
declare class ToolbarGroupMultipleState extends ToolbarGroupBaseState {
    readonly opts: ToolbarGroupMultipleStateProps;
    readonly root: ToolbarRootState;
    isMulti: boolean;
    anyPressed: boolean;
    constructor(opts: ToolbarGroupMultipleStateProps, root: ToolbarRootState);
    includesItem(item: string): boolean;
    toggleItem(item: string): void;
}
type ToolbarGroupState = ToolbarGroupSingleState | ToolbarGroupMultipleState;
type ToolbarGroupItemStateProps = WithRefProps<ReadableBoxedValues<{
    value: string;
    disabled: boolean;
}>>;
declare class ToolbarGroupItemState {
    #private;
    readonly opts: ToolbarGroupItemStateProps;
    readonly group: ToolbarGroupState;
    readonly root: ToolbarRootState;
    constructor(opts: ToolbarGroupItemStateProps, group: ToolbarGroupState, root: ToolbarRootState);
    onclick(_: BitsMouseEvent): void;
    onkeydown(e: BitsKeyboardEvent): void;
    isPressed: boolean;
    props: {
        readonly id: string;
        readonly role: "radio" | undefined;
        readonly tabindex: number;
        readonly "data-orientation": "horizontal" | "vertical";
        readonly "data-disabled": "" | undefined;
        readonly "data-state": "off" | "on";
        readonly "data-value": string;
        readonly "aria-pressed": "true" | "false" | undefined;
        readonly "aria-checked": "true" | "false" | "mixed" | undefined;
        readonly "data-toolbar-item": "";
        readonly "data-toolbar-group-item": "";
        readonly disabled: true | undefined;
        readonly onclick: (_: BitsMouseEvent) => void;
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
    };
}
type ToolbarLinkStateProps = WithRefProps;
declare class ToolbarLinkState {
    #private;
    readonly opts: ToolbarLinkStateProps;
    readonly root: ToolbarRootState;
    constructor(opts: ToolbarLinkStateProps, root: ToolbarRootState);
    onkeydown(e: BitsKeyboardEvent): void;
    props: {
        readonly id: string;
        readonly "data-toolbar-link": "";
        readonly "data-toolbar-item": "";
        readonly role: "link" | undefined;
        readonly tabindex: number;
        readonly "data-orientation": "horizontal" | "vertical";
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
    };
}
type ToolbarButtonStateProps = WithRefProps<ReadableBoxedValues<{
    disabled: boolean;
}>>;
declare class ToolbarButtonState {
    #private;
    readonly opts: ToolbarButtonStateProps;
    readonly root: ToolbarRootState;
    constructor(opts: ToolbarButtonStateProps, root: ToolbarRootState);
    onkeydown(e: BitsKeyboardEvent): void;
    props: {
        readonly id: string;
        readonly "data-toolbar-item": "";
        readonly "data-toolbar-button": "";
        readonly role: "button" | undefined;
        readonly tabindex: number;
        readonly "data-disabled": "" | undefined;
        readonly "data-orientation": "horizontal" | "vertical";
        readonly disabled: true | undefined;
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
    };
}
export declare function useToolbarRoot(props: ToolbarRootStateProps): ToolbarRootState;
type InitToolbarGroupProps = WithRefProps<{
    type: "single" | "multiple";
    value: WritableBox<string> | WritableBox<string[]>;
} & ReadableBoxedValues<{
    disabled: boolean;
}>>;
export declare function useToolbarGroup(props: InitToolbarGroupProps): ToolbarGroupState;
export declare function useToolbarGroupItem(props: ToolbarGroupItemStateProps): ToolbarGroupItemState;
export declare function useToolbarButton(props: ToolbarButtonStateProps): ToolbarButtonState;
export declare function useToolbarLink(props: ToolbarLinkStateProps): ToolbarLinkState;
export {};
