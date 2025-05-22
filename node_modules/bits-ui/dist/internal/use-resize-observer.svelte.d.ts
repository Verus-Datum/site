import type { Getter } from "svelte-toolbelt";
export declare function useResizeObserver(node: Getter<HTMLElement | null>, onResize: () => void): void;
