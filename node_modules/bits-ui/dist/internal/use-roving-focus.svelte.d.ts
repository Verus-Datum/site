import { type ReadableBox } from "svelte-toolbelt";
import type { Orientation } from "../shared/index.js";
type UseRovingFocusProps = ({
    /**
     * The selector used to find the focusable candidates.
     */
    candidateAttr: string;
    candidateSelector?: undefined;
} | {
    /**
     * Custom candidate selector
     */
    candidateSelector: string;
    candidateAttr?: undefined;
}) & {
    /**
     * The id of the root node
     */
    rootNodeId: ReadableBox<string>;
    /**
     * Whether to loop through the candidates when reaching the end.
     */
    loop: ReadableBox<boolean>;
    /**
     * The orientation of the roving focus group. Used
     * to determine how keyboard navigation should work.
     */
    orientation: ReadableBox<Orientation>;
    /**
     * A callback function called when a candidate is focused.
     */
    onCandidateFocus?: (node: HTMLElement) => void;
};
export type UseRovingFocusReturn = ReturnType<typeof useRovingFocus>;
export declare function useRovingFocus(props: UseRovingFocusProps): {
    setCurrentTabStopId(id: string): void;
    getTabIndex: (node: HTMLElement | null | undefined) => 0 | -1;
    handleKeydown: (node: HTMLElement | null | undefined, e: KeyboardEvent, both?: boolean) => HTMLElement | undefined;
    focusFirstCandidate: () => void;
    currentTabStopId: import("svelte-toolbelt").WritableBox<string | null>;
};
export {};
