import type { Page, PageItem } from "./types.js";
import type { BitsKeyboardEvent, BitsMouseEvent, WithRefProps } from "../../internal/types.js";
import type { ReadableBoxedValues, WritableBoxedValues } from "../../internal/box.svelte.js";
import { type Orientation } from "../../shared/index.js";
type PaginationRootStateProps = WithRefProps<ReadableBoxedValues<{
    count: number;
    perPage: number;
    siblingCount: number;
    orientation: Orientation;
    loop: boolean;
}> & WritableBoxedValues<{
    page: number;
}>>;
declare class PaginationRootState {
    readonly opts: PaginationRootStateProps;
    totalPages: number;
    range: {
        start: number;
        end: number;
    };
    pages: PageItem[];
    constructor(opts: PaginationRootStateProps);
    setPage(page: number): void;
    getPageTriggerNodes(): HTMLElement[];
    getButtonNode(type: "prev" | "next"): HTMLElement | null | undefined;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage(): void;
    nextPage(): void;
    snippetProps: {
        pages: PageItem[];
        range: {
            start: number;
            end: number;
        };
        currentPage: number;
    };
    props: {
        readonly id: string;
        readonly "data-orientation": "horizontal" | "vertical";
        readonly "data-pagination-root": "";
    };
}
type PaginationPageStateProps = WithRefProps<ReadableBoxedValues<{
    page: Page;
    disabled: boolean;
}>>;
declare class PaginationPageState {
    #private;
    readonly opts: PaginationPageStateProps;
    readonly root: PaginationRootState;
    constructor(opts: PaginationPageStateProps, root: PaginationRootState);
    onclick(e: BitsMouseEvent): void;
    onkeydown(e: BitsKeyboardEvent): void;
    props: {
        readonly id: string;
        readonly "aria-label": `Page ${number}`;
        readonly "data-value": `${number}`;
        readonly "data-selected": "" | undefined;
        readonly "data-pagination-page": "";
        readonly onclick: (e: BitsMouseEvent) => void;
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
    };
}
type PaginationButtonStateProps = WithRefProps<{
    type: "prev" | "next";
}> & ReadableBoxedValues<{
    disabled: boolean;
}>;
declare class PaginationButtonState {
    #private;
    readonly opts: PaginationButtonStateProps;
    readonly root: PaginationRootState;
    constructor(opts: PaginationButtonStateProps, root: PaginationRootState);
    onclick(e: BitsMouseEvent): void;
    onkeydown(e: BitsKeyboardEvent): void;
    props: {
        readonly id: string;
        readonly "data-pagination-prev": "" | undefined;
        readonly "data-pagination-next": "" | undefined;
        readonly disabled: boolean;
        readonly onclick: (e: BitsMouseEvent) => void;
        readonly onkeydown: (e: BitsKeyboardEvent) => void;
    };
}
export declare function usePaginationRoot(props: PaginationRootStateProps): PaginationRootState;
export declare function usePaginationPage(props: PaginationPageStateProps): PaginationPageState;
export declare function usePaginationButton(props: PaginationButtonStateProps): PaginationButtonState;
export {};
