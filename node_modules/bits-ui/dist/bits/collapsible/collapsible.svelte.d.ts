import { type WithRefProps } from "svelte-toolbelt";
import type { ReadableBoxedValues, WritableBoxedValues } from "../../internal/box.svelte.js";
import type { BitsKeyboardEvent, BitsMouseEvent } from "../../internal/types.js";
type CollapsibleRootStateProps = WithRefProps & WritableBoxedValues<{
    open: boolean;
}> & ReadableBoxedValues<{
    disabled: boolean;
}>;
declare class CollapsibleRootState {
    readonly opts: CollapsibleRootStateProps;
    contentNode: HTMLElement | null;
    constructor(opts: CollapsibleRootStateProps);
    toggleOpen(): void;
    props: {
        readonly id: string;
        readonly "data-state": "open" | "closed";
        readonly "data-disabled": "" | undefined;
        readonly "data-collapsible-root": "";
    };
}
type CollapsibleContentStateProps = WithRefProps & ReadableBoxedValues<{
    forceMount: boolean;
}>;
declare class CollapsibleContentState {
    #private;
    readonly opts: CollapsibleContentStateProps;
    readonly root: CollapsibleRootState;
    present: boolean;
    constructor(opts: CollapsibleContentStateProps, root: CollapsibleRootState);
    snippetProps: {
        open: boolean;
    };
    props: {
        readonly id: string;
        readonly style: {
            readonly "--bits-collapsible-content-height": string | undefined;
            readonly "--bits-collapsible-content-width": string | undefined;
        };
        readonly "data-state": "open" | "closed";
        readonly "data-disabled": "" | undefined;
        readonly "data-collapsible-content": "";
    };
}
type CollapsibleTriggerStateProps = WithRefProps & ReadableBoxedValues<{
    disabled: boolean | null | undefined;
}>;
declare class CollapsibleTriggerState {
    #private;
    readonly opts: CollapsibleTriggerStateProps;
    readonly root: CollapsibleRootState;
    constructor(opts: CollapsibleTriggerStateProps, root: CollapsibleRootState);
    onclick(e: BitsMouseEvent): void;
    onkeydown(e: BitsKeyboardEvent): void;
    props: {
        readonly id: string;
        readonly type: "button";
        readonly disabled: boolean;
        readonly "aria-controls": string | undefined;
        readonly "aria-expanded": "true" | "false";
        readonly "data-state": "open" | "closed";
        readonly "data-disabled": "" | undefined;
        readonly "data-collapsible-trigger": "";
        readonly onclick: (e: BitsMouseEvent) => void;
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
    };
}
export declare function useCollapsibleRoot(props: CollapsibleRootStateProps): CollapsibleRootState;
export declare function useCollapsibleTrigger(props: CollapsibleTriggerStateProps): CollapsibleTriggerState;
export declare function useCollapsibleContent(props: CollapsibleContentStateProps): CollapsibleContentState;
export {};
