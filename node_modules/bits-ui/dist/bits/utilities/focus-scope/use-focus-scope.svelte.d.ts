import { Context } from "runed";
import type { ReadableBoxedValues } from "../../../internal/box.svelte.js";
import { type EventCallback } from "../../../internal/events.js";
export type FocusScopeContextValue = {
    ignoreCloseAutoFocus: boolean;
};
export declare const FocusScopeContext: Context<FocusScopeContextValue>;
type UseFocusScopeProps = ReadableBoxedValues<{
    /**
     * ID of the focus scope container node.
     */
    id: string;
    /**
     * When `true` will loop through the tabbable elements in the focus scope.
     *
     * @defaultValue false
     */
    loop: boolean;
    /**
     * Whether focus is trapped within the focus scope.
     *
     * @defaultValue false
     */
    enabled: boolean;
    /**
     * Event handler called when auto-focusing onMount.
     * Can be prevented.
     */
    onOpenAutoFocus: EventCallback;
    /**
     * Event handler called when auto-focusing onDestroy.
     * Can be prevented.
     */
    onCloseAutoFocus: EventCallback;
    /**
     * Whether force mount is enabled or not
     */
    forceMount: boolean;
}>;
export type FocusScopeContainerProps = {
    id: string;
    tabindex: number;
    onkeydown: EventCallback<KeyboardEvent>;
};
export declare function useFocusScope({ id, loop, enabled, onOpenAutoFocus, onCloseAutoFocus, forceMount, }: UseFocusScopeProps): {
    readonly props: FocusScopeContainerProps;
};
export {};
