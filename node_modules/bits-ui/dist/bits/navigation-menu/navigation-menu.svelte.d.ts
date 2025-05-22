/**
 * Based on Radix UI's Navigation Menu
 * https://www.radix-ui.com/docs/primitives/components/navigation-menu
 */
import { type AnyFn, type ReadableBox, type ReadableBoxedValues, type WithRefProps, type WritableBox, type WritableBoxedValues } from "svelte-toolbelt";
import { Context } from "runed";
import { type Snippet } from "svelte";
import { SvelteMap } from "svelte/reactivity";
import { type Direction, type Orientation } from "../../shared/index.js";
import type { BitsFocusEvent, BitsKeyboardEvent, BitsMouseEvent, BitsPointerEvent } from "../../internal/types.js";
import { useRovingFocus } from "../../internal/use-roving-focus.svelte.js";
type NavigationMenuProviderStateProps = ReadableBoxedValues<{
    dir: Direction;
    orientation: Orientation;
}> & WritableBoxedValues<{
    rootNavigationMenuRef: HTMLElement | null;
    value: string;
    previousValue: string;
}> & {
    isRootMenu: boolean;
    onTriggerEnter: (itemValue: string) => void;
    onTriggerLeave?: () => void;
    onContentEnter?: () => void;
    onContentLeave?: () => void;
    onItemSelect: (itemValue: string) => void;
    onItemDismiss: () => void;
};
declare class NavigationMenuProviderState {
    readonly opts: NavigationMenuProviderStateProps;
    indicatorTrackRef: WritableBox<HTMLElement | null>;
    viewportRef: WritableBox<HTMLElement | null>;
    viewportContent: SvelteMap<string, NavigationMenuItemState>;
    onTriggerEnter: NavigationMenuProviderStateProps["onTriggerEnter"];
    onTriggerLeave: () => void;
    onContentEnter: () => void;
    onContentLeave: () => void;
    onItemSelect: NavigationMenuProviderStateProps["onItemSelect"];
    onItemDismiss: NavigationMenuProviderStateProps["onItemDismiss"];
    constructor(opts: NavigationMenuProviderStateProps);
}
type NavigationMenuRootStateProps = WithRefProps<WritableBoxedValues<{
    value: string;
}> & ReadableBoxedValues<{
    dir: Direction;
    orientation: Orientation;
    delayDuration: number;
    skipDelayDuration: number;
}>>;
declare class NavigationMenuRootState {
    #private;
    readonly opts: NavigationMenuRootStateProps;
    provider: NavigationMenuProviderState;
    previousValue: WritableBox<string>;
    isDelaySkipped: WritableBox<boolean>;
    constructor(opts: NavigationMenuRootStateProps);
    setValue: (newValue: string) => void;
    props: {
        readonly id: string;
        readonly "data-orientation": "horizontal" | "vertical";
        readonly dir: Direction;
        readonly "data-navigation-menu-root": "";
        readonly "data-navigation-menu": "";
    };
}
type NavigationMenuSubStateProps = WithRefProps<WritableBoxedValues<{
    value: string;
}> & ReadableBoxedValues<{
    orientation: Orientation;
}>>;
declare class NavigationMenuSubState {
    readonly opts: NavigationMenuSubStateProps;
    readonly context: NavigationMenuProviderState;
    previousValue: WritableBox<string>;
    constructor(opts: NavigationMenuSubStateProps, context: NavigationMenuProviderState);
    setValue: (newValue: string) => void;
    props: {
        readonly id: string;
        readonly "data-orientation": "horizontal" | "vertical";
        readonly "data-navigation-menu-sub": "";
        readonly "data-navigation-menu": "";
    };
}
type NavigationMenuListStateProps = WithRefProps;
declare class NavigationMenuListState {
    readonly opts: NavigationMenuListStateProps;
    readonly context: NavigationMenuProviderState;
    wrapperId: WritableBox<string>;
    wrapperRef: WritableBox<HTMLElement | null>;
    listTriggers: HTMLElement[];
    rovingFocusGroup: ReturnType<typeof useRovingFocus>;
    wrapperMounted: boolean;
    constructor(opts: NavigationMenuListStateProps, context: NavigationMenuProviderState);
    registerTrigger(trigger: HTMLElement | null): () => void;
    wrapperProps: {
        readonly id: string;
    };
    props: {
        readonly id: string;
        readonly "data-orientation": "horizontal" | "vertical";
        readonly "data-navigation-menu-list": "";
    };
}
type NavigationMenuItemStateProps = WithRefProps<ReadableBoxedValues<{
    value: string;
}>>;
export declare class NavigationMenuItemState {
    #private;
    readonly opts: NavigationMenuItemStateProps;
    readonly listContext: NavigationMenuListState;
    contentNode: HTMLElement | null;
    triggerNode: HTMLElement | null;
    focusProxyNode: HTMLElement | null;
    restoreContentTabOrder: AnyFn;
    wasEscapeClose: boolean;
    contentId: string | undefined;
    triggerId: string | undefined;
    contentChildren: ReadableBox<Snippet | undefined>;
    contentChild: ReadableBox<Snippet<[{
        props: Record<string, unknown>;
    }]> | undefined>;
    contentProps: ReadableBox<Record<string, unknown>>;
    constructor(opts: NavigationMenuItemStateProps, listContext: NavigationMenuListState);
    onEntryKeydown: (side?: "start" | "end") => void;
    onFocusProxyEnter: (side?: "start" | "end") => void;
    onRootContentClose: () => void;
    onContentFocusOutside: () => void;
    props: {
        readonly id: string;
        readonly "data-navigation-menu-item": "";
    };
}
type NavigationMenuTriggerStateProps = WithRefProps & ReadableBoxedValues<{
    disabled: boolean | null | undefined;
}>;
declare class NavigationMenuTriggerState {
    readonly opts: NavigationMenuTriggerStateProps;
    focusProxyId: WritableBox<string>;
    focusProxyRef: WritableBox<HTMLElement | null>;
    context: NavigationMenuProviderState;
    itemContext: NavigationMenuItemState;
    listContext: NavigationMenuListState;
    hasPointerMoveOpened: WritableBox<boolean>;
    wasClickClose: boolean;
    open: boolean;
    focusProxyMounted: boolean;
    constructor(opts: NavigationMenuTriggerStateProps, context: {
        provider: NavigationMenuProviderState;
        item: NavigationMenuItemState;
        list: NavigationMenuListState;
    });
    onpointerenter: (_: BitsPointerEvent<HTMLButtonElement>) => void;
    onpointermove: BitsPointerEventHandler<HTMLElement>;
    onpointerleave: BitsPointerEventHandler<HTMLElement>;
    onclick: (_: BitsMouseEvent<HTMLButtonElement>) => void;
    onkeydown: (e: BitsKeyboardEvent<HTMLButtonElement>) => void;
    focusProxyOnFocus: (e: BitsFocusEvent) => void;
    props: {
        readonly id: string;
        readonly disabled: boolean | null | undefined;
        readonly "data-disabled": "" | undefined;
        readonly "data-state": "open" | "closed";
        readonly "data-value": string;
        readonly "aria-expanded": "true" | "false";
        readonly "aria-controls": string | undefined;
        readonly "data-navigation-menu-trigger": "";
        readonly onpointermove: BitsPointerEventHandler<HTMLElement>;
        readonly onpointerleave: BitsPointerEventHandler<HTMLElement>;
        readonly onpointerenter: (_: BitsPointerEvent<HTMLButtonElement>) => void;
        readonly onclick: (_: BitsMouseEvent<HTMLButtonElement>) => void;
        readonly onkeydown: (e: BitsKeyboardEvent<HTMLButtonElement>) => void;
    };
    focusProxyProps: {
        readonly id: string;
        readonly tabindex: 0;
        readonly onfocus: (e: BitsFocusEvent) => void;
    };
    restructureSpanProps: {
        readonly "aria-owns": string | undefined;
    };
}
type NavigationMenuLinkStateProps = WithRefProps & ReadableBoxedValues<{
    active: boolean;
    onSelect: (e: Event) => void;
}>;
declare class NavigationMenuLinkState {
    readonly opts: NavigationMenuLinkStateProps;
    readonly context: {
        provider: NavigationMenuProviderState;
        item: NavigationMenuItemState;
    };
    isFocused: boolean;
    constructor(opts: NavigationMenuLinkStateProps, context: {
        provider: NavigationMenuProviderState;
        item: NavigationMenuItemState;
    });
    onclick: (e: BitsMouseEvent<HTMLAnchorElement>) => void;
    onkeydown: (e: BitsKeyboardEvent) => void;
    onfocus: (_: BitsFocusEvent) => void;
    onblur: (_: BitsFocusEvent) => void;
    props: {
        readonly id: string;
        readonly "data-active": "" | undefined;
        readonly "aria-current": "page" | undefined;
        readonly "data-focused": "" | undefined;
        readonly onclick: (e: BitsMouseEvent<HTMLAnchorElement>) => void;
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
        readonly onfocus: (_: BitsFocusEvent) => void;
        readonly onblur: (_: BitsFocusEvent) => void;
        readonly "data-navigation-menu-link": "";
    };
}
type NavigationMenuIndicatorStateProps = WithRefProps;
declare class NavigationMenuIndicatorState {
    context: NavigationMenuProviderState;
    isVisible: boolean;
    constructor(context: NavigationMenuProviderState);
}
declare class NavigationMenuIndicatorImplState {
    readonly opts: NavigationMenuIndicatorStateProps;
    context: NavigationMenuProviderState;
    listContext: NavigationMenuListState;
    position: {
        size: number;
        offset: number;
    } | null;
    isHorizontal: boolean;
    isVisible: boolean;
    activeTrigger: HTMLElement | null;
    shouldRender: boolean;
    constructor(opts: NavigationMenuIndicatorStateProps, context: {
        provider: NavigationMenuProviderState;
        list: NavigationMenuListState;
    });
    handlePositionChange: () => void;
    props: {
        readonly id: string;
        readonly "data-state": "hidden" | "visible";
        readonly "data-orientation": "horizontal" | "vertical";
        readonly style: {
            readonly left: number;
            readonly width: string;
            readonly transform: string;
            readonly position: "absolute";
        } | {
            readonly top: number;
            readonly height: string;
            readonly transform: string;
            readonly position: "absolute";
        };
        readonly "data-navigation-menu-indicator": "";
    };
}
type NavigationMenuContentStateProps = WithRefProps;
declare class NavigationMenuContentState {
    readonly opts: NavigationMenuContentStateProps;
    context: NavigationMenuProviderState;
    itemContext: NavigationMenuItemState;
    listContext: NavigationMenuListState;
    open: boolean;
    mounted: boolean;
    value: string;
    isLastActiveValue: boolean;
    constructor(opts: NavigationMenuContentStateProps, context: {
        provider: NavigationMenuProviderState;
        item: NavigationMenuItemState;
        list: NavigationMenuListState;
    });
    onpointerenter: (_: BitsPointerEvent) => void;
    onpointerleave: BitsPointerEventHandler<HTMLElement>;
    props: {
        readonly id: string;
        readonly onpointerenter: (_: BitsPointerEvent) => void;
        readonly onpointerleave: BitsPointerEventHandler<HTMLElement>;
    };
}
type MotionAttribute = "to-start" | "to-end" | "from-start" | "from-end";
type NavigationMenuContentImplStateProps = WithRefProps;
declare class NavigationMenuContentImplState {
    readonly opts: NavigationMenuContentImplStateProps;
    readonly itemContext: NavigationMenuItemState;
    context: NavigationMenuProviderState;
    listContext: NavigationMenuListState;
    prevMotionAttribute: MotionAttribute | null;
    motionAttribute: MotionAttribute | null;
    constructor(opts: NavigationMenuContentImplStateProps, itemContext: NavigationMenuItemState);
    onFocusOutside: (e: Event) => void;
    onInteractOutside: (e: PointerEvent) => void;
    onkeydown: (e: BitsKeyboardEvent) => void;
    onEscapeKeydown: (_: KeyboardEvent) => void;
    props: {
        readonly id: string;
        readonly "aria-labelledby": string | undefined;
        readonly "data-motion": MotionAttribute | undefined;
        readonly "data-orientation": "horizontal" | "vertical";
        readonly "data-state": "open" | "closed";
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
        readonly "data-navigation-menu-content": "";
    };
}
declare class NavigationMenuViewportState {
    readonly opts: NavigationMenuViewportImplStateProps;
    readonly context: NavigationMenuProviderState;
    open: boolean;
    size: {
        width: number;
        height: number;
    } | null;
    contentNode: HTMLElement | null;
    viewportWidth: string | undefined;
    viewportHeight: string | undefined;
    activeContentValue: string;
    constructor(opts: NavigationMenuViewportImplStateProps, context: NavigationMenuProviderState);
    props: {
        readonly id: string;
        readonly "data-state": "open" | "closed";
        readonly "data-orientation": "horizontal" | "vertical";
        readonly style: {
            readonly pointerEvents: "none" | undefined;
            readonly "--bits-navigation-menu-viewport-width": string | undefined;
            readonly "--bits-navigation-menu-viewport-height": string | undefined;
        };
        readonly "data-navigation-menu-viewport": "";
        readonly onpointerenter: () => void;
        readonly onpointerleave: () => void;
    };
}
type NavigationMenuViewportImplStateProps = WithRefProps;
export declare const NavigationMenuItemContext: Context<NavigationMenuItemState>;
export declare function useNavigationMenuRoot(props: NavigationMenuRootStateProps): NavigationMenuRootState;
export declare function useNavigationMenuProvider(props: NavigationMenuProviderStateProps): NavigationMenuProviderState;
export declare function useNavigationMenuSub(props: NavigationMenuSubStateProps): NavigationMenuSubState;
export declare function useNavigationMenuList(props: NavigationMenuListStateProps): NavigationMenuListState;
export declare function useNavigationMenuItem(props: NavigationMenuItemStateProps): NavigationMenuItemState;
export declare function useNavigationMenuIndicatorImpl(props: NavigationMenuIndicatorStateProps): NavigationMenuIndicatorImplState;
export declare function useNavigationMenuTrigger(props: NavigationMenuTriggerStateProps): NavigationMenuTriggerState;
export declare function useNavigationMenuContent(props: NavigationMenuContentStateProps): NavigationMenuContentState;
export declare function useNavigationMenuLink(props: NavigationMenuLinkStateProps): NavigationMenuLinkState;
export declare function useNavigationMenuContentImpl(props: NavigationMenuContentImplStateProps, itemState?: NavigationMenuItemState): NavigationMenuContentImplState;
export declare function useNavigationMenuViewport(props: NavigationMenuViewportImplStateProps): NavigationMenuViewportState;
export declare function useNavigationMenuIndicator(): NavigationMenuIndicatorState;
type BitsPointerEventHandler<T extends HTMLElement = HTMLElement> = (e: BitsPointerEvent<T>) => void;
export {};
