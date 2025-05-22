import { box, executeCallbacks, onMountEffect, useRefById } from "svelte-toolbelt";
import { on } from "svelte/events";
import { Context, watch } from "runed";
import { useTimeoutFn } from "../../internal/use-timeout-fn.svelte.js";
import { isElement, isFocusVisible } from "../../internal/is.js";
import { useGraceArea } from "../../internal/use-grace-area.svelte.js";
import { getDataDisabled } from "../../internal/attrs.js";
import { CustomEventDispatcher } from "../../internal/events.js";
const TOOLTIP_CONTENT_ATTR = "data-tooltip-content";
const TOOLTIP_TRIGGER_ATTR = "data-tooltip-trigger";
export const TooltipOpenEvent = new CustomEventDispatcher("bits.tooltip.open", {
    bubbles: false,
    cancelable: false,
});
class TooltipProviderState {
    opts;
    isOpenDelayed = $state(true);
    isPointerInTransit = box(false);
    #timerFn;
    constructor(opts) {
        this.opts = opts;
        this.#timerFn = useTimeoutFn(() => {
            this.isOpenDelayed = true;
        }, this.opts.skipDelayDuration.current, { immediate: false });
    }
    #startTimer = () => {
        this.#timerFn.start();
    };
    #clearTimer = () => {
        this.#timerFn.stop();
    };
    onOpen = () => {
        this.#clearTimer();
        this.isOpenDelayed = false;
    };
    onClose = () => {
        this.#startTimer();
    };
}
class TooltipRootState {
    opts;
    provider;
    delayDuration = $derived.by(() => this.opts.delayDuration.current ?? this.provider.opts.delayDuration.current);
    disableHoverableContent = $derived.by(() => this.opts.disableHoverableContent.current ??
        this.provider.opts.disableHoverableContent.current);
    disableCloseOnTriggerClick = $derived.by(() => this.opts.disableCloseOnTriggerClick.current ??
        this.provider.opts.disableCloseOnTriggerClick.current);
    disabled = $derived.by(() => this.opts.disabled.current ?? this.provider.opts.disabled.current);
    ignoreNonKeyboardFocus = $derived.by(() => this.opts.ignoreNonKeyboardFocus.current ??
        this.provider.opts.ignoreNonKeyboardFocus.current);
    contentNode = $state(null);
    triggerNode = $state(null);
    #wasOpenDelayed = $state(false);
    #timerFn;
    stateAttr = $derived.by(() => {
        if (!this.opts.open.current)
            return "closed";
        return this.#wasOpenDelayed ? "delayed-open" : "instant-open";
    });
    constructor(opts, provider) {
        this.opts = opts;
        this.provider = provider;
        this.#timerFn = useTimeoutFn(() => {
            this.#wasOpenDelayed = true;
            this.opts.open.current = true;
        }, this.delayDuration ?? 0, { immediate: false });
        watch(() => this.delayDuration, () => {
            if (this.delayDuration === undefined)
                return;
            this.#timerFn = useTimeoutFn(() => {
                this.#wasOpenDelayed = true;
                this.opts.open.current = true;
            }, this.delayDuration, { immediate: false });
        });
        watch(() => this.opts.open.current, (isOpen) => {
            if (!this.provider.onClose)
                return;
            if (isOpen) {
                this.provider.onOpen();
                TooltipOpenEvent.dispatch(document);
            }
            else {
                this.provider.onClose();
            }
        });
    }
    handleOpen = () => {
        this.#timerFn.stop();
        this.#wasOpenDelayed = false;
        this.opts.open.current = true;
    };
    handleClose = () => {
        this.#timerFn.stop();
        this.opts.open.current = false;
    };
    #handleDelayedOpen = () => {
        this.#timerFn.start();
    };
    onTriggerEnter = () => {
        this.#handleDelayedOpen();
    };
    onTriggerLeave = () => {
        if (this.disableHoverableContent) {
            this.handleClose();
        }
        else {
            this.#timerFn.stop();
        }
    };
}
class TooltipTriggerState {
    opts;
    root;
    #isPointerDown = box(false);
    #hasPointerMoveOpened = $state(false);
    #isDisabled = $derived.by(() => this.opts.disabled.current || this.root.disabled);
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        useRefById({
            ...opts,
            onRefChange: (node) => {
                this.root.triggerNode = node;
            },
        });
    }
    handlePointerUp = () => {
        this.#isPointerDown.current = false;
    };
    #onpointerup = () => {
        if (this.#isDisabled)
            return;
        this.#isPointerDown.current = false;
    };
    #onpointerdown = () => {
        if (this.#isDisabled)
            return;
        this.#isPointerDown.current = true;
        document.addEventListener("pointerup", () => {
            this.handlePointerUp();
        }, { once: true });
    };
    #onpointermove = (e) => {
        if (this.#isDisabled)
            return;
        if (e.pointerType === "touch")
            return;
        if (this.#hasPointerMoveOpened || this.root.provider.isPointerInTransit.current)
            return;
        this.root.onTriggerEnter();
        this.#hasPointerMoveOpened = true;
    };
    #onpointerleave = () => {
        if (this.#isDisabled)
            return;
        this.root.onTriggerLeave();
        this.#hasPointerMoveOpened = false;
    };
    #onfocus = (e) => {
        if (this.#isPointerDown.current || this.#isDisabled)
            return;
        if (this.root.ignoreNonKeyboardFocus && !isFocusVisible(e.currentTarget))
            return;
        this.root.handleOpen();
    };
    #onblur = () => {
        if (this.#isDisabled)
            return;
        this.root.handleClose();
    };
    #onclick = () => {
        if (this.root.disableCloseOnTriggerClick || this.#isDisabled)
            return;
        this.root.handleClose();
    };
    props = $derived.by(() => ({
        id: this.opts.id.current,
        "aria-describedby": this.root.opts.open.current ? this.root.contentNode?.id : undefined,
        "data-state": this.root.stateAttr,
        "data-disabled": getDataDisabled(this.#isDisabled),
        "data-delay-duration": `${this.root.delayDuration}`,
        [TOOLTIP_TRIGGER_ATTR]: "",
        tabindex: this.#isDisabled ? undefined : 0,
        disabled: this.opts.disabled.current,
        onpointerup: this.#onpointerup,
        onpointerdown: this.#onpointerdown,
        onpointermove: this.#onpointermove,
        onpointerleave: this.#onpointerleave,
        onfocus: this.#onfocus,
        onblur: this.#onblur,
        onclick: this.#onclick,
    }));
}
class TooltipContentState {
    opts;
    root;
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        useRefById({
            ...opts,
            onRefChange: (node) => {
                this.root.contentNode = node;
            },
            deps: () => this.root.opts.open.current,
        });
        useGraceArea({
            triggerNode: () => this.root.triggerNode,
            contentNode: () => this.root.contentNode,
            enabled: () => this.root.opts.open.current && !this.root.disableHoverableContent,
            onPointerExit: () => {
                this.root.handleClose();
            },
            setIsPointerInTransit: (value) => {
                this.root.provider.isPointerInTransit.current = value;
            },
        });
        onMountEffect(() => executeCallbacks(on(window, "scroll", (e) => {
            const target = e.target;
            if (!target)
                return;
            if (target.contains(this.root.triggerNode)) {
                this.root.handleClose();
            }
        }), TooltipOpenEvent.listen(window, this.root.handleClose)));
    }
    onInteractOutside = (e) => {
        if (isElement(e.target) &&
            this.root.triggerNode?.contains(e.target) &&
            this.root.disableCloseOnTriggerClick) {
            e.preventDefault();
            return;
        }
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
        "data-state": this.root.stateAttr,
        "data-disabled": getDataDisabled(this.root.disabled),
        style: {
            pointerEvents: "auto",
            outline: "none",
        },
        [TOOLTIP_CONTENT_ATTR]: "",
    }));
    popperProps = {
        onInteractOutside: this.onInteractOutside,
        onEscapeKeydown: this.onEscapeKeydown,
        onOpenAutoFocus: this.onOpenAutoFocus,
        onCloseAutoFocus: this.onCloseAutoFocus,
    };
}
//
// CONTEXT METHODS
//
const TooltipProviderContext = new Context("Tooltip.Provider");
const TooltipRootContext = new Context("Tooltip.Root");
export function useTooltipProvider(props) {
    return TooltipProviderContext.set(new TooltipProviderState(props));
}
export function useTooltipRoot(props) {
    return TooltipRootContext.set(new TooltipRootState(props, TooltipProviderContext.get()));
}
export function useTooltipTrigger(props) {
    return new TooltipTriggerState(props, TooltipRootContext.get());
}
export function useTooltipContent(props) {
    return new TooltipContentState(props, TooltipRootContext.get());
}
