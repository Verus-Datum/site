import type { BitsMouseEvent, WithRefProps } from "../../internal/types.js";
type LabelRootStateProps = WithRefProps;
declare class LabelRootState {
    readonly opts: LabelRootStateProps;
    constructor(opts: LabelRootStateProps);
    onmousedown(e: BitsMouseEvent): void;
    props: {
        readonly id: string;
        readonly "data-label-root": "";
        readonly onmousedown: (e: BitsMouseEvent) => void;
    };
}
export declare function setLabelRootState(props: LabelRootStateProps): LabelRootState;
export {};
