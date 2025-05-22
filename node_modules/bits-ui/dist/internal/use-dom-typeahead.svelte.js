import { getNextMatch } from "./arrays.js";
import { boxAutoReset } from "./box-auto-reset.svelte.js";
export function useDOMTypeahead(opts) {
    // Reset `search` 1 second after it was last updated
    const search = boxAutoReset("", 1000);
    const onMatch = opts?.onMatch ?? ((node) => node.focus());
    const getCurrentItem = opts?.getCurrentItem ?? (() => document.activeElement);
    function handleTypeaheadSearch(key, candidates) {
        if (!candidates.length)
            return;
        search.current = search.current + key;
        const currentItem = getCurrentItem();
        const currentMatch = candidates.find((item) => item === currentItem)?.textContent?.trim() ?? "";
        const values = candidates.map((item) => item.textContent?.trim() ?? "");
        const nextMatch = getNextMatch(values, search.current, currentMatch);
        const newItem = candidates.find((item) => item.textContent?.trim() === nextMatch);
        if (newItem)
            onMatch(newItem);
        return newItem;
    }
    function resetTypeahead() {
        search.current = "";
    }
    return {
        search,
        handleTypeaheadSearch,
        resetTypeahead,
    };
}
