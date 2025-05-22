import type { Getter } from "svelte-toolbelt";
/**
 * Calls a function the next frame after all animations have finished.
 */
export declare function useAfterAnimations(getNode: Getter<HTMLElement | null>): (fn: () => void) => void;
