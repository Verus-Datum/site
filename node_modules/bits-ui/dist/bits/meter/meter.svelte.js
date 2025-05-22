import { useRefById } from "svelte-toolbelt";
const METER_ROOT_ATTR = "data-meter-root";
class MeterRootState {
    opts;
    constructor(opts) {
        this.opts = opts;
        useRefById(opts);
    }
    props = $derived.by(() => ({
        role: "meter",
        value: this.opts.value.current,
        "aria-valuemin": this.opts.min.current,
        "aria-valuemax": this.opts.max.current,
        "aria-valuenow": this.opts.value.current,
        "data-value": this.opts.value.current,
        "data-max": this.opts.max.current,
        "data-min": this.opts.min.current,
        [METER_ROOT_ATTR]: "",
    }));
}
export function useMeterRootState(props) {
    return new MeterRootState(props);
}
