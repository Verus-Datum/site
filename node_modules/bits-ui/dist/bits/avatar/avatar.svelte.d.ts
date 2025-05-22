import { type ReadableBox, type WritableBox } from "svelte-toolbelt";
import type { HTMLImgAttributes } from "svelte/elements";
import type { AvatarImageLoadingStatus } from "./types.js";
import type { ReadableBoxedValues } from "../../internal/box.svelte.js";
import type { WithRefProps } from "../../internal/types.js";
type CrossOrigin = HTMLImgAttributes["crossorigin"];
type ReferrerPolicy = HTMLImgAttributes["referrerpolicy"];
/**
 * ROOT
 */
type AvatarRootStateProps = WithRefProps<{
    delayMs: ReadableBox<number>;
    loadingStatus: WritableBox<AvatarImageLoadingStatus>;
}>;
type AvatarImageSrc = string | null | undefined;
declare class AvatarRootState {
    readonly opts: AvatarRootStateProps;
    constructor(opts: AvatarRootStateProps);
    loadImage(src: string, crossorigin?: CrossOrigin, referrerPolicy?: ReferrerPolicy): (() => void) | undefined;
    props: {
        readonly id: string;
        readonly "data-avatar-root": "";
        readonly "data-status": AvatarImageLoadingStatus;
    };
}
/**
 * IMAGE
 */
type AvatarImageStateProps = WithRefProps<ReadableBoxedValues<{
    src: AvatarImageSrc;
    crossOrigin: CrossOrigin;
    referrerPolicy: ReferrerPolicy;
}>>;
declare class AvatarImageState {
    readonly opts: AvatarImageStateProps;
    readonly root: AvatarRootState;
    constructor(opts: AvatarImageStateProps, root: AvatarRootState);
    props: {
        readonly id: string;
        readonly style: {
            readonly display: "none" | "block";
        };
        readonly "data-status": AvatarImageLoadingStatus;
        readonly "data-avatar-image": "";
        readonly src: AvatarImageSrc;
        readonly crossorigin: "" | "anonymous" | "use-credentials" | null | undefined;
        readonly referrerpolicy: globalThis.ReferrerPolicy | null | undefined;
    };
}
/**
 * FALLBACK
 */
type AvatarFallbackStateProps = WithRefProps;
declare class AvatarFallbackState {
    readonly opts: AvatarFallbackStateProps;
    readonly root: AvatarRootState;
    constructor(opts: AvatarFallbackStateProps, root: AvatarRootState);
    style: {
        display: string;
    } | undefined;
    props: {
        readonly style: {
            display: string;
        } | undefined;
        readonly "data-status": AvatarImageLoadingStatus;
        readonly "data-avatar-fallback": "";
    };
}
export declare function useAvatarRoot(props: AvatarRootStateProps): AvatarRootState;
export declare function useAvatarImage(props: AvatarImageStateProps): AvatarImageState;
export declare function useAvatarFallback(props: AvatarFallbackStateProps): AvatarFallbackState;
export {};
