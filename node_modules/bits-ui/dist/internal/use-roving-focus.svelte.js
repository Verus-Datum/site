import { box } from "svelte-toolbelt";
import { getElemDirection } from "./locale.js";
import { getDirectionalKeys } from "./get-directional-keys.js";
import { kbd } from "./kbd.js";
import { isBrowser } from "./is.js";
export function useRovingFocus(props) {
    const currentTabStopId = box(null);
    function getCandidateNodes() {
        if (!isBrowser)
            return [];
        const node = document.getElementById(props.rootNodeId.current);
        if (!node)
            return [];
        if (props.candidateSelector) {
            const candidates = Array.from(node.querySelectorAll(props.candidateSelector));
            return candidates;
        }
        else if (props.candidateAttr) {
            const candidates = Array.from(node.querySelectorAll(`[${props.candidateAttr}]:not([data-disabled])`));
            return candidates;
        }
        return [];
    }
    function focusFirstCandidate() {
        const items = getCandidateNodes();
        if (!items.length)
            return;
        items[0]?.focus();
    }
    function handleKeydown(node, e, both = false) {
        const rootNode = document.getElementById(props.rootNodeId.current);
        if (!rootNode || !node)
            return;
        const items = getCandidateNodes();
        if (!items.length)
            return;
        const currentIndex = items.indexOf(node);
        const dir = getElemDirection(rootNode);
        const { nextKey, prevKey } = getDirectionalKeys(dir, props.orientation.current);
        const loop = props.loop.current;
        const keyToIndex = {
            [nextKey]: currentIndex + 1,
            [prevKey]: currentIndex - 1,
            [kbd.HOME]: 0,
            [kbd.END]: items.length - 1,
        };
        if (both) {
            const altNextKey = nextKey === kbd.ARROW_DOWN ? kbd.ARROW_RIGHT : kbd.ARROW_DOWN;
            const altPrevKey = prevKey === kbd.ARROW_UP ? kbd.ARROW_LEFT : kbd.ARROW_UP;
            keyToIndex[altNextKey] = currentIndex + 1;
            keyToIndex[altPrevKey] = currentIndex - 1;
        }
        let itemIndex = keyToIndex[e.key];
        if (itemIndex === undefined)
            return;
        e.preventDefault();
        if (itemIndex < 0 && loop) {
            itemIndex = items.length - 1;
        }
        else if (itemIndex === items.length && loop) {
            itemIndex = 0;
        }
        const itemToFocus = items[itemIndex];
        if (!itemToFocus)
            return;
        itemToFocus.focus();
        currentTabStopId.current = itemToFocus.id;
        props.onCandidateFocus?.(itemToFocus);
        return itemToFocus;
    }
    function getTabIndex(node) {
        const items = getCandidateNodes();
        const anyActive = currentTabStopId.current !== null;
        if (node && !anyActive && items[0] === node) {
            currentTabStopId.current = node.id;
            return 0;
        }
        else if (node?.id === currentTabStopId.current) {
            return 0;
        }
        return -1;
    }
    return {
        setCurrentTabStopId(id) {
            currentTabStopId.current = id;
        },
        getTabIndex,
        handleKeydown,
        focusFirstCandidate,
        currentTabStopId,
    };
}
