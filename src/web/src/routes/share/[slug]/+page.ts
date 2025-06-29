import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { generateFakeBroker, type Broker } from '$types/Broker';
import { listingService } from '$services/listingService';

export const load: PageLoad = ({ params }) => {
    if (params.slug.startsWith("listing-")) {
        const listing = listingService.getByListingId(params.slug.split("listing-")[1]).then((data) => {
            console.log(data);
            return data
        })

        return {
            listing: listing
        }
    }

    error(404, 'Not found');
};
