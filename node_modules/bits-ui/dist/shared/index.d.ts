import type * as CSS from "csstype";
export { REGEXP_ONLY_DIGITS, REGEXP_ONLY_CHARS, REGEXP_ONLY_DIGITS_AND_CHARS, } from "../bits/pin-input/pin-input.svelte.js";
export type Selected<Value> = {
    value: Value;
    label?: string;
};
export type SegmentPart = "month" | "day" | "year" | "hour" | "minute" | "second" | "dayPeriod" | "timeZoneName" | "literal";
export type FocusTarget = string | HTMLElement | SVGElement | null;
export type FocusProp = FocusTarget | ((defaultEl?: HTMLElement | null) => FocusTarget);
export type StyleProperties = CSS.Properties & {
    [str: `--${string}`]: any;
};
export type Orientation = "horizontal" | "vertical";
export type Direction = "ltr" | "rtl";
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithoutChildren<T> = T extends {
    children?: any;
} ? Omit<T, "children"> : T;
export type WithoutChild<T> = T extends {
    child?: any;
} ? Omit<T, "child"> : T;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
    ref?: U | null;
};
export type { EditableSegmentPart } from "./date/types.js";
export type { Month, DateMatcher, DateOnInvalid, DateRangeValidator, DateValidator, DateRange, } from "./date/types.js";
export type { WithChild, Without, WithChildren } from "../internal/types.js";
export { mergeProps } from "svelte-toolbelt";
export { useId } from "../internal/use-id.js";
export * from "./attributes.js";
export * from "./types.js";
