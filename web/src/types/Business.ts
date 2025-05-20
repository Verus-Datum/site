import type { LngLat, LngLatLike } from 'maplibre-gl';
import { faker } from '@faker-js/faker';

type Financials = {
	askingPrice: number;
	revenuePerYr: number;
	grossPerYr: number;
	profitPerYr: number;
};

type Media = {
	url: string;
	type: 'image' | 'video';
};

type Business = {
	name: string;
	address: string;
	market: string;
	lngLat: LngLatLike;

	financials: Financials;
	media: Media[];
};

function generateFakeBusiness(
	min_lng: number,
	max_lng: number,
	min_lat: number,
	max_lat: number
): Business {
	const lngLat: LngLatLike = {
		lng: parseFloat(faker.location.longitude({ min: min_lng, max: max_lng }).toString()),
		lat: parseFloat(faker.location.latitude({ min: min_lat, max: max_lat }).toString())
	};

	const askingPrice = faker.number.int({ min: 10, max: 200 }) * 5000;

	const financials = {
		askingPrice,
		revenuePerYr: faker.number.int({ min: 100000, max: 5000000 }),
		grossPerYr: faker.number.int({ min: 80000, max: 4500000 }),
		profitPerYr: faker.number.int({ min: 20000, max: 1500000 })
	};

	const media = Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
		url: faker.image.url(),
		type: faker.helpers.arrayElement(['image', 'video'])
	}));

	const market = faker.helpers.arrayElement([
		'Retail',
		'Ecommerce',
		'Food & Beverage',
		'Healthcare',
		'Technology',
		'Real Estate',
		'Hospitality',
		'Automotive',
		'Education',
		'Construction',
		'Finance',
		'Entertainment'
	]);

	return {
		name: faker.company.name(),
		address: faker.location.streetAddress(true),
		lngLat,
		financials,
		media,
		market
	};
}

export { generateFakeBusiness };
export type { Business, Media, Financials };
