import { box, composeHandlers, executeCallbacks, useRefById, } from "svelte-toolbelt";
import { watch } from "runed";
import { on } from "svelte/events";
import { noop } from "../../../internal/noop.js";
import { isHTMLElement } from "../../../internal/is.js";
import { isOrContainsTarget } from "../../../internal/elements.js";
globalThis.bitsTextSelectionLayers ??= new Map();
export class TextSelectionLayerState {
    opts;
    #unsubSelectionLock = noop;
    #ref = box(null);
    constructor(opts) {
        this.opts = opts;
        useRefById({
            id: opts.id,
            ref: this.#ref,
            deps: () => this.opts.enabled.current,
        });
        let unsubEvents = noop;
        watch(() => this.opts.enabled.current, (isEnabled) => {
            if (isEnabled) {
                globalThis.bitsTextSelectionLayers.set(this, this.opts.enabled);
                unsubEvents();
                unsubEvents = this.#addEventListeners();
            }
            return () => {
                unsubEvents();
                this.#resetSelectionLock();
                globalThis.bitsTextSelectionLayers.delete(this);
            };
        });
    }
    #addEventListeners() {
        return executeCallbacks(on(document, "pointerdown", this.#pointerdown), on(document, "pointerup", composeHandlers(this.#resetSelectionLock, this.opts.onPointerUp.current)));
    }
    #pointerdown = (e) => {
        const node = this.#ref.current;
        const target = e.target;
        if (!isHTMLElement(node) || !isHTMLElement(target) || !this.opts.enabled.current)
            return;
        /**
         * We only lock user-selection overflow if layer is the top most layer and
         * pointerdown occurred inside the node. You are still allowed to select text
         * outside the node provided pointerdown occurs outside the node.
         */
        if (!isHighestLayer(this) || !isOrContainsTarget(node, target))
            return;
        this.opts.onPointerDown.current(e);
        if (e.defaultPrevented)
            return;
        this.#unsubSelectionLock = preventTextSelectionOverflow(node);
    };
    #resetSelectionLock = () => {
        this.#unsubSelectionLock();
        this.#unsubSelectionLock = noop;
    };
}
export function useTextSelectionLayer(props) {
    return new TextSelectionLayerState(props);
}
const getUserSelect = (node) => node.style.userSelect || node.style.webkitUserSelect;
function preventTextSelectionOverflow(node) {
    const body = document.body;
    const originalBodyUserSelect = getUserSelect(body);
    const originalNodeUserSelect = getUserSelect(node);
    setUserSelect(body, "none");
    setUserSelect(node, "text");
    return () => {
        setUserSelect(body, originalBodyUserSelect);
        setUserSelect(node, originalNodeUserSelect);
    };
}
function setUserSelect(node, value) {
    node.style.userSelect = value;
    node.style.webkitUserSelect = value;
}
function isHighestLayer(instance) {
    const layersArr = [...globalThis.bitsTextSelectionLayers];
    if (!layersArr.length)
        return false;
    const highestLayer = layersArr.at(-1);
    if (!highestLayer)
        return false;
    return highestLayer[0] === instance;
}
