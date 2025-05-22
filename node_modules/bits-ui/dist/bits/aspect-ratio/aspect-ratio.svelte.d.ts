import type { ReadableBoxedValues } from "../../internal/box.svelte.js";
import type { WithRefProps } from "../../internal/types.js";
type AspectRatioRootStateProps = WithRefProps<ReadableBoxedValues<{
    ratio: number;
}>>;
declare class AspectRatioRootState {
    readonly opts: AspectRatioRootStateProps;
    constructor(opts: AspectRatioRootStateProps);
    wrapperProps: {
        style: {
            position: string;
            width: string;
            paddingBottom: string;
        };
    };
    props: {
        readonly id: string;
        readonly style: {
            readonly position: "absolute";
            readonly top: 0;
            readonly right: 0;
            readonly bottom: 0;
            readonly left: 0;
        };
        readonly "data-aspect-ratio-root": "";
    };
}
export declare function useAspectRatioRoot(props: AspectRatioRootStateProps): AspectRatioRootState;
export {};
