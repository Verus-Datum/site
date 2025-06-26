export type Product = {
	id: number;
	name: string;
	description: string | null;
	category: string;
	tags: string | null;
	price: number;
	locked: boolean;
	popular: boolean;
	preview_available: boolean;
	created_at: string | null;
	updated_at: string | null;
};
