import { box } from "svelte-toolbelt";
import { useId } from "../../../internal/use-id.js";
const focusStack = box([]);
export function createFocusScopeStack() {
    return {
        add(focusScope) {
            const activeFocusScope = focusStack.current[0];
            if (activeFocusScope && focusScope.id !== activeFocusScope.id) {
                activeFocusScope.pause();
            }
            focusStack.current = removeFromFocusScopeArray(focusStack.current, focusScope);
            focusStack.current.unshift(focusScope);
        },
        remove(focusScope) {
            focusStack.current = removeFromFocusScopeArray(focusStack.current, focusScope);
            focusStack.current[0]?.resume();
        },
        get current() {
            return focusStack.current;
        },
    };
}
export function createFocusScopeAPI() {
    let paused = $state(false);
    let isHandlingFocus = $state(false);
    return {
        id: useId(),
        get paused() {
            return paused;
        },
        get isHandlingFocus() {
            return isHandlingFocus;
        },
        set isHandlingFocus(value) {
            isHandlingFocus = value;
        },
        pause() {
            paused = true;
        },
        resume() {
            paused = false;
        },
    };
}
function removeFromFocusScopeArray(arr, item) {
    return [...arr].filter((i) => i.id !== item.id);
}
export function removeLinks(items) {
    return items.filter((item) => item.tagName !== "A");
}
