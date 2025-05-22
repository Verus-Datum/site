import { getNextMatch } from "./arrays.js";
import { boxAutoReset } from "./box-auto-reset.svelte.js";
export function useDataTypeahead(opts) {
    // Reset `search` 1 second after it was last updated
    const search = boxAutoReset("", 1000);
    const candidateValues = $derived(opts.candidateValues());
    function handleTypeaheadSearch(key) {
        if (!opts.enabled)
            return;
        if (!candidateValues.length)
            return;
        search.current = search.current + key;
        const currentItem = opts.getCurrentItem();
        const currentMatch = candidateValues.find((item) => item === currentItem) ?? "";
        const values = candidateValues.map((item) => item ?? "");
        const nextMatch = getNextMatch(values, search.current, currentMatch);
        const newItem = candidateValues.find((item) => item === nextMatch);
        if (newItem) {
            opts.onMatch(newItem);
        }
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
