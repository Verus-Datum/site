import type { User } from '$types/User';

interface CreateListing {
	name: string;
	address: string;
	market: string;
	contact_method: string;
	longitude: number;
	latitude: number;
	asking_price: number;
	revenue_per_yr: number;
	gross_per_yr: number;
	profit_per_yr: number;
	user_id: number;
}

interface CreateListingResponse {
	id: number;
	name: string;
	address: string;
	market: string;
	contact_method: string;
	longitude: number;
	latitude: number;
	asking_price: number;
	revenue_per_yr: number;
	gross_per_yr: number;
	profit_per_yr: number;
	user_id: number;
	user?: User;
}

export type { CreateListingResponse, CreateListing };
