import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { generateFakeBusiness, type Business } from '$types/Business';
import type { Listing } from '$models/Listing';
import { listingService } from '$services/listingService';

export const load: PageLoad = async ({ fetch, params }) => {
	let listings: Listing[] = await listingService.getAll(fetch);
	return {
		listings
	};
};
