import { box, onDestroyEffect } from "svelte-toolbelt";
import { isBrowser } from "./is.js";
export function useTimeoutFn(cb, interval, options = {}) {
    const { immediate = true } = options;
    const isPending = box(false);
    let timer;
    function clear() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }
    function stop() {
        isPending.current = false;
        clear();
    }
    function start(...args) {
        clear();
        isPending.current = true;
        timer = setTimeout(() => {
            isPending.current = false;
            timer = null;
            cb(...args);
        }, interval);
    }
    if (immediate) {
        isPending.current = true;
        if (isBrowser)
            start();
    }
    onDestroyEffect(() => {
        stop();
    });
    return {
        isPending: box.readonly(isPending),
        start,
        stop,
    };
}
