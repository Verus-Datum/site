import type { ReadableBoxedValues, WritableBoxedValues } from "../../internal/box.svelte.js";
import type { BitsFocusEvent, BitsKeyboardEvent, BitsMouseEvent, WithRefProps } from "../../internal/types.js";
import type { Orientation } from "../../shared/index.js";
import { type UseRovingFocusReturn } from "../../internal/use-roving-focus.svelte.js";
type RadioGroupRootStateProps = WithRefProps<ReadableBoxedValues<{
    disabled: boolean;
    required: boolean;
    loop: boolean;
    orientation: Orientation;
    name: string | undefined;
}> & WritableBoxedValues<{
    value: string;
}>>;
declare class RadioGroupRootState {
    readonly opts: RadioGroupRootStateProps;
    rovingFocusGroup: UseRovingFocusReturn;
    hasValue: boolean;
    constructor(opts: RadioGroupRootStateProps);
    isChecked(value: string): boolean;
    setValue(value: string): void;
    props: {
        readonly id: string;
        readonly role: "radiogroup";
        readonly "aria-required": "true" | "false";
        readonly "data-disabled": "" | undefined;
        readonly "data-orientation": Orientation;
        readonly "data-radio-group-root": "";
    };
}
type RadioGroupItemStateProps = WithRefProps<ReadableBoxedValues<{
    disabled: boolean;
    value: string;
}>>;
declare class RadioGroupItemState {
    #private;
    readonly opts: RadioGroupItemStateProps;
    readonly root: RadioGroupRootState;
    checked: boolean;
    constructor(opts: RadioGroupItemStateProps, root: RadioGroupRootState);
    onclick(_: BitsMouseEvent): void;
    onfocus(_: BitsFocusEvent): void;
    onkeydown(e: BitsKeyboardEvent): void;
    snippetProps: {
        checked: boolean;
    };
    props: {
        readonly id: string;
        readonly disabled: true | undefined;
        readonly "data-value": string;
        readonly "data-orientation": Orientation;
        readonly "data-disabled": "" | undefined;
        readonly "data-state": "checked" | "unchecked";
        readonly "aria-checked": "true" | "false" | "mixed";
        readonly "data-radio-group-item": "";
        readonly type: "button";
        readonly role: "radio";
        readonly tabindex: number;
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
        readonly onfocus: (_: BitsFocusEvent) => void;
        readonly onclick: (_: BitsMouseEvent) => void;
    };
}
declare class RadioGroupInputState {
    readonly root: RadioGroupRootState;
    shouldRender: boolean;
    props: {
        readonly name: string | undefined;
        readonly value: string;
        readonly required: boolean;
        readonly disabled: boolean;
    };
    constructor(root: RadioGroupRootState);
}
export declare function useRadioGroupRoot(props: RadioGroupRootStateProps): RadioGroupRootState;
export declare function useRadioGroupItem(props: RadioGroupItemStateProps): RadioGroupItemState;
export declare function useRadioGroupInput(): RadioGroupInputState;
export {};
