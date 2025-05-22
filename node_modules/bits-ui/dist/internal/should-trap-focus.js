export function shouldTrapFocus({ forceMount, present, trapFocus, open, }) {
    if (forceMount) {
        return open && trapFocus;
    }
    return present && trapFocus && open;
}
