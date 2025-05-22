import type { ReadableBox, WritableBox } from "svelte-toolbelt";
import type { PinInputRootPropsWithoutHTML } from "./types.js";
type UsePasswordManagerBadgeProps = {
    containerRef: WritableBox<HTMLElement | null>;
    inputRef: WritableBox<HTMLInputElement | null>;
    pushPasswordManagerStrategy: ReadableBox<PinInputRootPropsWithoutHTML["pushPasswordManagerStrategy"]>;
    isFocused: ReadableBox<boolean>;
};
export declare function usePasswordManagerBadge({ containerRef, inputRef, pushPasswordManagerStrategy, isFocused, }: UsePasswordManagerBadgeProps): {
    readonly hasPwmBadge: boolean;
    readonly willPushPwmBadge: boolean;
    PWM_BADGE_SPACE_WIDTH: "40px";
};
export {};
