import type { LngLatLike } from 'maplibre-gl';
import { fakerEN_US as faker } from '@faker-js/faker';

type Stats = {
	yrsInSphere: number;
	dealsClosed: number;
	wentThrough: number;
	dealSizeRng: number[];
};

type Broker = {
	name: string;
	title: string;
	company: string;
	address: string;
	lngLat: LngLatLike;
	stats: Stats;
	services: string[];
	market: string;
};

function generateFakeBroker(
	min_lng: number,
	max_lng: number,
	min_lat: number,
	max_lat: number
): Broker {
	const lngLat: LngLatLike = {
		lng: parseFloat(faker.location.longitude({ min: min_lng, max: max_lng }).toString()),
		lat: parseFloat(faker.location.latitude({ min: min_lat, max: max_lat }).toString())
	};

	const stats: Stats = {
		yrsInSphere: faker.number.int({ min: 1, max: 40 }),
		dealsClosed: faker.number.int({ min: 10, max: 500 }),
		wentThrough: faker.number.int({ min: 5, max: 300 }),
		dealSizeRng: [
			Math.round(faker.number.int({ min: 50000, max: 250000 }) / 5000) * 5000,
			Math.round(faker.number.int({ min: 300000, max: 2000000 }) / 5000) * 5000
		]
	};

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

	const services = faker.helpers.arrayElements(
		[
			'Valuation',
			'Business Sales',
			'Exit Planning',
			'Franchise Resales',
			'Buyer Representation',
			'Mergers & Acquisitions',
			'Real Estate Advisory',
			'Deal Sourcing'
		],
		faker.number.int({ min: 2, max: 5 })
	);

	return {
		name: faker.person.fullName(),
		title: 'Broker',
		company: faker.company.name(),
		address: faker.location.streetAddress(true),
		market,
		lngLat,
		stats,
		services
	};
}

export { generateFakeBroker };
export type { Broker, Stats };
