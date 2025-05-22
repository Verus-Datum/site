import { useRefById } from "svelte-toolbelt";
import { getAriaHidden, getAriaOrientation, getDataOrientation } from "../../internal/attrs.js";
const SEPARATOR_ROOT_ATTR = "data-separator-root";
class SeparatorRootState {
    opts;
    constructor(opts) {
        this.opts = opts;
        useRefById(opts);
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        role: this.opts.decorative.current ? "none" : "separator",
        "aria-orientation": getAriaOrientation(this.opts.orientation.current),
        "aria-hidden": getAriaHidden(this.opts.decorative.current),
        "data-orientation": getDataOrientation(this.opts.orientation.current),
        [SEPARATOR_ROOT_ATTR]: "",
    }));
}
export function useSeparatorRoot(props) {
    return new SeparatorRootState(props);
}
