import { useRefById } from "svelte-toolbelt";
import { Context } from "runed";
import { getAriaExpanded, getDataOpenClosed } from "../../internal/attrs.js";
import { kbd } from "../../internal/kbd.js";
function createAttrs(variant) {
    return {
        content: `data-${variant}-content`,
        trigger: `data-${variant}-trigger`,
        overlay: `data-${variant}-overlay`,
        title: `data-${variant}-title`,
        description: `data-${variant}-description`,
        close: `data-${variant}-close`,
        cancel: `data-${variant}-cancel`,
        action: `data-${variant}-action`,
    };
}
class DialogRootState {
    opts;
    triggerNode = $state(null);
    contentNode = $state(null);
    descriptionNode = $state(null);
    contentId = $state(undefined);
    titleId = $state(undefined);
    triggerId = $state(undefined);
    descriptionId = $state(undefined);
    cancelNode = $state(null);
    attrs = $derived.by(() => createAttrs(this.opts.variant.current));
    constructor(opts) {
        this.opts = opts;
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleOpen() {
        if (this.opts.open.current)
            return;
        this.opts.open.current = true;
    }
    handleClose() {
        if (!this.opts.open.current)
            return;
        this.opts.open.current = false;
    }
    sharedProps = $derived.by(() => ({
        "data-state": getDataOpenClosed(this.opts.open.current),
    }));
}
class DialogTriggerState {
    opts;
    root;
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        useRefById({
            ...opts,
            onRefChange: (node) => {
                this.root.triggerNode = node;
                this.root.triggerId = node?.id;
            },
        });
        this.onclick = this.onclick.bind(this);
        this.onkeydown = this.onkeydown.bind(this);
    }
    onclick(e) {
        if (this.opts.disabled.current)
            return;
        if (e.button > 0)
            return;
        this.root.handleOpen();
    }
    onkeydown(e) {
        if (this.opts.disabled.current)
            return;
        if (e.key === kbd.SPACE || e.key === kbd.ENTER) {
            e.preventDefault();
            this.root.handleOpen();
        }
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        "aria-haspopup": "dialog",
        "aria-expanded": getAriaExpanded(this.root.opts.open.current),
        "aria-controls": this.root.contentId,
        [this.root.attrs.trigger]: "",
        onkeydown: this.onkeydown,
        onclick: this.onclick,
        disabled: this.opts.disabled.current ? true : undefined,
        ...this.root.sharedProps,
    }));
}
class DialogCloseState {
    opts;
    root;
    #attr = $derived.by(() => this.root.attrs[this.opts.variant.current]);
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        this.onclick = this.onclick.bind(this);
        this.onkeydown = this.onkeydown.bind(this);
        useRefById({
            ...opts,
            deps: () => this.root.opts.open.current,
        });
    }
    onclick(e) {
        if (this.opts.disabled.current)
            return;
        if (e.button > 0)
            return;
        this.root.handleClose();
    }
    onkeydown(e) {
        if (this.opts.disabled.current)
            return;
        if (e.key === kbd.SPACE || e.key === kbd.ENTER) {
            e.preventDefault();
            this.root.handleClose();
        }
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        [this.#attr]: "",
        onclick: this.onclick,
        onkeydown: this.onkeydown,
        disabled: this.opts.disabled.current ? true : undefined,
        tabindex: 0,
        ...this.root.sharedProps,
    }));
}
class DialogActionState {
    opts;
    root;
    #attr = $derived.by(() => this.root.attrs.action);
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        useRefById(opts);
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        [this.#attr]: "",
        ...this.root.sharedProps,
    }));
}
class DialogTitleState {
    opts;
    root;
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        useRefById({
            ...opts,
            onRefChange: (node) => {
                this.root.titleId = node?.id;
            },
            deps: () => this.root.opts.open.current,
        });
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        role: "heading",
        "aria-level": this.opts.level.current,
        [this.root.attrs.title]: "",
        ...this.root.sharedProps,
    }));
}
class DialogDescriptionState {
    opts;
    root;
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        useRefById({
            ...opts,
            deps: () => this.root.opts.open.current,
            onRefChange: (node) => {
                this.root.descriptionNode = node;
                this.root.descriptionId = node?.id;
            },
        });
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        [this.root.attrs.description]: "",
        ...this.root.sharedProps,
    }));
}
class DialogContentState {
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
                this.root.contentId = node?.id;
            },
        });
    }
    snippetProps = $derived.by(() => ({ open: this.root.opts.open.current }));
    props = $derived.by(() => ({
        id: this.opts.id.current,
        role: this.root.opts.variant.current === "alert-dialog" ? "alertdialog" : "dialog",
        "aria-modal": "true",
        "aria-describedby": this.root.descriptionId,
        "aria-labelledby": this.root.titleId,
        [this.root.attrs.content]: "",
        style: {
            pointerEvents: "auto",
            outline: this.root.opts.variant.current === "alert-dialog" ? "none" : undefined,
        },
        tabindex: this.root.opts.variant.current === "alert-dialog" ? -1 : undefined,
        ...this.root.sharedProps,
    }));
}
class DialogOverlayState {
    opts;
    root;
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        useRefById({
            ...opts,
            deps: () => this.root.opts.open.current,
        });
    }
    snippetProps = $derived.by(() => ({ open: this.root.opts.open.current }));
    props = $derived.by(() => ({
        id: this.opts.id.current,
        [this.root.attrs.overlay]: "",
        style: {
            pointerEvents: "auto",
        },
        ...this.root.sharedProps,
    }));
}
class AlertDialogCancelState {
    opts;
    root;
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        this.onclick = this.onclick.bind(this);
        this.onkeydown = this.onkeydown.bind(this);
        useRefById({
            ...opts,
            deps: () => this.root.opts.open.current,
            onRefChange: (node) => {
                this.root.cancelNode = node;
            },
        });
    }
    onclick(e) {
        if (this.opts.disabled.current)
            return;
        if (e.button > 0)
            return;
        this.root.handleClose();
    }
    onkeydown(e) {
        if (this.opts.disabled.current)
            return;
        if (e.key === kbd.SPACE || e.key === kbd.ENTER) {
            e.preventDefault();
            this.root.handleClose();
        }
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        [this.root.attrs.cancel]: "",
        onclick: this.onclick,
        onkeydown: this.onkeydown,
        tabindex: 0,
        ...this.root.sharedProps,
    }));
}
const DialogRootContext = new Context("Dialog.Root");
export function useDialogRoot(props) {
    return DialogRootContext.set(new DialogRootState(props));
}
export function useDialogTrigger(props) {
    return new DialogTriggerState(props, DialogRootContext.get());
}
export function useDialogTitle(props) {
    return new DialogTitleState(props, DialogRootContext.get());
}
export function useDialogContent(props) {
    return new DialogContentState(props, DialogRootContext.get());
}
export function useDialogOverlay(props) {
    return new DialogOverlayState(props, DialogRootContext.get());
}
export function useDialogDescription(props) {
    return new DialogDescriptionState(props, DialogRootContext.get());
}
export function useDialogClose(props) {
    return new DialogCloseState(props, DialogRootContext.get());
}
export function useAlertDialogCancel(props) {
    return new AlertDialogCancelState(props, DialogRootContext.get());
}
export function useAlertDialogAction(props) {
    return new DialogActionState(props, DialogRootContext.get());
}
