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
	avatar_url: string;

	/*
    yrsInSphere: number;
	dealsClosed: number;
	wentThrough: number;
	dealSizeRng: number[];
    */
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

	const achievements = faker.helpers.arrayElements(
		[
			'Closed $10M+ in deals',
			'Top 1% broker nationwide',
			'5-year client satisfaction award',
			'100+ deals closed',
			'Certified M&A Advisor'
		],
		faker.number.int({ min: 2, max: 4 })
	);

	const reviews = Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () => ({
		author: faker.person.firstName(),
		content: faker.lorem.sentence()
	}));

	return {
		name: faker.person.fullName(),
		title: 'Broker',
		company: faker.company.name(),
		address: faker.location.streetAddress(true),
		market,
		lngLat,
		stats,
		services,
		avatar_url:
			'https://heroshotphotography.com/wp-content/uploads/2023/03/male-linkedin-corporate-headshot-on-white-square-1024x1024.jpg',
		about: faker.lorem.paragraph(20, 40),
		phone_number: faker.phone.number('+1 (###) ###-####'),
		email: faker.internet.email(),
		company_address: faker.location.streetAddress(true),
		achievements,
		response_time: faker.helpers.arrayElement(['<1hr', 'Same Day', '1-2 Days']),
		listing_count: faker.number.int({ min: 3, max: 15 }),
		languages: faker.helpers.arrayElements(['English', 'Spanish', 'Mandarin', 'French', 'German'], 2),
		license_number: `LIC-${faker.number.int({ min: 100000, max: 999999 })}`,
		reviews
	};
}
export { generateFakeBroker };
export type { Broker, Stats };
