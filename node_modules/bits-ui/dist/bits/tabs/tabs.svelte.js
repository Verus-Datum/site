import { SvelteMap } from "svelte/reactivity";
import { useRefById } from "svelte-toolbelt";
import { Context, watch } from "runed";
import { getAriaOrientation, getAriaSelected, getDataDisabled, getDataOrientation, getDisabled, getHidden, } from "../../internal/attrs.js";
import { kbd } from "../../internal/kbd.js";
import { useRovingFocus, } from "../../internal/use-roving-focus.svelte.js";
const TABS_ROOT_ATTR = "data-tabs-root";
const TABS_LIST_ATTR = "data-tabs-list";
const TABS_TRIGGER_ATTR = "data-tabs-trigger";
const TABS_CONTENT_ATTR = "data-tabs-content";
class TabsRootState {
    opts;
    rovingFocusGroup;
    triggerIds = $state([]);
    // holds the trigger ID for each value to associate it with the content
    valueToTriggerId = new SvelteMap();
    // holds the content ID for each value to associate it with the trigger
    valueToContentId = new SvelteMap();
    constructor(opts) {
        this.opts = opts;
        useRefById(opts);
        this.rovingFocusGroup = useRovingFocus({
            candidateAttr: TABS_TRIGGER_ATTR,
            rootNodeId: this.opts.id,
            loop: this.opts.loop,
            orientation: this.opts.orientation,
        });
    }
    registerTrigger(id, value) {
        this.triggerIds.push(id);
        this.valueToTriggerId.set(value, id);
        // returns the deregister function
        return () => {
            this.triggerIds = this.triggerIds.filter((triggerId) => triggerId !== id);
            this.valueToTriggerId.delete(value);
        };
    }
    registerContent(id, value) {
        this.valueToContentId.set(value, id);
        // returns the deregister function
        return () => {
            this.valueToContentId.delete(value);
        };
    }
    setValue(v) {
        this.opts.value.current = v;
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        "data-orientation": getDataOrientation(this.opts.orientation.current),
        [TABS_ROOT_ATTR]: "",
    }));
}
class TabsListState {
    opts;
    root;
    #isDisabled = $derived.by(() => this.root.opts.disabled.current);
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        useRefById(opts);
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        role: "tablist",
        "aria-orientation": getAriaOrientation(this.root.opts.orientation.current),
        "data-orientation": getDataOrientation(this.root.opts.orientation.current),
        [TABS_LIST_ATTR]: "",
        "data-disabled": getDataDisabled(this.#isDisabled),
    }));
}
class TabsTriggerState {
    opts;
    root;
    #isActive = $derived.by(() => this.root.opts.value.current === this.opts.value.current);
    #isDisabled = $derived.by(() => this.opts.disabled.current || this.root.opts.disabled.current);
    #tabIndex = $state(0);
    #ariaControls = $derived.by(() => this.root.valueToContentId.get(this.opts.value.current));
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        useRefById(opts);
        watch([() => this.opts.id.current, () => this.opts.value.current], ([id, value]) => {
            return this.root.registerTrigger(id, value);
        });
        $effect(() => {
            this.root.triggerIds.length;
            if (this.#isActive || !this.root.opts.value.current) {
                this.#tabIndex = 0;
            }
            else {
                this.#tabIndex = -1;
            }
        });
        this.onfocus = this.onfocus.bind(this);
        this.onclick = this.onclick.bind(this);
        this.onkeydown = this.onkeydown.bind(this);
    }
    #activate() {
        if (this.root.opts.value.current === this.opts.value.current)
            return;
        this.root.setValue(this.opts.value.current);
    }
    onfocus(_) {
        if (this.root.opts.activationMode.current !== "automatic" || this.#isDisabled)
            return;
        this.#activate();
    }
    onclick(_) {
        if (this.#isDisabled)
            return;
        this.#activate();
    }
    onkeydown(e) {
        if (this.#isDisabled)
            return;
        if (e.key === kbd.SPACE || e.key === kbd.ENTER) {
            e.preventDefault();
            this.#activate();
            return;
        }
        this.root.rovingFocusGroup.handleKeydown(this.opts.ref.current, e);
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        role: "tab",
        "data-state": getTabDataState(this.#isActive),
        "data-value": this.opts.value.current,
        "data-orientation": getDataOrientation(this.root.opts.orientation.current),
        "data-disabled": getDataDisabled(this.#isDisabled),
        "aria-selected": getAriaSelected(this.#isActive),
        "aria-controls": this.#ariaControls,
        [TABS_TRIGGER_ATTR]: "",
        disabled: getDisabled(this.#isDisabled),
        tabindex: this.#tabIndex,
        //
        onclick: this.onclick,
        onfocus: this.onfocus,
        onkeydown: this.onkeydown,
    }));
}
class TabsContentState {
    opts;
    root;
    #isActive = $derived.by(() => this.root.opts.value.current === this.opts.value.current);
    #ariaLabelledBy = $derived.by(() => this.root.valueToTriggerId.get(this.opts.value.current));
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        useRefById(opts);
        watch([() => this.opts.id.current, () => this.opts.value.current], ([id, value]) => {
            return this.root.registerContent(id, value);
        });
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        role: "tabpanel",
        hidden: getHidden(!this.#isActive),
        tabindex: 0,
        "data-value": this.opts.value.current,
        "data-state": getTabDataState(this.#isActive),
        "aria-labelledby": this.#ariaLabelledBy,
        [TABS_CONTENT_ATTR]: "",
    }));
}
const TabsRootContext = new Context("Tabs.Root");
export function useTabsRoot(props) {
    return TabsRootContext.set(new TabsRootState(props));
}
export function useTabsTrigger(props) {
    return new TabsTriggerState(props, TabsRootContext.get());
}
export function useTabsList(props) {
    return new TabsListState(props, TabsRootContext.get());
}
export function useTabsContent(props) {
    return new TabsContentState(props, TabsRootContext.get());
}
function getTabDataState(condition) {
    return condition ? "active" : "inactive";
}
