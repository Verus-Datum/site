import { afterSleep, onDestroyEffect, useRefById } from "svelte-toolbelt";
import { Context, watch } from "runed";
import { on } from "svelte/events";
import { getAriaExpanded, getDataOpenClosed } from "../../internal/attrs.js";
import { isElement, isFocusVisible, isTouch } from "../../internal/is.js";
import { getTabbableCandidates } from "../../internal/focus.js";
import { useGraceArea } from "../../internal/use-grace-area.svelte.js";
const LINK_PREVIEW_CONTENT_ATTR = "data-link-preview-content";
const LINK_PREVIEW_TRIGGER_ATTR = "data-link-preview-trigger";
class LinkPreviewRootState {
    opts;
    hasSelection = $state(false);
    isPointerDownOnContent = $state(false);
    containsSelection = $state(false);
    timeout = null;
    contentNode = $state(null);
    contentMounted = $state(false);
    triggerNode = $state(null);
    isOpening = false;
    constructor(opts) {
        this.opts = opts;
        watch(() => this.opts.open.current, (isOpen) => {
            if (!isOpen) {
                this.hasSelection = false;
                return;
            }
            const handlePointerUp = () => {
                this.containsSelection = false;
                this.isPointerDownOnContent = false;
                afterSleep(1, () => {
                    const isSelection = document.getSelection()?.toString() !== "";
                    if (isSelection) {
                        this.hasSelection = true;
                    }
                    else {
                        this.hasSelection = false;
                    }
                });
            };
            const unsubListener = on(document, "pointerup", handlePointerUp);
            if (!this.contentNode)
                return;
            const tabCandidates = getTabbableCandidates(this.contentNode);
            for (const candidate of tabCandidates) {
                candidate.setAttribute("tabindex", "-1");
            }
            return () => {
                unsubListener();
                this.hasSelection = false;
                this.isPointerDownOnContent = false;
            };
        });
    }
    clearTimeout() {
        if (this.timeout) {
            window.clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
    handleOpen() {
        this.clearTimeout();
        if (this.opts.open.current)
            return;
        this.isOpening = true;
        this.timeout = window.setTimeout(() => {
            if (this.isOpening) {
                this.opts.open.current = true;
                this.isOpening = false;
            }
        }, this.opts.openDelay.current);
    }
    immediateClose() {
        this.clearTimeout();
        this.isOpening = false;
        this.opts.open.current = false;
    }
    handleClose() {
        this.isOpening = false;
        this.clearTimeout();
        if (!this.isPointerDownOnContent && !this.hasSelection) {
            this.timeout = window.setTimeout(() => {
                this.opts.open.current = false;
            }, this.opts.closeDelay.current);
        }
    }
}
class LinkPreviewTriggerState {
    opts;
    root;
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        this.onpointerenter = this.onpointerenter.bind(this);
        this.onpointerleave = this.onpointerleave.bind(this);
        this.onfocus = this.onfocus.bind(this);
        this.onblur = this.onblur.bind(this);
        useRefById({
            ...opts,
            onRefChange: (node) => {
                this.root.triggerNode = node;
            },
        });
    }
    onpointerenter(e) {
        if (isTouch(e))
            return;
        this.root.handleOpen();
    }
    onpointerleave(e) {
        if (isTouch(e))
            return;
        if (!this.root.contentMounted) {
            this.root.immediateClose();
        }
    }
    onfocus(e) {
        if (!isFocusVisible(e.currentTarget))
            return;
        this.root.handleOpen();
    }
    onblur(_) {
        this.root.handleClose();
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        "aria-haspopup": "dialog",
        "aria-expanded": getAriaExpanded(this.root.opts.open.current),
        "data-state": getDataOpenClosed(this.root.opts.open.current),
        "aria-controls": this.root.contentNode?.id,
        role: "button",
        [LINK_PREVIEW_TRIGGER_ATTR]: "",
        onpointerenter: this.onpointerenter,
        onfocus: this.onfocus,
        onblur: this.onblur,
        onpointerleave: this.onpointerleave,
    }));
}
class LinkPreviewContentState {
    opts;
    root;
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        this.onpointerdown = this.onpointerdown.bind(this);
        this.onpointerenter = this.onpointerenter.bind(this);
        this.onfocusout = this.onfocusout.bind(this);
        useRefById({
            ...opts,
            onRefChange: (node) => {
                this.root.contentNode = node;
            },
            deps: () => this.root.opts.open.current,
        });
        useGraceArea({
            triggerNode: () => this.root.triggerNode,
            contentNode: () => this.opts.ref.current,
            enabled: () => this.root.opts.open.current,
            onPointerExit: () => {
                this.root.handleClose();
            },
        });
        onDestroyEffect(() => {
            this.root.clearTimeout();
        });
    }
    onpointerdown(e) {
        const target = e.target;
        if (!isElement(target))
            return;
        if (e.currentTarget.contains(target)) {
            this.root.containsSelection = true;
        }
        this.root.hasSelection = true;
        this.root.isPointerDownOnContent = true;
    }
    onpointerenter(e) {
        if (isTouch(e))
            return;
        this.root.handleOpen();
    }
    onfocusout(e) {
        e.preventDefault();
    }
    onInteractOutside = (e) => {
        this.opts.onInteractOutside.current(e);
        if (e.defaultPrevented)
            return;
        this.root.handleClose();
    };
    onEscapeKeydown = (e) => {
        this.opts.onEscapeKeydown.current?.(e);
        if (e.defaultPrevented)
            return;
        this.root.handleClose();
    };
    onOpenAutoFocus = (e) => {
        e.preventDefault();
    };
    onCloseAutoFocus = (e) => {
        e.preventDefault();
    };
    snippetProps = $derived.by(() => ({ open: this.root.opts.open.current }));
    props = $derived.by(() => ({
        id: this.opts.id.current,
        tabindex: -1,
        "data-state": getDataOpenClosed(this.root.opts.open.current),
        [LINK_PREVIEW_CONTENT_ATTR]: "",
        onpointerdown: this.onpointerdown,
        onpointerenter: this.onpointerenter,
        onfocusout: this.onfocusout,
    }));
    popperProps = {
        onInteractOutside: this.onInteractOutside,
        onEscapeKeydown: this.onEscapeKeydown,
        onOpenAutoFocus: this.onOpenAutoFocus,
        onCloseAutoFocus: this.onCloseAutoFocus,
    };
}
const LinkPreviewRootContext = new Context("LinkPreview.Root");
export function useLinkPreviewRoot(props) {
    return LinkPreviewRootContext.set(new LinkPreviewRootState(props));
}
export function useLinkPreviewTrigger(props) {
    return new LinkPreviewTriggerState(props, LinkPreviewRootContext.get());
}
export function useLinkPreviewContent(props) {
    return new LinkPreviewContentState(props, LinkPreviewRootContext.get());
}
