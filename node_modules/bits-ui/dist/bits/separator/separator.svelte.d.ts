import type { ReadableBoxedValues } from "../../internal/box.svelte.js";
import type { WithRefProps } from "../../internal/types.js";
import type { Orientation } from "../../shared/index.js";
type SeparatorRootStateProps = WithRefProps<ReadableBoxedValues<{
    orientation: Orientation;
    decorative: boolean;
}>>;
declare class SeparatorRootState {
    readonly opts: SeparatorRootStateProps;
    constructor(opts: SeparatorRootStateProps);
    props: {
        readonly id: string;
        readonly role: "none" | "separator";
        readonly "aria-orientation": "horizontal" | "vertical";
        readonly "aria-hidden": "true" | undefined;
        readonly "data-orientation": "horizontal" | "vertical";
        readonly "data-separator-root": "";
    };
}
export declare function useSeparatorRoot(props: SeparatorRootStateProps): SeparatorRootState;
export {};
