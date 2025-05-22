import { SvelteMap } from "svelte/reactivity";
import type { TabsActivationMode } from "./types.js";
import type { ReadableBoxedValues, WritableBoxedValues } from "../../internal/box.svelte.js";
import type { BitsFocusEvent, BitsKeyboardEvent, BitsMouseEvent, WithRefProps } from "../../internal/types.js";
import type { Orientation } from "../../shared/index.js";
import { type UseRovingFocusReturn } from "../../internal/use-roving-focus.svelte.js";
type TabsRootStateProps = WithRefProps<ReadableBoxedValues<{
    orientation: Orientation;
    loop: boolean;
    activationMode: TabsActivationMode;
    disabled: boolean;
}> & WritableBoxedValues<{
    value: string;
}>>;
declare class TabsRootState {
    readonly opts: TabsRootStateProps;
    rovingFocusGroup: UseRovingFocusReturn;
    triggerIds: string[];
    valueToTriggerId: SvelteMap<string, string>;
    valueToContentId: SvelteMap<string, string>;
    constructor(opts: TabsRootStateProps);
    registerTrigger(id: string, value: string): () => void;
    registerContent(id: string, value: string): () => void;
    setValue(v: string): void;
    props: {
        readonly id: string;
        readonly "data-orientation": "horizontal" | "vertical";
        readonly "data-tabs-root": "";
    };
}
type TabsListStateProps = WithRefProps;
declare class TabsListState {
    #private;
    readonly opts: TabsListStateProps;
    readonly root: TabsRootState;
    constructor(opts: TabsListStateProps, root: TabsRootState);
    props: {
        readonly id: string;
        readonly role: "tablist";
        readonly "aria-orientation": "horizontal" | "vertical";
        readonly "data-orientation": "horizontal" | "vertical";
        readonly "data-tabs-list": "";
        readonly "data-disabled": "" | undefined;
    };
}
type TabsTriggerStateProps = WithRefProps<ReadableBoxedValues<{
    value: string;
    disabled: boolean;
}>>;
declare class TabsTriggerState {
    #private;
    readonly opts: TabsTriggerStateProps;
    readonly root: TabsRootState;
    constructor(opts: TabsTriggerStateProps, root: TabsRootState);
    onfocus(_: BitsFocusEvent): void;
    onclick(_: BitsMouseEvent): void;
    onkeydown(e: BitsKeyboardEvent): void;
    props: {
        readonly id: string;
        readonly role: "tab";
        readonly "data-state": "active" | "inactive";
        readonly "data-value": string;
        readonly "data-orientation": "horizontal" | "vertical";
        readonly "data-disabled": "" | undefined;
        readonly "aria-selected": "true" | "false";
        readonly "aria-controls": string | undefined;
        readonly "data-tabs-trigger": "";
        readonly disabled: true | undefined;
        readonly tabindex: number;
        readonly onclick: (_: BitsMouseEvent) => void;
        readonly onfocus: (_: BitsFocusEvent) => void;
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
    };
}
type TabsContentStateProps = WithRefProps<ReadableBoxedValues<{
    value: string;
}>>;
declare class TabsContentState {
    #private;
    readonly opts: TabsContentStateProps;
    readonly root: TabsRootState;
    constructor(opts: TabsContentStateProps, root: TabsRootState);
    props: {
        readonly id: string;
        readonly role: "tabpanel";
        readonly hidden: true | undefined;
        readonly tabindex: 0;
        readonly "data-value": string;
        readonly "data-state": "active" | "inactive";
        readonly "aria-labelledby": string | undefined;
        readonly "data-tabs-content": "";
    };
}
export declare function useTabsRoot(props: TabsRootStateProps): TabsRootState;
export declare function useTabsTrigger(props: TabsTriggerStateProps): TabsTriggerState;
export declare function useTabsList(props: TabsListStateProps): TabsListState;
export declare function useTabsContent(props: TabsContentStateProps): TabsContentState;
export {};
