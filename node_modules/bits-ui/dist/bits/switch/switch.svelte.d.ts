import type { ReadableBoxedValues, WritableBoxedValues } from "../../internal/box.svelte.js";
import type { BitsKeyboardEvent, BitsPointerEvent, WithRefProps } from "../../internal/types.js";
type SwitchRootStateProps = WithRefProps<ReadableBoxedValues<{
    disabled: boolean;
    required: boolean;
    name: string | undefined;
    value: string;
}> & WritableBoxedValues<{
    checked: boolean;
}>>;
declare class SwitchRootState {
    #private;
    readonly opts: SwitchRootStateProps;
    constructor(opts: SwitchRootStateProps);
    onkeydown(e: BitsKeyboardEvent): void;
    onclick(_: BitsPointerEvent): void;
    sharedProps: {
        "data-disabled": "" | undefined;
        "data-state": "checked" | "unchecked";
        "data-required": "" | undefined;
    };
    snippetProps: {
        checked: boolean;
    };
    props: {
        readonly id: string;
        readonly role: "switch";
        readonly disabled: true | undefined;
        readonly "aria-checked": "true" | "false" | "mixed";
        readonly "aria-required": "true" | "false";
        readonly "data-switch-root": "";
        readonly onclick: (_: BitsPointerEvent) => void;
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
        readonly "data-disabled": "" | undefined;
        readonly "data-state": "checked" | "unchecked";
        readonly "data-required": "" | undefined;
    };
}
declare class SwitchInputState {
    readonly root: SwitchRootState;
    shouldRender: boolean;
    constructor(root: SwitchRootState);
    props: {
        readonly type: "checkbox";
        readonly name: string | undefined;
        readonly value: string;
        readonly checked: boolean;
        readonly disabled: boolean;
        readonly required: boolean;
    };
}
type SwitchThumbStateProps = WithRefProps;
declare class SwitchThumbState {
    readonly opts: SwitchThumbStateProps;
    readonly root: SwitchRootState;
    constructor(opts: SwitchThumbStateProps, root: SwitchRootState);
    snippetProps: {
        checked: boolean;
    };
    props: {
        readonly id: string;
        readonly "data-switch-thumb": "";
        readonly "data-disabled": "" | undefined;
        readonly "data-state": "checked" | "unchecked";
        readonly "data-required": "" | undefined;
    };
}
export declare function useSwitchRoot(props: SwitchRootStateProps): SwitchRootState;
export declare function useSwitchInput(): SwitchInputState;
export declare function useSwitchThumb(props: SwitchThumbStateProps): SwitchThumbState;
export {};
