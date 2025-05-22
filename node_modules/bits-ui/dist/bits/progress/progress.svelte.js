import { useRefById } from "svelte-toolbelt";
const ROOT_ATTR = "data-progress-root";
class ProgressRootState {
    opts;
    constructor(opts) {
        this.opts = opts;
        useRefById(opts);
    }
    props = $derived.by(() => ({
        role: "progressbar",
        value: this.opts.value.current,
        "aria-valuemin": this.opts.min.current,
        "aria-valuemax": this.opts.max.current,
        "aria-valuenow": this.opts.value.current === null ? undefined : this.opts.value.current,
        "data-value": this.opts.value.current === null ? undefined : this.opts.value.current,
        "data-state": getProgressDataState(this.opts.value.current, this.opts.max.current),
        "data-max": this.opts.max.current,
        "data-min": this.opts.min.current,
        "data-indeterminate": this.opts.value.current === null ? "" : undefined,
        [ROOT_ATTR]: "",
    }));
}
function getProgressDataState(value, max) {
    if (value === null)
        return "indeterminate";
    return value === max ? "loaded" : "loading";
}
export function useProgressRootState(props) {
    return new ProgressRootState(props);
}
