import type { CommandState } from "./types.js";
import type { BitsKeyboardEvent, BitsMouseEvent, BitsPointerEvent, WithRefProps } from "../../internal/types.js";
import type { ReadableBoxedValues, WritableBoxedValues } from "../../internal/box.svelte.js";
type CommandRootStateProps = WithRefProps<ReadableBoxedValues<{
    filter: (value: string, search: string, keywords?: string[]) => number;
    shouldFilter: boolean;
    loop: boolean;
    vimBindings: boolean;
    disablePointerSelection: boolean;
    onStateChange?: (state: Readonly<CommandState>) => void;
}> & WritableBoxedValues<{
    value: string;
}>>;
declare class CommandRootState {
    #private;
    readonly opts: CommandRootStateProps;
    sortAfterTick: boolean;
    sortAndFilterAfterTick: boolean;
    allItems: Set<string>;
    allGroups: Map<string, Set<string>>;
    allIds: Map<string, {
        value: string;
        keywords?: string[];
    }>;
    key: number;
    viewportNode: HTMLElement | null;
    inputNode: HTMLElement | null;
    labelNode: HTMLElement | null;
    commandState: CommandState;
    _commandState: CommandState;
    setState<K extends keyof CommandState>(key: K, value: CommandState[K], opts?: boolean): void;
    constructor(opts: CommandRootStateProps);
    /**
     * Sets current value and triggers re-render if cleared.
     *
     * @param value - New value to set
     */
    setValue(value: string, opts?: boolean): void;
    /**
     * Gets all non-disabled, visible command items.
     *
     * @returns Array of valid item elements
     * @remarks Exposed for direct item access and bound checking
     */
    getValidItems(): HTMLElement[];
    /**
     * Sets selection to item at specified index in valid items array.
     * If index is out of bounds, does nothing.
     *
     * @param index - Zero-based index of item to select
     * @remarks
     * Uses `getValidItems()` to get selectable items, filtering out disabled/hidden ones.
     * Access valid items directly via `getValidItems()` to check bounds before calling.
     *
     * @example
     * // get valid items length for bounds check
     * const items = getValidItems()
     * if (index < items.length) {
     *   updateSelectedToIndex(index)
     * }
     */
    updateSelectedToIndex(index: number): void;
    /**
     * Updates selected item by moving up/down relative to current selection.
     * Handles wrapping when loop option is enabled.
     *
     * @param change - Direction to move: 1 for next item, -1 for previous item
     * @remarks
     * The loop behavior wraps:
     * - From last item to first when moving next
     * - From first item to last when moving previous
     *
     * Uses `getValidItems()` to get all selectable items, which filters out disabled/hidden items.
     * You can call `getValidItems()` directly to get the current valid items array.
     *
     * @example
     * // select next item
     * updateSelectedByItem(1)
     *
     * // get all valid items
     * const items = getValidItems()
     */
    updateSelectedByItem(change: 1 | -1): void;
    /**
     * Moves selection to the first valid item in the next/previous group.
     * If no group is found, falls back to selecting the next/previous item globally.
     *
     * @param change - Direction to move: 1 for next group, -1 for previous group
     * @example
     * // move to first item in next group
     * updateSelectedByGroup(1)
     *
     * // move to first item in previous group
     * updateSelectedByGroup(-1)
     */
    updateSelectedByGroup(change: 1 | -1): void;
    /**
     * Maps item id to display value and search keywords.
     * Returns cleanup function to remove mapping.
     *
     * @param id - Unique item identifier
     * @param value - Display text
     * @param keywords - Optional search boost terms
     * @returns Cleanup function
     */
    registerValue(value: string, keywords?: string[]): () => void;
    /**
     * Registers item in command list and its group.
     * Handles filtering, sorting and selection updates.
     *
     * @param id - Item identifier
     * @param groupId - Optional group to add item to
     * @returns Cleanup function that handles selection
     */
    registerItem(id: string, groupId: string | undefined): () => void;
    /**
     * Creates empty group if not exists.
     *
     * @param id - Group identifier
     * @returns Cleanup function
     */
    registerGroup(id: string): () => void;
    onkeydown(e: BitsKeyboardEvent): void;
    props: {
        readonly id: string;
        readonly role: "application";
        readonly "data-command-root": "";
        readonly tabindex: -1;
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
    };
}
type CommandEmptyStateProps = WithRefProps & ReadableBoxedValues<{
    forceMount: boolean;
}>;
declare class CommandEmptyState {
    #private;
    readonly opts: CommandEmptyStateProps;
    readonly root: CommandRootState;
    shouldRender: boolean;
    constructor(opts: CommandEmptyStateProps, root: CommandRootState);
    props: {
        readonly id: string;
        readonly role: "presentation";
        readonly "data-command-empty": "";
    };
}
type CommandGroupContainerStateProps = WithRefProps<ReadableBoxedValues<{
    value: string;
    forceMount: boolean;
}>>;
declare class CommandGroupContainerState {
    readonly opts: CommandGroupContainerStateProps;
    readonly root: CommandRootState;
    headingNode: HTMLElement | null;
    trueValue: string;
    shouldRender: boolean;
    constructor(opts: CommandGroupContainerStateProps, root: CommandRootState);
    props: {
        readonly id: string;
        readonly role: "presentation";
        readonly hidden: true | undefined;
        readonly "data-value": string;
        readonly "data-command-group": "";
    };
}
type CommandGroupHeadingStateProps = WithRefProps;
declare class CommandGroupHeadingState {
    readonly opts: CommandGroupHeadingStateProps;
    readonly group: CommandGroupContainerState;
    constructor(opts: CommandGroupHeadingStateProps, group: CommandGroupContainerState);
    props: {
        readonly id: string;
        readonly "data-command-group-heading": "";
    };
}
type CommandGroupItemsStateProps = WithRefProps;
declare class CommandGroupItemsState {
    readonly opts: CommandGroupItemsStateProps;
    readonly group: CommandGroupContainerState;
    constructor(opts: CommandGroupItemsStateProps, group: CommandGroupContainerState);
    props: {
        readonly id: string;
        readonly role: "group";
        readonly "data-command-group-items": "";
        readonly "aria-labelledby": string | undefined;
    };
}
type CommandInputStateProps = WithRefProps<WritableBoxedValues<{
    value: string;
}> & ReadableBoxedValues<{
    autofocus: boolean;
}>>;
declare class CommandInputState {
    #private;
    readonly opts: CommandInputStateProps;
    readonly root: CommandRootState;
    constructor(opts: CommandInputStateProps, root: CommandRootState);
    props: {
        readonly id: string;
        readonly type: "text";
        readonly "data-command-input": "";
        readonly autocomplete: "off";
        readonly autocorrect: "off";
        readonly spellcheck: false;
        readonly "aria-autocomplete": "list";
        readonly role: "combobox";
        readonly "aria-expanded": "true" | "false";
        readonly "aria-controls": string | undefined;
        readonly "aria-labelledby": string | undefined;
        readonly "aria-activedescendant": string | undefined;
    };
}
type CommandItemStateProps = WithRefProps<ReadableBoxedValues<{
    value: string;
    disabled: boolean;
    onSelect: () => void;
    forceMount: boolean;
    keywords: string[];
}> & {
    group: CommandGroupContainerState | null;
}>;
declare class CommandItemState {
    #private;
    readonly opts: CommandItemStateProps;
    readonly root: CommandRootState;
    trueValue: string;
    shouldRender: boolean;
    isSelected: boolean;
    constructor(opts: CommandItemStateProps, root: CommandRootState);
    onpointermove(_: BitsPointerEvent): void;
    onclick(_: BitsMouseEvent): void;
    props: {
        readonly id: string;
        readonly "aria-disabled": "true" | "false";
        readonly "aria-selected": "true" | "false";
        readonly "data-disabled": "" | undefined;
        readonly "data-selected": "" | undefined;
        readonly "data-value": string;
        readonly "data-command-item": "";
        readonly role: "option";
        readonly onpointermove: (_: BitsPointerEvent) => void;
        readonly onclick: (_: BitsMouseEvent) => void;
    };
}
type CommandLoadingStateProps = WithRefProps<ReadableBoxedValues<{
    progress: number;
}>>;
declare class CommandLoadingState {
    readonly opts: CommandLoadingStateProps;
    constructor(opts: CommandLoadingStateProps);
    props: {
        readonly id: string;
        readonly role: "progressbar";
        readonly "aria-valuenow": number;
        readonly "aria-valuemin": 0;
        readonly "aria-valuemax": 100;
        readonly "aria-label": "Loading...";
        readonly "data-command-loading": "";
    };
}
type CommandSeparatorStateProps = WithRefProps & ReadableBoxedValues<{
    forceMount: boolean;
}>;
declare class CommandSeparatorState {
    readonly opts: CommandSeparatorStateProps;
    readonly root: CommandRootState;
    shouldRender: boolean;
    constructor(opts: CommandSeparatorStateProps, root: CommandRootState);
    props: {
        readonly id: string;
        readonly "aria-hidden": "true";
        readonly "data-command-separator": "";
    };
}
type CommandListStateProps = WithRefProps & ReadableBoxedValues<{
    ariaLabel: string;
}>;
declare class CommandListState {
    readonly opts: CommandListStateProps;
    readonly root: CommandRootState;
    constructor(opts: CommandListStateProps, root: CommandRootState);
    props: {
        readonly id: string;
        readonly role: "listbox";
        readonly "aria-label": string;
        readonly "data-command-list": "";
    };
}
type CommandLabelStateProps = WithRefProps<ReadableBoxedValues<{
    for?: string;
}>>;
declare class CommandLabelState {
    readonly opts: CommandLabelStateProps;
    readonly root: CommandRootState;
    constructor(opts: CommandLabelStateProps, root: CommandRootState);
    props: {
        readonly id: string;
        readonly "data-command-input-label": "";
        readonly for: string | undefined;
        readonly style: import("svelte-toolbelt").StyleProperties;
    };
}
type CommandViewportStateProps = WithRefProps;
declare class CommandViewportState {
    readonly opts: CommandViewportStateProps;
    readonly list: CommandListState;
    constructor(opts: CommandViewportStateProps, list: CommandListState);
    props: {
        readonly id: string;
        readonly "data-command-viewport": "";
    };
}
export declare function useCommandRoot(props: CommandRootStateProps): CommandRootState;
export declare function useCommandEmpty(props: CommandEmptyStateProps): CommandEmptyState;
export declare function useCommandItem(props: Omit<CommandItemStateProps, "group">): CommandItemState;
export declare function useCommandGroupContainer(props: CommandGroupContainerStateProps): CommandGroupContainerState;
export declare function useCommandGroupHeading(props: CommandGroupHeadingStateProps): CommandGroupHeadingState;
export declare function useCommandGroupItems(props: CommandGroupItemsStateProps): CommandGroupItemsState;
export declare function useCommandInput(props: CommandInputStateProps): CommandInputState;
export declare function useCommandLoading(props: CommandLoadingStateProps): CommandLoadingState;
export declare function useCommandSeparator(props: CommandSeparatorStateProps): CommandSeparatorState;
export declare function useCommandList(props: CommandListStateProps): CommandListState;
export declare function useCommandViewport(props: CommandViewportStateProps): CommandViewportState;
export declare function useCommandLabel(props: CommandLabelStateProps): CommandLabelState;
export {};
