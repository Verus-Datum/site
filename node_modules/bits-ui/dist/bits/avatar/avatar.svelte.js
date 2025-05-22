import { untrack } from "svelte";
import { useRefById } from "svelte-toolbelt";
import { Context } from "runed";
const AVATAR_ROOT_ATTR = "data-avatar-root";
const AVATAR_IMAGE_ATTR = "data-avatar-image";
const AVATAR_FALLBACK_ATTR = "data-avatar-fallback";
class AvatarRootState {
    opts;
    constructor(opts) {
        this.opts = opts;
        this.loadImage = this.loadImage.bind(this);
        useRefById(opts);
    }
    loadImage(src, crossorigin, referrerPolicy) {
        if (this.opts.loadingStatus.current === "loaded")
            return;
        let imageTimerId;
        const image = new Image();
        image.src = src;
        if (crossorigin !== undefined)
            image.crossOrigin = crossorigin;
        if (referrerPolicy)
            image.referrerPolicy = referrerPolicy;
        this.opts.loadingStatus.current = "loading";
        image.onload = () => {
            imageTimerId = window.setTimeout(() => {
                this.opts.loadingStatus.current = "loaded";
            }, this.opts.delayMs.current);
        };
        image.onerror = () => {
            this.opts.loadingStatus.current = "error";
        };
        return () => {
            window.clearTimeout(imageTimerId);
        };
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        [AVATAR_ROOT_ATTR]: "",
        "data-status": this.opts.loadingStatus.current,
    }));
}
class AvatarImageState {
    opts;
    root;
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        useRefById(opts);
        $effect.pre(() => {
            if (!this.opts.src.current) {
                this.root.opts.loadingStatus.current = "error";
                return;
            }
            // dependency on crossorigin
            this.opts.crossOrigin.current;
            untrack(() => this.root.loadImage(this.opts.src.current ?? "", this.opts.crossOrigin.current, this.opts.referrerPolicy.current));
        });
    }
    props = $derived.by(() => ({
        id: this.opts.id.current,
        style: {
            display: this.root.opts.loadingStatus.current === "loaded" ? "block" : "none",
        },
        "data-status": this.root.opts.loadingStatus.current,
        [AVATAR_IMAGE_ATTR]: "",
        src: this.opts.src.current,
        crossorigin: this.opts.crossOrigin.current,
        referrerpolicy: this.opts.referrerPolicy.current,
    }));
}
class AvatarFallbackState {
    opts;
    root;
    constructor(opts, root) {
        this.opts = opts;
        this.root = root;
        useRefById(opts);
    }
    style = $derived.by(() => this.root.opts.loadingStatus.current === "loaded" ? { display: "none" } : undefined);
    props = $derived.by(() => ({
        style: this.style,
        "data-status": this.root.opts.loadingStatus.current,
        [AVATAR_FALLBACK_ATTR]: "",
    }));
}
const AvatarRootContext = new Context("Avatar.Root");
export function useAvatarRoot(props) {
    return AvatarRootContext.set(new AvatarRootState(props));
}
export function useAvatarImage(props) {
    return new AvatarImageState(props, AvatarRootContext.get());
}
export function useAvatarFallback(props) {
    return new AvatarFallbackState(props, AvatarRootContext.get());
}
