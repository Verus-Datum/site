export type DOMTypeahead = ReturnType<typeof useDOMTypeahead>;
type UseDOMTypeaheadOpts = {
    onMatch?: (item: HTMLElement) => void;
    getCurrentItem?: () => HTMLElement | null;
};
export declare function useDOMTypeahead(opts?: UseDOMTypeaheadOpts): {
    search: import("svelte-toolbelt").WritableBox<string>;
    handleTypeaheadSearch: (key: string, candidates: HTMLElement[]) => HTMLElement | undefined;
    resetTypeahead: () => void;
};
export {};
