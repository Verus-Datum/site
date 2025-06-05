import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { generateFakeBusiness, type Business } from '$types/Business';
import type { Listing } from '$models/Listing';
import { listingService } from '$services/listingService';

export const load: PageLoad = async ({ params }) => {
	if (params.id === 'example') {
		const listing: Business = generateFakeBusiness(-86.75, -86.45, 34.65, 34.85);
		return {
			listing: listing
		};
	} else {
		const listing: Listing = await listingService.getByListingId(params.id);

		if (!listing) {
			error(404, 'Not found');
		}

		return {
			listing: listing
		};
	}
};
