import { useRefById } from "svelte-toolbelt";
const ASPECT_RATIO_ROOT_ATTR = "data-aspect-ratio-root";
class AspectRatioRootState {
    opts;
    constructor(opts) {
        this.opts = opts;
        useRefById(opts);
    }
    wrapperProps = $derived.by(() => ({
        style: {
            position: "relative",
            width: "100%",
            paddingBottom: `${this.opts.ratio.current ? 100 / this.opts.ratio.current : 0}%}`,
        },
    }));
    props = $derived.by(() => ({
        id: this.opts.id.current,
        style: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
        [ASPECT_RATIO_ROOT_ATTR]: "",
    }));
}
export function useAspectRatioRoot(props) {
    return new AspectRatioRootState(props);
}
