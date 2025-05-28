import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { generateFakeBroker, type Broker } from '$types/Broker';

export const load: PageLoad = ({ params }) => {
	if (params.id === 'example') {
		const broker: Broker = generateFakeBroker(-86.75, -86.45, 34.65, 34.85);
		return {
			broker: broker
		};
	}

	error(404, 'Not found');
};
