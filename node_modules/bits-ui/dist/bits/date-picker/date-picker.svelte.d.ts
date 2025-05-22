import type { DateValue } from "@internationalized/date";
import { Context } from "runed";
import type { ReadableBoxedValues, WritableBoxedValues } from "../../internal/box.svelte.js";
import type { DateMatcher, SegmentPart } from "../../shared/index.js";
import type { Granularity, HourCycle, WeekStartsOn } from "../../shared/date/types.js";
type DatePickerRootStateProps = WritableBoxedValues<{
    value: DateValue | undefined;
    open: boolean;
    placeholder: DateValue;
}> & ReadableBoxedValues<{
    readonlySegments: SegmentPart[];
    isDateUnavailable: DateMatcher;
    isDateDisabled: DateMatcher;
    minValue: DateValue | undefined;
    maxValue: DateValue | undefined;
    disabled: boolean;
    readonly: boolean;
    granularity: Granularity | undefined;
    hourCycle: HourCycle | undefined;
    locale: string;
    hideTimeZone: boolean;
    required: boolean;
    preventDeselect: boolean;
    pagedNavigation: boolean;
    weekStartsOn: WeekStartsOn | undefined;
    weekdayFormat: Intl.DateTimeFormatOptions["weekday"];
    fixedWeeks: boolean;
    numberOfMonths: number;
    calendarLabel: string;
    disableDaysOutsideMonth: boolean;
    initialFocus: boolean;
    onDateSelect?: () => void;
}> & {
    defaultPlaceholder: DateValue;
};
declare class DatePickerRootState {
    readonly opts: DatePickerRootStateProps;
    constructor(opts: DatePickerRootStateProps);
}
export declare const DatePickerRootContext: Context<DatePickerRootState>;
export declare function useDatePickerRoot(props: DatePickerRootStateProps): DatePickerRootState;
export {};
