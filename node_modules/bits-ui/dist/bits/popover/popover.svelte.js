import { useRefById } from "svelte-toolbelt";
import { Context } from "runed";
import { kbd } from "../../internal/kbd.js";
import { getAriaExpanded, getDataOpenClosed } from "../../internal/attrs.js";
import { isElement } from "../../internal/is.js";
class PopoverRootState {
    opts;
    contentNode = $state(null);
    triggerNode = $state(null);
    constructor(opts) {
        this.opts = opts;
    }
    toggleOpen() {
        this.opts.open.current = !this.opts.open.current;
    }
    handleClose() {
        if (!this.opts.open.current)
            return;
        this.opts.open.current = false;
    }
}
class PopoverTriggerState {
    opts;
    root;
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        useRefById({
            ...opts,
            onRefChange: (node) => {
                this.root.triggerNode = node;
            },
        });
        this.onclick = this.onclick.bind(this);
        this.onkeydown = this.onkeydown.bind(this);
    }
    onclick(e) {
        if (this.opts.disabled.current)
            return;
        if (e.button !== 0)
            return;
        this.root.toggleOpen();
    }
    onkeydown(e) {
        if (this.opts.disabled.current)
            return;
        if (!(e.key === kbd.ENTER || e.key === kbd.SPACE))
            return;
        e.preventDefault();
        this.root.toggleOpen();
    }
    #getAriaControls() {
        if (this.root.opts.open.current && this.root.contentNode?.id) {
            return this.root.contentNode?.id;
        }
        return undefined;
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        "aria-haspopup": "dialog",
        "aria-expanded": getAriaExpanded(this.root.opts.open.current),
        "data-state": getDataOpenClosed(this.root.opts.open.current),
        "aria-controls": this.#getAriaControls(),
        "data-popover-trigger": "",
        disabled: this.opts.disabled.current,
        //
        onkeydown: this.onkeydown,
        onclick: this.onclick,
    }));
}
class PopoverContentState {
    opts;
    root;
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        useRefById({
            ...opts,
            deps: () => this.root.opts.open.current,
            onRefChange: (node) => {
                this.root.contentNode = node;
            },
        });
    }
    onInteractOutside = (e) => {
        this.opts.onInteractOutside.current(e);
        if (e.defaultPrevented)
            return;
        if (!isElement(e.target))
            return;
        const closestTrigger = e.target.closest(`[data-popover-trigger]`);
        if (closestTrigger === this.root.triggerNode)
            return;
        this.root.handleClose();
    };
    onEscapeKeydown = (e) => {
        this.opts.onEscapeKeydown.current(e);
        if (e.defaultPrevented)
            return;
        this.root.handleClose();
    };
    onCloseAutoFocus = (e) => {
        this.opts.onCloseAutoFocus.current(e);
        if (e.defaultPrevented)
            return;
        e.preventDefault();
        this.root.triggerNode?.focus();
    };
    snippetProps = $derived.by(() => ({ open: this.root.opts.open.current }));
    props = $derived.by(() => ({
        id: this.opts.id.current,
        tabindex: -1,
        "data-state": getDataOpenClosed(this.root.opts.open.current),
        "data-popover-content": "",
        style: {
            pointerEvents: "auto",
        },
    }));
    popperProps = {
        onInteractOutside: this.onInteractOutside,
        onEscapeKeydown: this.onEscapeKeydown,
        onCloseAutoFocus: this.onCloseAutoFocus,
    };
}
class PopoverCloseState {
    opts;
    root;
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        useRefById({
            ...opts,
            deps: () => this.root.opts.open.current,
        });
        this.onclick = this.onclick.bind(this);
        this.onkeydown = this.onkeydown.bind(this);
    }
    onclick(_) {
        this.root.handleClose();
    }
    onkeydown(e) {
        if (!(e.key === kbd.ENTER || e.key === kbd.SPACE))
            return;
        e.preventDefault();
        this.root.handleClose();
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        onclick: this.onclick,
        onkeydown: this.onkeydown,
        type: "button",
        "data-popover-close": "",
    }));
}
//
// CONTEXT METHODS
//
const PopoverRootContext = new Context("Popover.Root");
export function usePopoverRoot(props) {
    return PopoverRootContext.set(new PopoverRootState(props));
}
export function usePopoverTrigger(props) {
    return new PopoverTriggerState(props, PopoverRootContext.get());
}
export function usePopoverContent(props) {
    return new PopoverContentState(props, PopoverRootContext.get());
}
export function usePopoverClose(props) {
    return new PopoverCloseState(props, PopoverRootContext.get());
}
