import type { DateValue } from "@internationalized/date";
import { Context } from "runed";
import type { DateFieldRootState } from "../date-field/date-field.svelte.js";
import { DateFieldInputState } from "../date-field/date-field.svelte.js";
import type { ReadableBoxedValues, WritableBoxedValues } from "../../internal/box.svelte.js";
import type { DateOnInvalid, DateRange, DateRangeValidator, SegmentPart } from "../../shared/index.js";
import type { WithRefProps } from "../../internal/types.js";
import type { Granularity } from "../../shared/date/types.js";
import { type Formatter } from "../../internal/date-time/formatter.js";
export declare const DATE_RANGE_FIELD_ROOT_ATTR = "data-date-range-field-root";
type DateRangeFieldRootStateProps = WithRefProps<WritableBoxedValues<{
    value: DateRange;
    placeholder: DateValue;
    startValue: DateValue | undefined;
    endValue: DateValue | undefined;
}> & ReadableBoxedValues<{
    readonlySegments: SegmentPart[];
    validate: DateRangeValidator | undefined;
    onInvalid: DateOnInvalid | undefined;
    minValue: DateValue | undefined;
    maxValue: DateValue | undefined;
    disabled: boolean;
    readonly: boolean;
    granularity: Granularity | undefined;
    hourCycle: 12 | 24 | undefined;
    locale: string;
    hideTimeZone: boolean;
    required: boolean;
    errorMessageId: string | undefined;
}>>;
export declare class DateRangeFieldRootState {
    #private;
    readonly opts: DateRangeFieldRootStateProps;
    startFieldState: DateFieldRootState | undefined;
    endFieldState: DateFieldRootState | undefined;
    descriptionId: string;
    formatter: Formatter;
    fieldNode: HTMLElement | null;
    labelNode: HTMLElement | null;
    descriptionNode: HTMLElement | null;
    startValueComplete: boolean;
    endValueComplete: boolean;
    rangeComplete: boolean;
    constructor(opts: DateRangeFieldRootStateProps);
    validationStatus: false | {
        readonly reason: "custom";
        readonly message: string | string[];
    } | {
        readonly reason: "min";
        readonly message?: undefined;
    } | {
        readonly reason: "max";
        readonly message?: undefined;
    };
    isInvalid: boolean;
    props: {
        readonly id: string;
        readonly role: "group";
        readonly "data-date-range-field-root": "";
        readonly "data-invalid": "" | undefined;
    };
}
type DateRangeFieldLabelStateProps = WithRefProps;
declare class DateRangeFieldLabelState {
    #private;
    readonly opts: DateRangeFieldLabelStateProps;
    readonly root: DateRangeFieldRootState;
    constructor(opts: DateRangeFieldLabelStateProps, root: DateRangeFieldRootState);
    props: {
        readonly id: string;
        readonly "data-invalid": "" | undefined;
        readonly "data-disabled": "" | undefined;
        readonly "data-date-range-field-label": "";
        readonly onclick: () => void;
    };
}
type DateRangeFieldInputStateProps = WritableBoxedValues<{
    value: DateValue | undefined;
}> & ReadableBoxedValues<{
    name: string;
}> & WithRefProps;
export declare const DateRangeFieldRootContext: Context<DateRangeFieldRootState>;
export declare function useDateRangeFieldRoot(props: DateRangeFieldRootStateProps): DateRangeFieldRootState;
export declare function useDateRangeFieldLabel(props: DateRangeFieldLabelStateProps): DateRangeFieldLabelState;
export declare function useDateRangeFieldInput(props: Omit<DateRangeFieldInputStateProps, "value">, type: "start" | "end"): DateFieldInputState;
export {};
