import type { Getter } from "svelte-toolbelt";
export type DataTypeahead = ReturnType<typeof useDataTypeahead>;
type UseDataTypeaheadOpts = {
    onMatch: (value: string) => void;
    getCurrentItem: () => string;
    candidateValues: Getter<string[]>;
    enabled: boolean;
};
export declare function useDataTypeahead(opts: UseDataTypeaheadOpts): {
    search: import("svelte-toolbelt").WritableBox<string>;
    handleTypeaheadSearch: (key: string) => string | undefined;
    resetTypeahead: () => void;
};
export {};
