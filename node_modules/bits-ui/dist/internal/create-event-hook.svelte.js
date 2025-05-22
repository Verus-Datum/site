import { executeCallbacks } from "svelte-toolbelt";
export function createEventHook() {
    const callbacks = new Set();
    const callbacksToDispose = [];
    function off(cb) {
        callbacks.delete(cb);
    }
    function on(cb) {
        callbacks.add(cb);
        const offFn = () => off(cb);
        callbacksToDispose.push(offFn);
        return { off: offFn };
    }
    const trigger = (...args) => {
        return Promise.all(Array.from(callbacks).map((cb) => {
            return Promise.resolve(cb(...args));
        }));
    };
    $effect(() => {
        return () => {
            executeCallbacks(callbacksToDispose);
        };
    });
    return {
        on,
        off,
        trigger,
    };
}
