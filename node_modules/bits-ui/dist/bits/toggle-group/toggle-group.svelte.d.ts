import { type WritableBox } from "svelte-toolbelt";
import type { ReadableBoxedValues, WritableBoxedValues } from "../../internal/box.svelte.js";
import type { Orientation } from "../../shared/index.js";
import { type UseRovingFocusReturn } from "../../internal/use-roving-focus.svelte.js";
import type { BitsKeyboardEvent, BitsMouseEvent, WithRefProps } from "../../internal/types.js";
type ToggleGroupBaseStateProps = WithRefProps<ReadableBoxedValues<{
    disabled: boolean;
    rovingFocus: boolean;
    loop: boolean;
    orientation: Orientation;
}>>;
declare class ToggleGroupBaseState {
    readonly opts: ToggleGroupBaseStateProps;
    rovingFocusGroup: UseRovingFocusReturn;
    constructor(opts: ToggleGroupBaseStateProps);
    props: {
        readonly id: string;
        readonly "data-toggle-group-root": "";
        readonly role: "group";
        readonly "data-orientation": "horizontal" | "vertical";
        readonly "data-disabled": "" | undefined;
    };
}
type ToggleGroupSingleStateProps = ToggleGroupBaseStateProps & WritableBoxedValues<{
    value: string;
}>;
declare class ToggleGroupSingleState extends ToggleGroupBaseState {
    readonly opts: ToggleGroupSingleStateProps;
    isMulti: boolean;
    anyPressed: boolean;
    constructor(opts: ToggleGroupSingleStateProps);
    includesItem(item: string): boolean;
    toggleItem(item: string, id: string): void;
}
type ToggleGroupMultipleStateProps = ToggleGroupBaseStateProps & WritableBoxedValues<{
    value: string[];
}>;
declare class ToggleGroupMultipleState extends ToggleGroupBaseState {
    readonly opts: ToggleGroupMultipleStateProps;
    isMulti: boolean;
    anyPressed: boolean;
    constructor(opts: ToggleGroupMultipleStateProps);
    includesItem(item: string): boolean;
    toggleItem(item: string, id: string): void;
}
type ToggleGroupState = ToggleGroupSingleState | ToggleGroupMultipleState;
type ToggleGroupItemStateProps = WithRefProps<ReadableBoxedValues<{
    value: string;
    disabled: boolean;
}>>;
declare class ToggleGroupItemState {
    #private;
    readonly opts: ToggleGroupItemStateProps;
    readonly root: ToggleGroupState;
    constructor(opts: ToggleGroupItemStateProps, root: ToggleGroupState);
    onclick(_: BitsMouseEvent): void;
    onkeydown(e: BitsKeyboardEvent): void;
    isPressed: boolean;
    snippetProps: {
        pressed: boolean;
    };
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
        readonly disabled: true | undefined;
        readonly "data-toggle-group-item": "";
        readonly onclick: (_: BitsMouseEvent) => void;
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
    };
}
type InitToggleGroupProps = WithRefProps<{
    type: "single" | "multiple";
    value: WritableBox<string> | WritableBox<string[]>;
} & ReadableBoxedValues<{
    disabled: boolean;
    rovingFocus: boolean;
    loop: boolean;
    orientation: Orientation;
}>>;
export declare function useToggleGroupRoot(props: InitToggleGroupProps): ToggleGroupState;
export declare function useToggleGroupItem(props: Omit<ToggleGroupItemStateProps, "rootState">): ToggleGroupItemState;
export {};
