import type { Listing } from '$models/Listing';
import { API_URL } from '$utils/api';
import { toast } from 'svelte-sonner';

export const listingService = {
	async getAll(): Promise<Listing[]> {
		try {
			const res = await fetch(`${API_URL}/listings`);
			if (!res.ok) throw new Error('Failed to fetch');

			return await res.json();
		} catch (error) {
			toast.error('Cannot load listings');
			throw error;
		}
	},

	async getGeojson(): Promise<GeoJSON.FeatureCollection> {
		try {
			const listings = await listingService.getAll();

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
