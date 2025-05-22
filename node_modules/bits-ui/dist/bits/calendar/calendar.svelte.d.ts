import { type DateValue } from "@internationalized/date";
import { Context } from "runed";
import type { RangeCalendarRootState } from "../range-calendar/range-calendar.svelte.js";
import type { ReadableBoxedValues, WritableBoxedValues } from "../../internal/box.svelte.js";
import type { BitsKeyboardEvent, BitsMouseEvent, WithRefProps } from "../../internal/types.js";
import type { DateMatcher, Month } from "../../shared/index.js";
import { type Announcer } from "../../internal/date-time/announcer.js";
import { type Formatter } from "../../internal/date-time/formatter.js";
import { type CalendarParts } from "../../internal/date-time/calendar-helpers.svelte.js";
import type { WeekStartsOn } from "../../shared/date/types.js";
type CalendarRootStateProps = WithRefProps<WritableBoxedValues<{
    value: DateValue | undefined | DateValue[];
    placeholder: DateValue;
}> & ReadableBoxedValues<{
    preventDeselect: boolean;
    minValue: DateValue | undefined;
    maxValue: DateValue | undefined;
    disabled: boolean;
    pagedNavigation: boolean;
    weekStartsOn: WeekStartsOn | undefined;
    weekdayFormat: Intl.DateTimeFormatOptions["weekday"];
    isDateDisabled: DateMatcher;
    isDateUnavailable: DateMatcher;
    fixedWeeks: boolean;
    numberOfMonths: number;
    locale: string;
    calendarLabel: string;
    type: "single" | "multiple";
    readonly: boolean;
    disableDaysOutsideMonth: boolean;
    initialFocus: boolean;
    /**
     * This is strictly used by the `DatePicker` component to close the popover when a date
     * is selected. It is not intended to be used by the user.
     */
    onDateSelect?: () => void;
}> & {
    defaultPlaceholder: DateValue;
}>;
export declare class CalendarRootState {
    readonly opts: CalendarRootStateProps;
    months: Month<DateValue>[];
    visibleMonths: DateValue[];
    announcer: Announcer;
    formatter: Formatter;
    accessibleHeadingId: string;
    constructor(opts: CalendarRootStateProps);
    setMonths(months: Month<DateValue>[]): void;
    /**
     * This derived state holds an array of localized day names for the current
     * locale and calendar view. It dynamically syncs with the 'weekStartsOn' option,
     * updating its content when the option changes. Using this state to render the
     * calendar's days of the week is strongly recommended, as it guarantees that
     * the days are correctly formatted for the current locale and calendar view.
     */
    weekdays: string[];
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
    isNextButtonDisabled: boolean;
    isPrevButtonDisabled: boolean;
    isInvalid: boolean;
    headingValue: string;
    fullCalendarLabel: string;
    isOutsideVisibleMonths(date: DateValue): boolean;
    isDateDisabled(date: DateValue): boolean;
    isDateSelected(date: DateValue): boolean;
    shiftFocus(node: HTMLElement, add: number): void;
    handleCellClick(_: Event, date: DateValue): void;
    handleMultipleUpdate(prev: DateValue[] | undefined, date: DateValue): DateValue[] | undefined;
    handleSingleUpdate(prev: DateValue | undefined, date: DateValue): DateValue | undefined;
    onkeydown(event: BitsKeyboardEvent): void;
    snippetProps: {
        months: Month<DateValue>[];
        weekdays: string[];
    };
    getBitsAttr(part: CalendarParts): string;
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
export type CalendarHeadingStateProps = WithRefProps;
export declare class CalendarHeadingState {
    readonly opts: CalendarHeadingStateProps;
    readonly root: CalendarRootState | RangeCalendarRootState;
    headingValue: string;
    constructor(opts: CalendarHeadingStateProps, root: CalendarRootState | RangeCalendarRootState);
    props: {
        readonly [x: string]: string | undefined;
        readonly id: string;
        readonly "aria-hidden": "true" | undefined;
        readonly "data-disabled": "" | undefined;
        readonly "data-readonly": "" | undefined;
    };
}
type CalendarCellStateProps = WithRefProps<ReadableBoxedValues<{
    date: DateValue;
    month: DateValue;
}>>;
declare class CalendarCellState {
    readonly opts: CalendarCellStateProps;
    readonly root: CalendarRootState;
    cellDate: Date;
    isDisabled: boolean;
    isUnavailable: boolean;
    isDateToday: boolean;
    isOutsideMonth: boolean;
    isOutsideVisibleMonths: boolean;
    isFocusedDate: boolean;
    isSelectedDate: boolean;
    labelText: string;
    constructor(opts: CalendarCellStateProps, root: CalendarRootState);
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
type CalendarDayStateProps = WithRefProps;
declare class CalendarDayState {
    #private;
    readonly opts: CalendarDayStateProps;
    readonly cell: CalendarCellState;
    constructor(opts: CalendarDayStateProps, cell: CalendarCellState);
    onclick(e: BitsMouseEvent): void;
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
        readonly "data-unavailable": "" | undefined;
        readonly "data-today": "" | undefined;
        readonly "data-outside-month": "" | undefined;
        readonly "data-outside-visible-months": "" | undefined;
        readonly "data-focused": "" | undefined;
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
export type CalendarNextButtonStateProps = WithRefProps;
export declare class CalendarNextButtonState {
    readonly opts: CalendarNextButtonStateProps;
    readonly root: CalendarRootState | RangeCalendarRootState;
    isDisabled: boolean;
    constructor(opts: CalendarNextButtonStateProps, root: CalendarRootState | RangeCalendarRootState);
    onclick(_: BitsMouseEvent): void;
    props: {
        readonly [x: string]: string | boolean | ((_: BitsMouseEvent) => void) | undefined;
        readonly id: string;
        readonly role: "button";
        readonly type: "button";
        readonly "aria-label": "Next";
        readonly "aria-disabled": "true" | "false";
        readonly "data-disabled": "" | undefined;
        readonly disabled: boolean;
        readonly onclick: (_: BitsMouseEvent) => void;
    };
}
export type CalendarPrevButtonStateProps = WithRefProps;
export declare class CalendarPrevButtonState {
    readonly opts: CalendarPrevButtonStateProps;
    readonly root: CalendarRootState | RangeCalendarRootState;
    isDisabled: boolean;
    constructor(opts: CalendarPrevButtonStateProps, root: CalendarRootState | RangeCalendarRootState);
    onclick(_: BitsMouseEvent): void;
    props: {
        readonly [x: string]: string | boolean | ((_: BitsMouseEvent) => void) | undefined;
        readonly id: string;
        readonly role: "button";
        readonly type: "button";
        readonly "aria-label": "Previous";
        readonly "aria-disabled": "true" | "false";
        readonly "data-disabled": "" | undefined;
        readonly disabled: boolean;
        readonly onclick: (_: BitsMouseEvent) => void;
    };
}
export type CalendarGridStateProps = WithRefProps;
export declare class CalendarGridState {
    readonly opts: CalendarGridStateProps;
    readonly root: CalendarRootState | RangeCalendarRootState;
    constructor(opts: CalendarGridStateProps, root: CalendarRootState | RangeCalendarRootState);
    props: {
        readonly [x: string]: string | -1 | undefined;
        readonly id: string;
        readonly tabindex: -1;
        readonly role: "grid";
        readonly "aria-readonly": "true" | "false";
        readonly "aria-disabled": "true" | "false";
        readonly "data-readonly": "" | undefined;
        readonly "data-disabled": "" | undefined;
    };
}
export type CalendarGridBodyStateProps = WithRefProps;
export declare class CalendarGridBodyState {
    readonly opts: CalendarGridBodyStateProps;
    readonly root: CalendarRootState | RangeCalendarRootState;
    constructor(opts: CalendarGridBodyStateProps, root: CalendarRootState | RangeCalendarRootState);
    props: {
        readonly [x: string]: string | undefined;
        readonly id: string;
        readonly "data-disabled": "" | undefined;
        readonly "data-readonly": "" | undefined;
    };
}
export type CalendarGridHeadStateProps = WithRefProps;
export declare class CalendarGridHeadState {
    readonly opts: CalendarGridHeadStateProps;
    readonly root: CalendarRootState | RangeCalendarRootState;
    constructor(opts: CalendarGridHeadStateProps, root: CalendarRootState | RangeCalendarRootState);
    props: {
        readonly [x: string]: string | undefined;
        readonly id: string;
        readonly "data-disabled": "" | undefined;
        readonly "data-readonly": "" | undefined;
    };
}
export type CalendarGridRowStateProps = WithRefProps;
export declare class CalendarGridRowState {
    readonly opts: CalendarGridRowStateProps;
    readonly root: CalendarRootState | RangeCalendarRootState;
    constructor(opts: CalendarGridRowStateProps, root: CalendarRootState | RangeCalendarRootState);
    props: {
        readonly [x: string]: string | undefined;
        readonly id: string;
        readonly "data-disabled": "" | undefined;
        readonly "data-readonly": "" | undefined;
    };
}
export type CalendarHeadCellStateProps = WithRefProps;
export declare class CalendarHeadCellState {
    readonly opts: CalendarHeadCellStateProps;
    readonly root: CalendarRootState | RangeCalendarRootState;
    constructor(opts: CalendarHeadCellStateProps, root: CalendarRootState | RangeCalendarRootState);
    props: {
        readonly [x: string]: string | undefined;
        readonly id: string;
        readonly "data-disabled": "" | undefined;
        readonly "data-readonly": "" | undefined;
    };
}
export type CalendarHeaderStateProps = WithRefProps;
export declare class CalendarHeaderState {
    readonly opts: CalendarHeaderStateProps;
    readonly root: CalendarRootState | RangeCalendarRootState;
    constructor(opts: CalendarHeaderStateProps, root: CalendarRootState | RangeCalendarRootState);
    props: {
        readonly [x: string]: string | undefined;
        readonly id: string;
        readonly "data-disabled": "" | undefined;
        readonly "data-readonly": "" | undefined;
    };
}
export declare const CalendarRootContext: Context<RangeCalendarRootState | CalendarRootState>;
export declare function useCalendarRoot(props: CalendarRootStateProps): RangeCalendarRootState | CalendarRootState;
export declare function useCalendarGrid(props: CalendarGridStateProps): CalendarGridState;
export declare function useCalendarCell(props: CalendarCellStateProps): CalendarCellState;
export declare function useCalendarNextButton(props: CalendarNextButtonStateProps): CalendarNextButtonState;
export declare function useCalendarPrevButton(props: CalendarPrevButtonStateProps): CalendarPrevButtonState;
export declare function useCalendarDay(props: CalendarDayStateProps): CalendarDayState;
export declare function useCalendarGridBody(props: CalendarGridBodyStateProps): CalendarGridBodyState;
export declare function useCalendarGridHead(props: CalendarGridHeadStateProps): CalendarGridHeadState;
export declare function useCalendarGridRow(props: CalendarGridRowStateProps): CalendarGridRowState;
export declare function useCalendarHeadCell(props: CalendarHeadCellStateProps): CalendarHeadCellState;
export declare function useCalendarHeader(props: CalendarHeaderStateProps): CalendarHeaderState;
export declare function useCalendarHeading(props: CalendarHeadingStateProps): CalendarHeadingState;
export {};
