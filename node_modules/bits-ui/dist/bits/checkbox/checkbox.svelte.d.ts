import type { HTMLButtonAttributes } from "svelte/elements";
import { Context } from "runed";
import type { ReadableBoxedValues, WritableBoxedValues } from "../../internal/box.svelte.js";
import type { BitsKeyboardEvent, BitsMouseEvent, OnChangeFn, WithRefProps } from "../../internal/types.js";
type CheckboxGroupStateProps = WithRefProps<ReadableBoxedValues<{
    name: string | undefined;
    disabled: boolean;
    required: boolean;
    onValueChange: OnChangeFn<string[]>;
}> & WritableBoxedValues<{
    value: string[];
}>>;
declare class CheckboxGroupState {
    readonly opts: CheckboxGroupStateProps;
    labelId: string | undefined;
    constructor(opts: CheckboxGroupStateProps);
    addValue(checkboxValue: string | undefined): void;
    removeValue(checkboxValue: string | undefined): void;
    props: {
        readonly id: string;
        readonly role: "group";
        readonly "aria-labelledby": string | undefined;
        readonly "data-disabled": "" | undefined;
        readonly "data-checkbox-group": "";
    };
}
type CheckboxGroupLabelStateProps = WithRefProps;
declare class CheckboxGroupLabelState {
    readonly opts: CheckboxGroupLabelStateProps;
    readonly group: CheckboxGroupState;
    constructor(opts: CheckboxGroupLabelStateProps, group: CheckboxGroupState);
    props: {
        readonly id: string;
        readonly "data-disabled": "" | undefined;
        readonly "data-checkbox-group-label": "";
    };
}
type CheckboxRootStateProps = WithRefProps<ReadableBoxedValues<{
    disabled: boolean;
    required: boolean;
    name: string | undefined;
    value: string | undefined;
    type: HTMLButtonAttributes["type"];
}> & WritableBoxedValues<{
    checked: boolean;
    indeterminate: boolean;
}>>;
declare class CheckboxRootState {
    #private;
    readonly opts: CheckboxRootStateProps;
    readonly group: CheckboxGroupState | null;
    trueName: string | undefined;
    trueRequired: boolean;
    trueDisabled: boolean;
    constructor(opts: CheckboxRootStateProps, group?: CheckboxGroupState | null);
    onkeydown(e: BitsKeyboardEvent): void;
    onclick(_: BitsMouseEvent): void;
    snippetProps: {
        checked: boolean;
        indeterminate: boolean;
    };
    props: {
        readonly id: string;
        readonly role: "checkbox";
        readonly type: "button" | "reset" | "submit" | null | undefined;
        readonly disabled: boolean;
        readonly "aria-checked": "true" | "false" | "mixed";
        readonly "aria-required": "true" | "false";
        readonly "data-disabled": "" | undefined;
        readonly "data-state": "checked" | "indeterminate" | "unchecked";
        readonly "data-checkbox-root": "";
        readonly onclick: (_: BitsMouseEvent) => void;
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
    };
}
declare class CheckboxInputState {
    readonly root: CheckboxRootState;
    trueChecked: boolean;
    shouldRender: boolean;
    constructor(root: CheckboxRootState);
    props: {
        readonly type: "checkbox";
        readonly checked: boolean;
        readonly disabled: boolean;
        readonly required: boolean;
        readonly name: string | undefined;
        readonly value: string | undefined;
    };
}
export declare const CheckboxGroupContext: Context<CheckboxGroupState>;
export declare function useCheckboxGroup(props: CheckboxGroupStateProps): CheckboxGroupState;
export declare function useCheckboxRoot(props: CheckboxRootStateProps, group: CheckboxGroupState | null): CheckboxRootState;
export declare function useCheckboxGroupLabel(props: CheckboxGroupLabelStateProps): CheckboxGroupLabelState;
export declare function useCheckboxInput(): CheckboxInputState;
export {};
