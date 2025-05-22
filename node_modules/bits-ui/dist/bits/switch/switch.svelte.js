import { useRefById } from "svelte-toolbelt";
import { Context } from "runed";
import { getAriaChecked, getAriaRequired, getDataChecked, getDataDisabled, getDataRequired, getDisabled, } from "../../internal/attrs.js";
import { kbd } from "../../internal/kbd.js";
const SWITCH_ROOT_ATTR = "data-switch-root";
const SWITCH_THUMB_ATTR = "data-switch-thumb";
class SwitchRootState {
    opts;
    constructor(opts) {
        this.opts = opts;
        useRefById(opts);
        this.onkeydown = this.onkeydown.bind(this);
        this.onclick = this.onclick.bind(this);
    }
    #toggle() {
        this.opts.checked.current = !this.opts.checked.current;
    }
    onkeydown(e) {
        if (!(e.key === kbd.ENTER || e.key === kbd.SPACE) || this.opts.disabled.current)
            return;
        e.preventDefault();
        this.#toggle();
    }
    onclick(_) {
        if (this.opts.disabled.current)
            return;
        this.#toggle();
    }
    sharedProps = $derived.by(() => ({
        "data-disabled": getDataDisabled(this.opts.disabled.current),
        "data-state": getDataChecked(this.opts.checked.current),
        "data-required": getDataRequired(this.opts.required.current),
    }));
    snippetProps = $derived.by(() => ({
        checked: this.opts.checked.current,
    }));
    props = $derived.by(() => ({
        ...this.sharedProps,
        id: this.opts.id.current,
        role: "switch",
        disabled: getDisabled(this.opts.disabled.current),
        "aria-checked": getAriaChecked(this.opts.checked.current, false),
        "aria-required": getAriaRequired(this.opts.required.current),
        [SWITCH_ROOT_ATTR]: "",
        //
        onclick: this.onclick,
        onkeydown: this.onkeydown,
    }));
}
class SwitchInputState {
    root;
    shouldRender = $derived.by(() => this.root.opts.name.current !== undefined);
    constructor(root) {
        this.root = root;
    }
    props = $derived.by(() => ({
        type: "checkbox",
        name: this.root.opts.name.current,
        value: this.root.opts.value.current,
        checked: this.root.opts.checked.current,
        disabled: this.root.opts.disabled.current,
        required: this.root.opts.required.current,
    }));
}
class SwitchThumbState {
    opts;
    root;
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        useRefById(opts);
    }
    snippetProps = $derived.by(() => ({
        checked: this.root.opts.checked.current,
    }));
    props = $derived.by(() => ({
        ...this.root.sharedProps,
        id: this.opts.id.current,
        [SWITCH_THUMB_ATTR]: "",
    }));
}
const SwitchRootContext = new Context("Switch.Root");
export function useSwitchRoot(props) {
    return SwitchRootContext.set(new SwitchRootState(props));
}
export function useSwitchInput() {
    return new SwitchInputState(SwitchRootContext.get());
}
export function useSwitchThumb(props) {
    return new SwitchThumbState(props, SwitchRootContext.get());
}
