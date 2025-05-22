import { type Getter } from "svelte-toolbelt";
interface UseGraceAreaOpts {
    enabled: Getter<boolean>;
    triggerNode: Getter<HTMLElement | null>;
    contentNode: Getter<HTMLElement | null>;
    onPointerExit: () => void;
    setIsPointerInTransit?: (value: boolean) => void;
}
export declare function useGraceArea(opts: UseGraceAreaOpts): {
    isPointerInTransit: import("svelte-toolbelt").WritableBox<boolean>;
};
export {};
