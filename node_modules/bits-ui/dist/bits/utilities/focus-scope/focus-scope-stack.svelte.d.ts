export interface FocusScopeAPI {
    id: string;
    paused: boolean;
    pause: () => void;
    resume: () => void;
    isHandlingFocus: boolean;
}
export declare function createFocusScopeStack(): {
    add(focusScope: FocusScopeAPI): void;
    remove(focusScope: FocusScopeAPI): void;
    readonly current: FocusScopeAPI[];
};
export declare function createFocusScopeAPI(): FocusScopeAPI;
export declare function removeLinks(items: HTMLElement[]): HTMLElement[];
