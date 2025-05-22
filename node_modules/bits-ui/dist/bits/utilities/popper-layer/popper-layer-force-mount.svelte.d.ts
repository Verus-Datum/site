import type { PopperLayerImplProps } from "./types.js";
type $$ComponentProps = Omit<PopperLayerImplProps, "present"> & {
    enabled: boolean;
};
declare const PopperLayerForceMount: import("svelte").Component<$$ComponentProps, {}, "">;
type PopperLayerForceMount = ReturnType<typeof PopperLayerForceMount>;
export default PopperLayerForceMount;
