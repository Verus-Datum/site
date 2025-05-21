import { type Broker } from '$types/Broker';

let open = $state(false);
let broker = $state<Broker | undefined>();

export const data = {
	get open(): boolean {
		return open;
	},

	set open(v) {
		open = v;
	},

	get broker(): Broker | undefined {
		return broker;
	},

	set broker(v) {
		broker = v;
	}
};
