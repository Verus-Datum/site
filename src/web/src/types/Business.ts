import type { LngLat, LngLatLike } from 'maplibre-gl';
import { fakerEN_US as faker } from '@faker-js/faker';
import type { User } from './User';
import { markets } from '$utils/markets';
import { generateFakeBroker, type Broker } from './Broker';

type Media = {
	url: string;
	type: 'image' | 'video';
};

type Business = {
	id: number;
	name: string;
	address: string;
	market: string;
	contact_method: string;

	latitude: number;
	longitude: number;

	asking_price: number;
	revenue_per_yr: number;
	gross_per_yr: number;
	profit_per_yr: number;

	is_public: boolean;
	broker: Broker;

	// user: User;
	// user_id: number;
};

function generateFakeBusiness(
	min_lng: number,
	max_lng: number,
	min_lat: number,
	max_lat: number
): Business {
	const longitude = parseFloat(
		faker.location.longitude({ min: min_lng, max: max_lng }).toString()
	);
	const latitude = parseFloat(faker.location.latitude({ min: min_lat, max: max_lat }).toString());

	const asking_price = faker.number.int({ min: 10, max: 200 }) * 5000;

	return {
		id: faker.number.int({ min: 1, max: 100000 }), // or generate with server/db
		name: faker.company.name(),
		address: faker.location.streetAddress(true),
		market: faker.helpers.arrayElement(markets),
		contact_method: 'Direct Owner',
		latitude,
		longitude,
		asking_price,
		revenue_per_yr: faker.number.int({ min: 100000, max: 5000000 }),
		gross_per_yr: faker.number.int({ min: 80000, max: 4500000 }),
		profit_per_yr: faker.number.int({ min: 20000, max: 1500000 }),
		is_public: faker.datatype.boolean(),
		broker: generateFakeBroker(min_lng, max_lng, min_lat, max_lat)
	};
}

export { generateFakeBusiness };
export type { Business };
