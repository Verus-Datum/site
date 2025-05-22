import { isBrowser } from "./is.js";
export function useFormControl(getNode) {
    const isInForm = $derived.by(() => {
        if (!isBrowser)
            return false;
        const node = getNode();
        if (!node)
            return false;
        return Boolean(node.closest("form"));
    });
    return {
        get current() {
            return isInForm;
        },
    };
}
