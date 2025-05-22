import { useRefById } from "svelte-toolbelt";
const ROOT_ATTR = "data-label-root";
class LabelRootState {
    opts;
    constructor(opts) {
        this.opts = opts;
        this.onmousedown = this.onmousedown.bind(this);
        useRefById(opts);
    }
    onmousedown(e) {
        if (e.detail > 1)
            e.preventDefault();
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        [ROOT_ATTR]: "",
        onmousedown: this.onmousedown,
    }));
}
export function setLabelRootState(props) {
    return new LabelRootState(props);
}
