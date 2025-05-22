export function getDataOpenClosed(condition) {
    return condition ? "open" : "closed";
}
export function getDataChecked(condition) {
    return condition ? "checked" : "unchecked";
}
export function getAriaDisabled(condition) {
    return condition ? "true" : "false";
}
export function getAriaReadonly(condition) {
    return condition ? "true" : "false";
}
export function getAriaExpanded(condition) {
    return condition ? "true" : "false";
}
export function getDataDisabled(condition) {
    return condition ? "" : undefined;
}
export function getAriaRequired(condition) {
    return condition ? "true" : "false";
}
export function getAriaSelected(condition) {
    return condition ? "true" : "false";
}
export function getAriaChecked(checked, indeterminate) {
    if (indeterminate) {
        return "mixed";
    }
    return checked ? "true" : "false";
}
export function getAriaOrientation(orientation) {
    return orientation;
}
export function getAriaHidden(condition) {
    return condition ? "true" : undefined;
}
export function getAriaInvalid(condition) {
    return condition ? "true" : undefined;
}
export function getDataOrientation(orientation) {
    return orientation;
}
export function getDataInvalid(condition) {
    return condition ? "" : undefined;
}
export function getDataRequired(condition) {
    return condition ? "" : undefined;
}
export function getDataReadonly(condition) {
    return condition ? "" : undefined;
}
export function getDataSelected(condition) {
    return condition ? "" : undefined;
}
export function getDataUnavailable(condition) {
    return condition ? "" : undefined;
}
export function getHidden(condition) {
    return condition ? true : undefined;
}
export function getDisabled(condition) {
    return condition ? true : undefined;
}
export function getAriaPressed(condition) {
    return condition ? "true" : "false";
}
export function getRequired(condition) {
    return condition ? true : undefined;
}
