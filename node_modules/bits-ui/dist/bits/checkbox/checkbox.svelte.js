import { useRefById } from "svelte-toolbelt";
import { Context, watch } from "runed";
import { getAriaChecked, getAriaRequired, getDataDisabled } from "../../internal/attrs.js";
import { kbd } from "../../internal/kbd.js";
const CHECKBOX_ROOT_ATTR = "data-checkbox-root";
const CHECKBOX_GROUP_ATTR = "data-checkbox-group";
const CHECKBOX_GROUP_LABEL_ATTR = "data-checkbox-group-label";
class CheckboxGroupState {
    opts;
    labelId = $state(undefined);
    constructor(opts) {
        this.opts = opts;
        useRefById(opts);
    }
    addValue(checkboxValue) {
        if (!checkboxValue)
            return;
        if (!this.opts.value.current.includes(checkboxValue)) {
            const newValue = [...$state.snapshot(this.opts.value.current), checkboxValue];
            this.opts.value.current = newValue;
            this.opts.onValueChange.current(newValue);
        }
    }
    removeValue(checkboxValue) {
        if (!checkboxValue)
            return;
        const index = this.opts.value.current.indexOf(checkboxValue);
        if (index === -1)
            return;
        const newValue = this.opts.value.current.filter((v) => v !== checkboxValue);
        this.opts.value.current = newValue;
        this.opts.onValueChange.current(newValue);
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        role: "group",
        "aria-labelledby": this.labelId,
        "data-disabled": getDataDisabled(this.opts.disabled.current),
        [CHECKBOX_GROUP_ATTR]: "",
    }));
}
class CheckboxGroupLabelState {
    opts;
    group;
    constructor(opts, group) {
        this.opts = opts;
        this.group = group;
        useRefById({
            ...opts,
            onRefChange: (node) => {
                if (node) {
                    group.labelId = node.id;
                }
                else {
                    group.labelId = undefined;
                }
            },
        });
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        "data-disabled": getDataDisabled(this.group.opts.disabled.current),
        [CHECKBOX_GROUP_LABEL_ATTR]: "",
    }));
}
class CheckboxRootState {
    opts;
    group;
    trueName = $derived.by(() => {
        if (this.group && this.group.opts.name.current) {
            return this.group.opts.name.current;
        }
        else {
            return this.opts.name.current;
        }
    });
    trueRequired = $derived.by(() => {
        if (this.group && this.group.opts.required.current) {
            return true;
        }
        return this.opts.required.current;
    });
    trueDisabled = $derived.by(() => {
        if (this.group && this.group.opts.disabled.current) {
            return true;
        }
        return this.opts.disabled.current;
    });
    constructor(opts, group = null) {
        this.opts = opts;
        this.group = group;
        this.onkeydown = this.onkeydown.bind(this);
        this.onclick = this.onclick.bind(this);
        useRefById(opts);
        watch.pre([() => $state.snapshot(this.group?.opts.value.current), () => this.opts.value.current], ([groupValue, value]) => {
            if (!groupValue || !value)
                return;
            this.opts.checked.current = groupValue.includes(value);
        });
        watch.pre(() => this.opts.checked.current, (checked) => {
            if (!this.group)
                return;
            if (checked) {
                this.group?.addValue(this.opts.value.current);
            }
            else {
                this.group?.removeValue(this.opts.value.current);
            }
        });
    }
    onkeydown(e) {
        if (this.opts.disabled.current)
            return;
        if (e.key === kbd.ENTER)
            e.preventDefault();
        if (e.key === kbd.SPACE) {
            e.preventDefault();
            this.#toggle();
        }
    }
    #toggle() {
        if (this.opts.indeterminate.current) {
            this.opts.indeterminate.current = false;
            this.opts.checked.current = true;
        }
        else {
            this.opts.checked.current = !this.opts.checked.current;
        }
    }
    onclick(_) {
        if (this.opts.disabled.current)
            return;
        this.#toggle();
    }
    snippetProps = $derived.by(() => ({
        checked: this.opts.checked.current,
        indeterminate: this.opts.indeterminate.current,
    }));
    props = $derived.by(() => ({
        id: this.opts.id.current,
        role: "checkbox",
        type: this.opts.type.current,
        disabled: this.trueDisabled,
        "aria-checked": getAriaChecked(this.opts.checked.current, this.opts.indeterminate.current),
        "aria-required": getAriaRequired(this.trueRequired),
        "data-disabled": getDataDisabled(this.trueDisabled),
        "data-state": getCheckboxDataState(this.opts.checked.current, this.opts.indeterminate.current),
        [CHECKBOX_ROOT_ATTR]: "",
        //
        onclick: this.onclick,
        onkeydown: this.onkeydown,
    }));
}
//
// INPUT
//
class CheckboxInputState {
    root;
    trueChecked = $derived.by(() => {
        if (this.root.group) {
            if (this.root.opts.value.current !== undefined &&
                this.root.group.opts.value.current.includes(this.root.opts.value.current)) {
                return true;
            }
            return false;
        }
        return this.root.opts.checked.current;
    });
    shouldRender = $derived.by(() => Boolean(this.root.trueName));
    constructor(root) {
        this.root = root;
    }
    props = $derived.by(() => ({
        type: "checkbox",
        checked: this.root.opts.checked.current === true,
        disabled: this.root.trueDisabled,
        required: this.root.trueRequired,
        name: this.root.trueName,
        value: this.root.opts.value.current,
    }));
}
function getCheckboxDataState(checked, indeterminate) {
    if (indeterminate)
        return "indeterminate";
    return checked ? "checked" : "unchecked";
}
export const CheckboxGroupContext = new Context("Checkbox.Group");
const CheckboxRootContext = new Context("Checkbox.Root");
export function useCheckboxGroup(props) {
    return CheckboxGroupContext.set(new CheckboxGroupState(props));
}
export function useCheckboxRoot(props, group) {
    return CheckboxRootContext.set(new CheckboxRootState(props, group));
}
export function useCheckboxGroupLabel(props) {
    return new CheckboxGroupLabelState(props, CheckboxGroupContext.get());
}
export function useCheckboxInput() {
    return new CheckboxInputState(CheckboxRootContext.get());
}
