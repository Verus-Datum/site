import { type ReadableBox } from "svelte-toolbelt";
import type { InteractOutsideBehaviorType } from "../utilities/dismissible-layer/types.js";
import type { ReadableBoxedValues, WritableBoxedValues } from "../../internal/box.svelte.js";
import { type UseRovingFocusReturn } from "../../internal/use-roving-focus.svelte.js";
import type { Direction } from "../../shared/index.js";
import type { BitsFocusEvent, BitsKeyboardEvent, BitsPointerEvent, OnChangeFn, WithRefProps } from "../../internal/types.js";
import { type FocusScopeContextValue } from "../utilities/focus-scope/use-focus-scope.svelte.js";
type MenubarRootStateProps = WithRefProps<ReadableBoxedValues<{
    dir: Direction;
    loop: boolean;
}> & WritableBoxedValues<{
    value: string;
}>>;
declare class MenubarRootState {
    readonly opts: MenubarRootStateProps;
    rovingFocusGroup: UseRovingFocusReturn;
    wasOpenedByKeyboard: boolean;
    triggerIds: string[];
    valueToChangeHandler: Map<string, ReadableBox<OnChangeFn<boolean>>>;
    constructor(opts: MenubarRootStateProps);
    /**
     * @param id - the id of the trigger to register
     * @returns - a function to de-register the trigger
     */
    registerTrigger(id: string): () => void;
    /**
     * @param value - the value of the menu to register
     * @param contentId - the content id to associate with the value
     * @returns - a function to de-register the menu
     */
    registerMenu(value: string, onOpenChange: ReadableBox<OnChangeFn<boolean>>): () => void;
    updateValue(value: string): void;
    getTriggers(): HTMLButtonElement[];
    onMenuOpen(id: string, triggerId: string): void;
    onMenuClose(): void;
    onMenuToggle(id: string): void;
    props: {
        readonly id: string;
        readonly role: "menubar";
        readonly "data-menubar-root": "";
    };
}
type MenubarMenuStateProps = ReadableBoxedValues<{
    value: string;
    onOpenChange: OnChangeFn<boolean>;
}>;
declare class MenubarMenuState {
    readonly opts: MenubarMenuStateProps;
    readonly root: MenubarRootState;
    open: boolean;
    wasOpenedByKeyboard: boolean;
    triggerNode: HTMLElement | null;
    contentNode: HTMLElement | null;
    constructor(opts: MenubarMenuStateProps, root: MenubarRootState);
    getTriggerNode(): HTMLElement | null;
    openMenu(): void;
}
type MenubarTriggerStateProps = WithRefProps<ReadableBoxedValues<{
    disabled: boolean;
}>>;
declare class MenubarTriggerState {
    #private;
    readonly opts: MenubarTriggerStateProps;
    readonly menu: MenubarMenuState;
    root: MenubarRootState;
    isFocused: boolean;
    constructor(opts: MenubarTriggerStateProps, menu: MenubarMenuState);
    onpointerdown(e: BitsPointerEvent): void;
    onpointerenter(_: BitsPointerEvent): void;
    onkeydown(e: BitsKeyboardEvent): void;
    onfocus(_: BitsFocusEvent): void;
    onblur(_: BitsFocusEvent): void;
    props: {
        readonly type: "button";
        readonly role: "menuitem";
        readonly id: string;
        readonly "aria-haspopup": "menu";
        readonly "aria-expanded": "true" | "false";
        readonly "aria-controls": string | undefined;
        readonly "data-highlighted": "" | undefined;
        readonly "data-state": "open" | "closed";
        readonly "data-disabled": "" | undefined;
        readonly "data-menu-value": string;
        readonly disabled: true | undefined;
        readonly tabindex: number;
        readonly "data-menubar-trigger": "";
        readonly onpointerdown: (e: BitsPointerEvent) => void;
        readonly onpointerenter: (_: BitsPointerEvent) => void;
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
        readonly onfocus: (_: BitsFocusEvent) => void;
        readonly onblur: (_: BitsFocusEvent) => void;
    };
}
type MenubarContentStateProps = WithRefProps<ReadableBoxedValues<{
    interactOutsideBehavior: InteractOutsideBehaviorType;
    onOpenAutoFocus: (e: Event) => void;
    onCloseAutoFocus: (e: Event) => void;
    onFocusOutside: (e: FocusEvent) => void;
    onInteractOutside: (e: PointerEvent) => void;
}>>;
declare class MenubarContentState {
    readonly opts: MenubarContentStateProps;
    readonly menu: MenubarMenuState;
    root: MenubarRootState;
    focusScopeContext: FocusScopeContextValue;
    constructor(opts: MenubarContentStateProps, menu: MenubarMenuState);
    onCloseAutoFocus: (e: Event) => void;
    onFocusOutside: (e: FocusEvent) => void;
    onInteractOutside: (e: PointerEvent) => void;
    onOpenAutoFocus: (e: Event) => void;
    onkeydown(e: BitsKeyboardEvent): void;
    props: {
        readonly id: string;
        readonly "aria-labelledby": string | undefined;
        readonly style: {
            readonly "--bits-menubar-content-transform-origin": "var(--bits-floating-transform-origin)";
            readonly "--bits-menubar-content-available-width": "var(--bits-floating-available-width)";
            readonly "--bits-menubar-content-available-height": "var(--bits-floating-available-height)";
            readonly "--bits-menubar-anchor-width": "var(--bits-floating-anchor-width)";
            readonly "--bits-menubar-anchor-height": "var(--bits-floating-anchor-height)";
        };
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
        readonly "data-menu-content": "";
    };
    popperProps: {
        onCloseAutoFocus: (e: Event) => void;
        onFocusOutside: (e: FocusEvent) => void;
        onInteractOutside: (e: PointerEvent) => void;
        onOpenAutoFocus: (e: Event) => void;
    };
}
export declare function useMenubarRoot(props: MenubarRootStateProps): MenubarRootState;
export declare function useMenubarMenu(props: MenubarMenuStateProps): MenubarMenuState;
export declare function useMenubarTrigger(props: MenubarTriggerStateProps): MenubarTriggerState;
export declare function useMenubarContent(props: MenubarContentStateProps): MenubarContentState;
export {};
