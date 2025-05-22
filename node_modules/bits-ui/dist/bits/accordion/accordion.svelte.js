import { afterTick, useRefById } from "svelte-toolbelt";
import { Context, watch } from "runed";
import { getAriaDisabled, getAriaExpanded, getDataDisabled, getDataOpenClosed, getDataOrientation, } from "../../internal/attrs.js";
import { kbd } from "../../internal/kbd.js";
import { useRovingFocus, } from "../../internal/use-roving-focus.svelte.js";
const ACCORDION_ROOT_ATTR = "data-accordion-root";
const ACCORDION_TRIGGER_ATTR = "data-accordion-trigger";
const ACCORDION_CONTENT_ATTR = "data-accordion-content";
const ACCORDION_ITEM_ATTR = "data-accordion-item";
const ACCORDION_HEADER_ATTR = "data-accordion-header";
class AccordionBaseState {
    opts;
    rovingFocusGroup;
    constructor(opts) {
        this.opts = opts;
        useRefById(this.opts);
        this.rovingFocusGroup = useRovingFocus({
            rootNodeId: this.opts.id,
            candidateAttr: ACCORDION_TRIGGER_ATTR,
            loop: this.opts.loop,
            orientation: this.opts.orientation,
        });
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        "data-orientation": getDataOrientation(this.opts.orientation.current),
        "data-disabled": getDataDisabled(this.opts.disabled.current),
        [ACCORDION_ROOT_ATTR]: "",
    }));
}
export class AccordionSingleState extends AccordionBaseState {
    opts;
    isMulti = false;
    constructor(opts) {
        super(opts);
        this.opts = opts;
        this.includesItem = this.includesItem.bind(this);
        this.toggleItem = this.toggleItem.bind(this);
    }
    includesItem(item) {
        return this.opts.value.current === item;
    }
    toggleItem(item) {
        this.opts.value.current = this.includesItem(item) ? "" : item;
    }
}
export class AccordionMultiState extends AccordionBaseState {
    #value;
    isMulti = true;
    constructor(props) {
        super(props);
        this.#value = props.value;
        this.includesItem = this.includesItem.bind(this);
        this.toggleItem = this.toggleItem.bind(this);
    }
    includesItem(item) {
        return this.#value.current.includes(item);
    }
    toggleItem(item) {
        if (this.includesItem(item)) {
            this.#value.current = this.#value.current.filter((v) => v !== item);
        }
        else {
            this.#value.current = [...this.#value.current, item];
        }
    }
}
export class AccordionItemState {
    opts;
    root;
    isActive = $derived.by(() => this.root.includesItem(this.opts.value.current));
    isDisabled = $derived.by(() => this.opts.disabled.current || this.root.opts.disabled.current);
    constructor(opts) {
        this.opts = opts;
        this.root = opts.rootState;
        this.updateValue = this.updateValue.bind(this);
        useRefById({
            ...opts,
            deps: () => this.isActive,
        });
    }
    updateValue() {
        this.root.toggleItem(this.opts.value.current);
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        "data-state": getDataOpenClosed(this.isActive),
        "data-disabled": getDataDisabled(this.isDisabled),
        "data-orientation": getDataOrientation(this.root.opts.orientation.current),
        [ACCORDION_ITEM_ATTR]: "",
    }));
}
class AccordionTriggerState {
    opts;
    itemState;
    #root;
    #isDisabled = $derived.by(() => this.opts.disabled.current ||
        this.itemState.opts.disabled.current ||
        this.#root.opts.disabled.current);
    constructor(opts, itemState) {
        this.opts = opts;
        this.itemState = itemState;
        this.#root = itemState.root;
        this.onkeydown = this.onkeydown.bind(this);
        this.onclick = this.onclick.bind(this);
        useRefById(opts);
    }
    onclick(e) {
        if (this.#isDisabled)
            return;
        if (e.button !== 0)
            return e.preventDefault();
        this.itemState.updateValue();
    }
    onkeydown(e) {
        if (this.#isDisabled)
            return;
        if (e.key === kbd.SPACE || e.key === kbd.ENTER) {
            e.preventDefault();
            this.itemState.updateValue();
            return;
        }
        this.#root.rovingFocusGroup.handleKeydown(this.opts.ref.current, e);
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        disabled: this.#isDisabled,
        "aria-expanded": getAriaExpanded(this.itemState.isActive),
        "aria-disabled": getAriaDisabled(this.#isDisabled),
        "data-disabled": getDataDisabled(this.#isDisabled),
        "data-state": getDataOpenClosed(this.itemState.isActive),
        "data-orientation": getDataOrientation(this.#root.opts.orientation.current),
        [ACCORDION_TRIGGER_ATTR]: "",
        tabindex: 0,
        //
        onclick: this.onclick,
        onkeydown: this.onkeydown,
    }));
}
class AccordionContentState {
    opts;
    item;
    #originalStyles = undefined;
    #isMountAnimationPrevented = false;
    #width = $state(0);
    #height = $state(0);
    present = $derived.by(() => this.opts.forceMount.current || this.item.isActive);
    constructor(opts, item) {
        this.opts = opts;
        this.item = item;
        this.item = item;
        this.#isMountAnimationPrevented = this.item.isActive;
        useRefById(opts);
        $effect.pre(() => {
            const rAF = requestAnimationFrame(() => {
                this.#isMountAnimationPrevented = false;
            });
            return () => {
                cancelAnimationFrame(rAF);
            };
        });
        watch([() => this.present, () => this.opts.ref.current], ([_, node]) => {
            if (!node)
                return;
            afterTick(() => {
                if (!this.opts.ref.current)
                    return;
                // get the dimensions of the element
                this.#originalStyles = this.#originalStyles || {
                    transitionDuration: node.style.transitionDuration,
                    animationName: node.style.animationName,
                };
                // block any animations/transitions so the element renders at full dimensions
                node.style.transitionDuration = "0s";
                node.style.animationName = "none";
                const rect = node.getBoundingClientRect();
                this.#height = rect.height;
                this.#width = rect.width;
                // unblock any animations/transitions that were originally set if not the initial render
                if (!this.#isMountAnimationPrevented) {
                    const { animationName, transitionDuration } = this.#originalStyles;
                    node.style.transitionDuration = transitionDuration;
                    node.style.animationName = animationName;
                }
            });
        });
    }
    snippetProps = $derived.by(() => ({
        open: this.item.isActive,
    }));
    props = $derived.by(() => ({
        id: this.opts.id.current,
        "data-state": getDataOpenClosed(this.item.isActive),
        "data-disabled": getDataDisabled(this.item.isDisabled),
        "data-orientation": getDataOrientation(this.item.root.opts.orientation.current),
        [ACCORDION_CONTENT_ATTR]: "",
        style: {
            "--bits-accordion-content-height": `${this.#height}px`,
            "--bits-accordion-content-width": `${this.#width}px`,
        },
    }));
}
class AccordionHeaderState {
    opts;
    item;
    constructor(opts, item) {
        this.opts = opts;
        this.item = item;
        useRefById(opts);
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        role: "heading",
        "aria-level": this.opts.level.current,
        "data-heading-level": this.opts.level.current,
        "data-state": getDataOpenClosed(this.item.isActive),
        "data-orientation": getDataOrientation(this.item.root.opts.orientation.current),
        [ACCORDION_HEADER_ATTR]: "",
    }));
}
const AccordionRootContext = new Context("Accordion.Root");
const AccordionItemContext = new Context("Accordion.Item");
export function useAccordionRoot(props) {
    const { type, ...rest } = props;
    const rootState = type === "single"
        ? new AccordionSingleState(rest)
        : new AccordionMultiState(rest);
    return AccordionRootContext.set(rootState);
}
export function useAccordionItem(props) {
    const rootState = AccordionRootContext.get();
    return AccordionItemContext.set(new AccordionItemState({ ...props, rootState }));
}
export function useAccordionTrigger(props) {
    return new AccordionTriggerState(props, AccordionItemContext.get());
}
export function useAccordionContent(props) {
    return new AccordionContentState(props, AccordionItemContext.get());
}
export function useAccordionHeader(props) {
    return new AccordionHeaderState(props, AccordionItemContext.get());
}
