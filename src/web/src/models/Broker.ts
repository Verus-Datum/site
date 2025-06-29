export type LngLatLike = {
	lng: number;
	lat: number;
};

export type Stats = {
	yrsInSphere: number;
	dealsClosed: number;
	wentThrough: number;
	dealSizeRng: [number, number];
};

export type Review = {
	author: string;
	content: string;
};

export type Broker = {
	name: string;
	title: string;
	company: string;
	address: string;
	market: string;
	lngLat: LngLatLike;
	stats: Stats;
	services: string[];
	avatar_url: string;
	about: string;
	phone_number: string;
	email: string;
	company_address: string;
	achievements: string[];
	response_time: string;
	listing_count: number;
	languages: string[];
	license_number: string;
	reviews: Review[];
};
