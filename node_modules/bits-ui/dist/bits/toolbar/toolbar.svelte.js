import { useRefById } from "svelte-toolbelt";
import { Context } from "runed";
import { getAriaChecked, getAriaPressed, getDataDisabled, getDataOrientation, getDisabled, } from "../../internal/attrs.js";
import { kbd } from "../../internal/kbd.js";
import { useRovingFocus, } from "../../internal/use-roving-focus.svelte.js";
const TOOLBAR_ROOT_ATTR = "data-toolbar-root";
// all links, buttons, and items must have the ITEM_ATTR for roving focus
const TOOLBAR_ITEM_ATTR = "data-toolbar-item";
const TOOLBAR_GROUP_ATTR = "data-toolbar-group";
const TOOLBAR_GROUP_ITEM_ATTR = "data-toolbar-group-item";
const TOOLBAR_LINK_ATTR = "data-toolbar-link";
const TOOLBAR_BUTTON_ATTR = "data-toolbar-button";
class ToolbarRootState {
    opts;
    rovingFocusGroup;
    constructor(opts) {
        this.opts = opts;
        useRefById(opts);
        this.rovingFocusGroup = useRovingFocus({
            orientation: this.opts.orientation,
            loop: this.opts.loop,
            rootNodeId: this.opts.id,
            candidateAttr: TOOLBAR_ITEM_ATTR,
        });
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        role: "toolbar",
        "data-orientation": this.opts.orientation.current,
        [TOOLBAR_ROOT_ATTR]: "",
    }));
}
class ToolbarGroupBaseState {
    opts;
    root;
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        useRefById(opts);
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        [TOOLBAR_GROUP_ATTR]: "",
        role: "group",
        "data-orientation": getDataOrientation(this.root.opts.orientation.current),
        "data-disabled": getDataDisabled(this.opts.disabled.current),
    }));
}
class ToolbarGroupSingleState extends ToolbarGroupBaseState {
    opts;
    root;
    isMulti = false;
    anyPressed = $derived.by(() => this.opts.value.current !== "");
    constructor(opts, root) {
        super(opts, root);
        this.opts = opts;
        this.root = root;
    }
    includesItem(item) {
        return this.opts.value.current === item;
    }
    toggleItem(item) {
        if (this.includesItem(item)) {
            this.opts.value.current = "";
        }
        else {
            this.opts.value.current = item;
        }
    }
}
class ToolbarGroupMultipleState extends ToolbarGroupBaseState {
    opts;
    root;
    isMulti = true;
    anyPressed = $derived.by(() => this.opts.value.current.length > 0);
    constructor(opts, root) {
        super(opts, root);
        this.opts = opts;
        this.root = root;
    }
    includesItem(item) {
        return this.opts.value.current.includes(item);
    }
    toggleItem(item) {
        if (this.includesItem(item)) {
            this.opts.value.current = this.opts.value.current.filter((v) => v !== item);
        }
        else {
            this.opts.value.current = [...this.opts.value.current, item];
        }
    }
}
class ToolbarGroupItemState {
    opts;
    group;
    root;
    #isDisabled = $derived.by(() => this.opts.disabled.current || this.group.opts.disabled.current);
    constructor(opts, group, root) {
        this.opts = opts;
        this.group = group;
        this.root = root;
        useRefById(opts);
        $effect(() => {
            this.#tabIndex = this.root.rovingFocusGroup.getTabIndex(this.opts.ref.current);
        });
        this.onclick = this.onclick.bind(this);
        this.onkeydown = this.onkeydown.bind(this);
    }
    #toggleItem() {
        if (this.#isDisabled)
            return;
        this.group.toggleItem(this.opts.value.current);
    }
    onclick(_) {
        if (this.#isDisabled)
            return;
        this.#toggleItem();
    }
    onkeydown(e) {
        if (this.#isDisabled)
            return;
        if (e.key === kbd.ENTER || e.key === kbd.SPACE) {
            e.preventDefault();
            this.#toggleItem();
            return;
        }
        this.root.rovingFocusGroup.handleKeydown(this.opts.ref.current, e);
    }
    isPressed = $derived.by(() => this.group.includesItem(this.opts.value.current));
    #ariaChecked = $derived.by(() => {
        return this.group.isMulti ? undefined : getAriaChecked(this.isPressed, false);
    });
    #ariaPressed = $derived.by(() => {
        return this.group.isMulti ? getAriaPressed(this.isPressed) : undefined;
    });
    #tabIndex = $state(0);
    props = $derived.by(() => ({
        id: this.opts.id.current,
        role: this.group.isMulti ? undefined : "radio",
        tabindex: this.#tabIndex,
        "data-orientation": getDataOrientation(this.root.opts.orientation.current),
        "data-disabled": getDataDisabled(this.#isDisabled),
        "data-state": getToggleItemDataState(this.isPressed),
        "data-value": this.opts.value.current,
        "aria-pressed": this.#ariaPressed,
        "aria-checked": this.#ariaChecked,
        [TOOLBAR_ITEM_ATTR]: "",
        [TOOLBAR_GROUP_ITEM_ATTR]: "",
        disabled: getDisabled(this.#isDisabled),
        //
        onclick: this.onclick,
        onkeydown: this.onkeydown,
    }));
}
class ToolbarLinkState {
    opts;
    root;
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        useRefById(opts);
        $effect(() => {
            this.#tabIndex = this.root.rovingFocusGroup.getTabIndex(this.opts.ref.current);
        });
        this.onkeydown = this.onkeydown.bind(this);
    }
    onkeydown(e) {
        this.root.rovingFocusGroup.handleKeydown(this.opts.ref.current, e);
    }
    #role = $derived.by(() => {
        if (!this.opts.ref.current)
            return undefined;
        const tagName = this.opts.ref.current.tagName;
        if (tagName !== "A")
            return "link";
        return undefined;
    });
    #tabIndex = $state(0);
    props = $derived.by(() => ({
        id: this.opts.id.current,
        [TOOLBAR_LINK_ATTR]: "",
        [TOOLBAR_ITEM_ATTR]: "",
        role: this.#role,
        tabindex: this.#tabIndex,
        "data-orientation": getDataOrientation(this.root.opts.orientation.current),
        //
        onkeydown: this.onkeydown,
    }));
}
class ToolbarButtonState {
    opts;
    root;
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        useRefById(opts);
        $effect(() => {
            this.#tabIndex = this.root.rovingFocusGroup.getTabIndex(this.opts.ref.current);
        });
        this.onkeydown = this.onkeydown.bind(this);
    }
    onkeydown(e) {
        this.root.rovingFocusGroup.handleKeydown(this.opts.ref.current, e);
    }
    #tabIndex = $state(0);
    #role = $derived.by(() => {
        if (!this.opts.ref.current)
            return undefined;
        const tagName = this.opts.ref.current.tagName;
        if (tagName !== "BUTTON")
            return "button";
        return undefined;
    });
    props = $derived.by(() => ({
        id: this.opts.id.current,
        [TOOLBAR_ITEM_ATTR]: "",
        [TOOLBAR_BUTTON_ATTR]: "",
        role: this.#role,
        tabindex: this.#tabIndex,
        "data-disabled": getDataDisabled(this.opts.disabled.current),
        "data-orientation": getDataOrientation(this.root.opts.orientation.current),
        disabled: getDisabled(this.opts.disabled.current),
        //
        onkeydown: this.onkeydown,
    }));
}
//
// HELPERS
//
function getToggleItemDataState(condition) {
    return condition ? "on" : "off";
}
const ToolbarRootContext = new Context("Toolbar.Root");
const ToolbarGroupContext = new Context("Toolbar.Group");
export function useToolbarRoot(props) {
    return ToolbarRootContext.set(new ToolbarRootState(props));
}
export function useToolbarGroup(props) {
    const { type, ...rest } = props;
    const rootState = ToolbarRootContext.get();
    const groupState = type === "single"
        ? new ToolbarGroupSingleState(rest, rootState)
        : new ToolbarGroupMultipleState(rest, rootState);
    return ToolbarGroupContext.set(groupState);
}
export function useToolbarGroupItem(props) {
    const group = ToolbarGroupContext.get();
    return new ToolbarGroupItemState(props, group, group.root);
}
export function useToolbarButton(props) {
    return new ToolbarButtonState(props, ToolbarRootContext.get());
}
export function useToolbarLink(props) {
    return new ToolbarLinkState(props, ToolbarRootContext.get());
}
