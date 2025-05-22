import { useRefById } from "svelte-toolbelt";
import { getAriaPressed, getDataDisabled, getDisabled } from "../../internal/attrs.js";
const TOGGLE_ROOT_ATTR = "data-toggle-root";
class ToggleRootState {
    opts;
    constructor(opts) {
        this.opts = opts;
        useRefById(opts);
        this.onclick = this.onclick.bind(this);
    }
    #togglePressed() {
        if (!this.opts.disabled.current) {
            this.opts.pressed.current = !this.opts.pressed.current;
        }
    }
    onclick(_) {
        if (this.opts.disabled.current)
            return;
        this.#togglePressed();
    }
    snippetProps = $derived.by(() => ({
        pressed: this.opts.pressed.current,
    }));
    props = $derived.by(() => ({
        [TOGGLE_ROOT_ATTR]: "",
        id: this.opts.id.current,
        "data-disabled": getDataDisabled(this.opts.disabled.current),
        "aria-pressed": getAriaPressed(this.opts.pressed.current),
        "data-state": getToggleDataState(this.opts.pressed.current),
        disabled: getDisabled(this.opts.disabled.current),
        onclick: this.onclick,
    }));
}
export function useToggleRoot(props) {
    return new ToggleRootState(props);
}
export function getToggleDataState(condition) {
    return condition ? "on" : "off";
}
