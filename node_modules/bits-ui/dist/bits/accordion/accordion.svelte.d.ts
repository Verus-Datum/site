import type { Box, ReadableBoxedValues, WritableBoxedValues } from "../../internal/box.svelte.js";
import type { BitsKeyboardEvent, BitsMouseEvent, WithRefProps } from "../../internal/types.js";
import { type UseRovingFocusReturn } from "../../internal/use-roving-focus.svelte.js";
import type { Orientation } from "../../shared/index.js";
type AccordionBaseStateProps = WithRefProps<ReadableBoxedValues<{
    disabled: boolean;
    orientation: Orientation;
    loop: boolean;
}>>;
declare class AccordionBaseState {
    readonly opts: AccordionBaseStateProps;
    rovingFocusGroup: UseRovingFocusReturn;
    constructor(opts: AccordionBaseStateProps);
    props: {
        readonly id: string;
        readonly "data-orientation": "horizontal" | "vertical";
        readonly "data-disabled": "" | undefined;
        readonly "data-accordion-root": "";
    };
}
type AccordionSingleStateProps = AccordionBaseStateProps & WritableBoxedValues<{
    value: string;
}>;
export declare class AccordionSingleState extends AccordionBaseState {
    readonly opts: AccordionSingleStateProps;
    isMulti: false;
    constructor(opts: AccordionSingleStateProps);
    includesItem(item: string): boolean;
    toggleItem(item: string): void;
}
type AccordionMultiStateProps = AccordionBaseStateProps & WritableBoxedValues<{
    value: string[];
}>;
export declare class AccordionMultiState extends AccordionBaseState {
    #private;
    isMulti: true;
    constructor(props: AccordionMultiStateProps);
    includesItem(item: string): boolean;
    toggleItem(item: string): void;
}
type AccordionItemStateProps = WithRefProps<ReadableBoxedValues<{
    value: string;
    disabled: boolean;
}> & {
    rootState: AccordionState;
}>;
export declare class AccordionItemState {
    readonly opts: AccordionItemStateProps;
    root: AccordionState;
    isActive: boolean;
    isDisabled: boolean;
    constructor(opts: AccordionItemStateProps);
    updateValue(): void;
    props: {
        readonly id: string;
        readonly "data-state": "open" | "closed";
        readonly "data-disabled": "" | undefined;
        readonly "data-orientation": "horizontal" | "vertical";
        readonly "data-accordion-item": "";
    };
}
type AccordionTriggerStateProps = WithRefProps<ReadableBoxedValues<{
    disabled: boolean | null | undefined;
}>>;
declare class AccordionTriggerState {
    #private;
    readonly opts: AccordionTriggerStateProps;
    readonly itemState: AccordionItemState;
    constructor(opts: AccordionTriggerStateProps, itemState: AccordionItemState);
    onclick(e: BitsMouseEvent): void;
    onkeydown(e: BitsKeyboardEvent): void;
    props: {
        readonly id: string;
        readonly disabled: boolean;
        readonly "aria-expanded": "true" | "false";
        readonly "aria-disabled": "true" | "false";
        readonly "data-disabled": "" | undefined;
        readonly "data-state": "open" | "closed";
        readonly "data-orientation": "horizontal" | "vertical";
        readonly "data-accordion-trigger": "";
        readonly tabindex: 0;
        readonly onclick: (e: BitsMouseEvent) => void;
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
    };
}
type AccordionContentStateProps = WithRefProps<ReadableBoxedValues<{
    forceMount: boolean;
}>>;
declare class AccordionContentState {
    #private;
    readonly opts: AccordionContentStateProps;
    readonly item: AccordionItemState;
    present: boolean;
    constructor(opts: AccordionContentStateProps, item: AccordionItemState);
    snippetProps: {
        open: boolean;
    };
    props: {
        readonly id: string;
        readonly "data-state": "open" | "closed";
        readonly "data-disabled": "" | undefined;
        readonly "data-orientation": "horizontal" | "vertical";
        readonly "data-accordion-content": "";
        readonly style: {
            readonly "--bits-accordion-content-height": `${number}px`;
            readonly "--bits-accordion-content-width": `${number}px`;
        };
    };
}
type AccordionHeaderStateProps = WithRefProps<ReadableBoxedValues<{
    level: 1 | 2 | 3 | 4 | 5 | 6;
}>>;
declare class AccordionHeaderState {
    readonly opts: AccordionHeaderStateProps;
    readonly item: AccordionItemState;
    constructor(opts: AccordionHeaderStateProps, item: AccordionItemState);
    props: {
        readonly id: string;
        readonly role: "heading";
        readonly "aria-level": 1 | 2 | 3 | 4 | 5 | 6;
        readonly "data-heading-level": 1 | 2 | 3 | 4 | 5 | 6;
        readonly "data-state": "open" | "closed";
        readonly "data-orientation": "horizontal" | "vertical";
        readonly "data-accordion-header": "";
    };
}
type AccordionState = AccordionSingleState | AccordionMultiState;
type InitAccordionProps = WithRefProps<{
    type: "single" | "multiple";
    value: Box<string> | Box<string[]>;
} & ReadableBoxedValues<{
    disabled: boolean;
    orientation: Orientation;
    loop: boolean;
}>>;
export declare function useAccordionRoot(props: InitAccordionProps): AccordionState;
export declare function useAccordionItem(props: Omit<AccordionItemStateProps, "rootState">): AccordionItemState;
export declare function useAccordionTrigger(props: AccordionTriggerStateProps): AccordionTriggerState;
export declare function useAccordionContent(props: AccordionContentStateProps): AccordionContentState;
export declare function useAccordionHeader(props: AccordionHeaderStateProps): AccordionHeaderState;
export {};
