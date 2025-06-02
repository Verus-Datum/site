export type Business = {
	id: number;
	name: string;
	address: string;
	market: string;
	address_id: number | null;
	revenue_per_year: number;
	gross_per_year: number;
	profit_per_year: number;
	number_of_employees: number;
	years_in_business: number;
	ownership_type: string;
	type_of_sale: string;
	reason_for_sale: string;
	will_stay_post_sale: boolean;
	confidential_sale: boolean;
	website: string | null;
};
