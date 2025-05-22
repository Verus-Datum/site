import { useRefById } from "svelte-toolbelt";
import { Context, watch } from "runed";
import { getAriaChecked, getAriaRequired, getDataDisabled } from "../../internal/attrs.js";
import { useRovingFocus, } from "../../internal/use-roving-focus.svelte.js";
import { kbd } from "../../internal/kbd.js";
const RADIO_GROUP_ROOT_ATTR = "data-radio-group-root";
const RADIO_GROUP_ITEM_ATTR = "data-radio-group-item";
class RadioGroupRootState {
    opts;
    rovingFocusGroup;
    hasValue = $derived.by(() => this.opts.value.current !== "");
    constructor(opts) {
        this.opts = opts;
        this.rovingFocusGroup = useRovingFocus({
            rootNodeId: this.opts.id,
            candidateAttr: RADIO_GROUP_ITEM_ATTR,
            loop: this.opts.loop,
            orientation: this.opts.orientation,
        });
        useRefById({
            id: this.opts.id,
            ref: this.opts.ref,
        });
    }
    isChecked(value) {
        return this.opts.value.current === value;
    }
    setValue(value) {
        this.opts.value.current = value;
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        role: "radiogroup",
        "aria-required": getAriaRequired(this.opts.required.current),
        "data-disabled": getDataDisabled(this.opts.disabled.current),
        "data-orientation": this.opts.orientation.current,
        [RADIO_GROUP_ROOT_ATTR]: "",
    }));
}
class RadioGroupItemState {
    opts;
    root;
    checked = $derived.by(() => this.root.opts.value.current === this.opts.value.current);
    #isDisabled = $derived.by(() => this.opts.disabled.current || this.root.opts.disabled.current);
    #isChecked = $derived.by(() => this.root.isChecked(this.opts.value.current));
    #tabIndex = $state(-1);
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        useRefById(opts);
        if (this.opts.value.current === this.root.opts.value.current) {
            this.root.rovingFocusGroup.setCurrentTabStopId(this.opts.id.current);
            this.#tabIndex = 0;
        }
        else if (!this.root.opts.value.current) {
            this.#tabIndex = 0;
        }
        $effect(() => {
            this.#tabIndex = this.root.rovingFocusGroup.getTabIndex(this.opts.ref.current);
        });
        watch([() => this.opts.value.current, () => this.root.opts.value.current], () => {
            if (this.opts.value.current === this.root.opts.value.current) {
                this.root.rovingFocusGroup.setCurrentTabStopId(this.opts.id.current);
                this.#tabIndex = 0;
            }
        });
        this.onclick = this.onclick.bind(this);
        this.onkeydown = this.onkeydown.bind(this);
        this.onfocus = this.onfocus.bind(this);
    }
    onclick(_) {
        if (this.opts.disabled.current)
            return;
        this.root.setValue(this.opts.value.current);
    }
    onfocus(_) {
        if (!this.root.hasValue)
            return;
        this.root.setValue(this.opts.value.current);
    }
    onkeydown(e) {
        if (this.#isDisabled)
            return;
        if (e.key === kbd.SPACE) {
            e.preventDefault();
            this.root.setValue(this.opts.value.current);
            return;
        }
        this.root.rovingFocusGroup.handleKeydown(this.opts.ref.current, e, true);
    }
    snippetProps = $derived.by(() => ({ checked: this.#isChecked }));
    props = $derived.by(() => ({
        id: this.opts.id.current,
        disabled: this.#isDisabled ? true : undefined,
        "data-value": this.opts.value.current,
        "data-orientation": this.root.opts.orientation.current,
        "data-disabled": getDataDisabled(this.#isDisabled),
        "data-state": this.#isChecked ? "checked" : "unchecked",
        "aria-checked": getAriaChecked(this.#isChecked, false),
        [RADIO_GROUP_ITEM_ATTR]: "",
        type: "button",
        role: "radio",
        tabindex: this.#tabIndex,
        //
        onkeydown: this.onkeydown,
        onfocus: this.onfocus,
        onclick: this.onclick,
    }));
}
//
// INPUT
//
class RadioGroupInputState {
    root;
    shouldRender = $derived.by(() => this.root.opts.name.current !== undefined);
    props = $derived.by(() => ({
        name: this.root.opts.name.current,
        value: this.root.opts.value.current,
        required: this.root.opts.required.current,
        disabled: this.root.opts.disabled.current,
    }));
    constructor(root) {
        this.root = root;
    }
}
const RadioGroupRootContext = new Context("RadioGroup.Root");
export function useRadioGroupRoot(props) {
    return RadioGroupRootContext.set(new RadioGroupRootState(props));
}
export function useRadioGroupItem(props) {
    return new RadioGroupItemState(props, RadioGroupRootContext.get());
}
export function useRadioGroupInput() {
    return new RadioGroupInputState(RadioGroupRootContext.get());
}
