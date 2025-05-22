import type { PopperLayerImplProps } from "./types.js";
type $$ComponentProps = Omit<PopperLayerImplProps, "present" | "children"> & {
    enabled: boolean;
};
declare const PopperLayerInner: import("svelte").Component<$$ComponentProps, {}, "">;
type PopperLayerInner = ReturnType<typeof PopperLayerInner>;
export default PopperLayerInner;
