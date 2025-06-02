export type Listing = {
	id: number;
	user_id: number;
	business_id: number;
	contact_method: string;
	is_public: boolean;
	asking_price: number;
	status: string;
	views: number;
	listed_at: string;
	name: string;
	market: string;
	revenue_per_yr: number;
	gross_per_yr: number;
	profit_per_yr: number;
	address: string;
	longitude: number;
	latitude: number;
};
