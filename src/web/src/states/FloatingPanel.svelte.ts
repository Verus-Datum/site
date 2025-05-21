import { type Broker } from '$types/Broker';
import type { Snippet } from 'svelte';

let open = $state(false);
let snippet = $state<Snippet | undefined>();

export const FloatingPanelState = {
	get open(): boolean {
		return open;
	},

	set open(v) {
		open = v;
	},

	get snippet(): Snippet | undefined {
		return snippet;
	},

	set snippet(v) {
		snippet = v;
	}
};
