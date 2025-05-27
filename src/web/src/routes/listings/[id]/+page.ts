import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { generateFakeBusiness, type Business } from '$types/Business';

export const load: PageLoad = ({ params }) => {
	if (params.id === 'example') {
		let listing: Business = generateFakeBusiness(-86.75, -86.45, 34.65, 34.85);
		return {
			listing: listing
		};
	}

	error(404, 'Not found');
};
