import { type Broker } from '$types/Broker';
import type { Snippet } from 'svelte';

let open = $state(false);
let snippet = $state<Snippet | undefined>();
let snippets = $state<{ [key: string]: Snippet }>({});

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
	},

	get snippets(): { [key: string]: Snippet } {
		return snippets;
	},

	addSnippet(name: string, v: Snippet) {
		snippets[name] = v;
	},

	displaySnippet(name: string) {
		if (snippets[name]) {
			snippet = snippets[name];
		}
	},

	snippetByName(name: string): Snippet {
		return snippets[name];
	}
};
