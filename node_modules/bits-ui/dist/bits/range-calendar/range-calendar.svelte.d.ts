import { type DateValue } from "@internationalized/date";
import type { DateRange, Month } from "../../shared/index.js";
import type { ReadableBoxedValues, WritableBoxedValues } from "../../internal/box.svelte.js";
import type { BitsFocusEvent, BitsKeyboardEvent, BitsMouseEvent, WithRefProps } from "../../internal/types.js";
import { type Announcer } from "../../internal/date-time/announcer.js";
import { type Formatter } from "../../internal/date-time/formatter.js";
import { type CalendarParts } from "../../internal/date-time/calendar-helpers.svelte.js";
import type { WeekStartsOn } from "../../shared/date/types.js";
type RangeCalendarRootStateProps = WithRefProps<WritableBoxedValues<{
    value: DateRange;
    placeholder: DateValue;
    startValue: DateValue | undefined;
    endValue: DateValue | undefined;
}> & ReadableBoxedValues<{
    preventDeselect: boolean;
    minValue: DateValue | undefined;
    maxValue: DateValue | undefined;
    disabled: boolean;
    pagedNavigation: boolean;
    weekStartsOn: WeekStartsOn | undefined;
    weekdayFormat: Intl.DateTimeFormatOptions["weekday"];
    isDateDisabled: (date: DateValue) => boolean;
    isDateUnavailable: (date: DateValue) => boolean;
    fixedWeeks: boolean;
    numberOfMonths: number;
    locale: string;
    calendarLabel: string;
    readonly: boolean;
    disableDaysOutsideMonth: boolean;
    /**
     * This is strictly used by the `DateRangePicker` component to close the popover when a date range
     * is selected. It is not intended to be used by the user.
     */
    onRangeSelect?: () => void;
}> & {
    defaultPlaceholder: DateValue;
}>;
export declare class RangeCalendarRootState {
    #private;
    readonly opts: RangeCalendarRootStateProps;
    months: Month<DateValue>[];
    visibleMonths: DateValue[];
    announcer: Announcer;
    formatter: Formatter;
    accessibleHeadingId: string;
    focusedValue: DateValue | undefined;
    lastPressedDateValue: DateValue | undefined;
    constructor(opts: RangeCalendarRootStateProps);
    setMonths: (months: Month<DateValue>[]) => void;
    /**
     * This derived state holds an array of localized day names for the current
     * locale and calendar view. It dynamically syncs with the 'weekStartsOn' option,
     * updating its content when the option changes. Using this state to render the
     * calendar's days of the week is strongly recommended, as it guarantees that
     * the days are correctly formatted for the current locale and calendar view.
     */
    weekdays: string[];
    isOutsideVisibleMonths(date: DateValue): boolean;
    isDateDisabled(date: DateValue): boolean;
    isDateUnavailable(date: DateValue): boolean;
    isStartInvalid: boolean;
    isEndInvalid: boolean;
    isInvalid: boolean;
    isNextButtonDisabled: boolean;
    isPrevButtonDisabled: boolean;
    headingValue: string;
    fullCalendarLabel: string;
    isSelectionStart(date: DateValue): boolean;
    isSelectionEnd(date: DateValue): boolean;
    isSelected(date: DateValue): boolean;
    highlightedRange: {
        start: DateValue;
        end: DateValue;
    } | null;
    shiftFocus(node: HTMLElement, add: number): void;
    handleCellClick(e: Event, date: DateValue): void;
    onkeydown(event: BitsKeyboardEvent): void;
    /**
     * Navigates to the next page of the calendar.
     */
    nextPage(): void;
    /**
     * Navigates to the previous page of the calendar.
     */
    prevPage(): void;
    nextYear(): void;
    prevYear(): void;
    setYear(year: number): void;
    setMonth(month: number): void;
    getBitsAttr(part: CalendarParts): string;
    snippetProps: {
        months: Month<DateValue>[];
        weekdays: string[];
    };
    props: {
        readonly onkeydown: (event: BitsKeyboardEvent) => void;
        readonly id: string;
        readonly role: "application";
        readonly "aria-label": string;
        readonly "data-invalid": "" | undefined;
        readonly "data-disabled": "" | undefined;
        readonly "data-readonly": "" | undefined;
    };
}
type RangeCalendarCellStateProps = WithRefProps<ReadableBoxedValues<{
    date: DateValue;
    month: DateValue;
}>>;
export declare class RangeCalendarCellState {
    readonly opts: RangeCalendarCellStateProps;
    readonly root: RangeCalendarRootState;
    cellDate: Date;
    isDisabled: boolean;
    isUnavailable: boolean;
    isDateToday: boolean;
    isOutsideMonth: boolean;
    isOutsideVisibleMonths: boolean;
    isFocusedDate: boolean;
    isSelectedDate: boolean;
    isSelectionStart: boolean;
    isSelectionEnd: boolean;
    isHighlighted: boolean;
    labelText: string;
    constructor(opts: RangeCalendarCellStateProps, root: RangeCalendarRootState);
    snippetProps: {
        disabled: boolean;
        unavailable: boolean;
        selected: boolean;
    };
    ariaDisabled: boolean;
    sharedDataAttrs: {
        readonly "data-unavailable": "" | undefined;
        readonly "data-today": "" | undefined;
        readonly "data-outside-month": "" | undefined;
        readonly "data-outside-visible-months": "" | undefined;
        readonly "data-focused": "" | undefined;
        readonly "data-selection-start": "" | undefined;
        readonly "data-selection-end": "" | undefined;
        readonly "data-highlighted": "" | undefined;
        readonly "data-selected": "" | undefined;
        readonly "data-value": string;
        readonly "data-type": string;
        readonly "data-disabled": "" | undefined;
    };
    props: {
        readonly "data-unavailable": "" | undefined;
        readonly "data-today": "" | undefined;
        readonly "data-outside-month": "" | undefined;
        readonly "data-outside-visible-months": "" | undefined;
        readonly "data-focused": "" | undefined;
        readonly "data-selection-start": "" | undefined;
        readonly "data-selection-end": "" | undefined;
        readonly "data-highlighted": "" | undefined;
        readonly "data-selected": "" | undefined;
        readonly "data-value": string;
        readonly "data-type": string;
        readonly "data-disabled": "" | undefined;
        readonly id: string;
        readonly role: "gridcell";
        readonly "aria-selected": "true" | "false";
        readonly "aria-disabled": "true" | "false";
    };
}
type RangeCalendarDayStateProps = WithRefProps;
declare class RangeCalendarDayState {
    #private;
    readonly opts: RangeCalendarDayStateProps;
    readonly cell: RangeCalendarCellState;
    constructor(opts: RangeCalendarDayStateProps, cell: RangeCalendarCellState);
    onclick(e: BitsMouseEvent): void;
    onmouseenter(_: BitsMouseEvent): void;
    onfocusin(_: BitsFocusEvent): void;
    snippetProps: {
        disabled: boolean;
        unavailable: boolean;
        selected: boolean;
        day: string;
    };
    props: {
        readonly tabindex: number | undefined;
        readonly "data-bits-day": "";
        readonly onclick: (e: BitsMouseEvent) => void;
        readonly onmouseenter: (_: BitsMouseEvent) => void;
        readonly onfocusin: (_: BitsFocusEvent) => void;
        readonly "data-unavailable": "" | undefined;
        readonly "data-today": "" | undefined;
        readonly "data-outside-month": "" | undefined;
        readonly "data-outside-visible-months": "" | undefined;
        readonly "data-focused": "" | undefined;
        readonly "data-selection-start": "" | undefined;
        readonly "data-selection-end": "" | undefined;
        readonly "data-highlighted": "" | undefined;
        readonly "data-selected": "" | undefined;
        readonly "data-value": string;
        readonly "data-type": string;
        readonly "data-disabled": "" | undefined;
        readonly id: string;
        readonly role: "button";
        readonly "aria-label": string;
        readonly "aria-disabled": "true" | "false";
    };
}
export declare function useRangeCalendarRoot(props: RangeCalendarRootStateProps): RangeCalendarRootState | import("../calendar/calendar.svelte.js").CalendarRootState;
export declare function useRangeCalendarCell(props: RangeCalendarCellStateProps): RangeCalendarCellState;
export declare function useRangeCalendarDay(props: RangeCalendarDayStateProps): RangeCalendarDayState;
export {};
