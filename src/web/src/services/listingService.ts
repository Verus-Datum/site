import type { Listing } from '$models/Listing';
import { API_URL } from '$utils/api';
import { toast } from 'svelte-sonner';

export const listingService = {
	async getAll(offset = 0, limit = 1000000, cstmFetch?: (url: string) => any): Promise<Listing[]> {
		try {
			let res;
			
			const url = `${API_URL}/listings?offset=${offset}&limit=${limit}`;
			console.log(url)
			if (cstmFetch) {
				res = await cstmFetch(url);
			} else {
				res = await fetch(url);
			}

			if (!res.ok) throw new Error('Failed to fetch');
			return await res.json();
		} catch (error) {
			toast.error('Cannot load listings');
			throw error;
		}
	},

	async getPage(page: number, size = 50): Promise<Listing[]> {
		const offset = page * size;
		console.log(offset);
		return await listingService.getAll(offset, size);
	},

	async getByListingId(id: string): Promise<Listing> {
		try {
			const res = await fetch(`${API_URL}/listings/id/${id}`);
			if (!res.ok) throw new Error('Failed to fetch');

			return await res.json();
		} catch (error) {
			toast.error('Cannot load listing');
			throw error;
		}
	},

	async getGeojson(): Promise<GeoJSON.FeatureCollection> {
		try {
			const listings = await listingService.getAll(0, 100000);

			return {
				type: 'FeatureCollection',
				features: listings.map((l) => ({
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [l.longitude, l.latitude]
					},
					properties: {
						id: l.id,
						name: l.name,
						address: l.address,
						market: l.market,
						asking_price: l.asking_price
					}
				}))
			};
		} catch (error) {
			toast.error('Failed to generate GeoJSON');
			throw error;
		}
	}
};
