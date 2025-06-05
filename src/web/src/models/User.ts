export type User = {
	id: number;
	profile_image_path: string | null;
	role: 'buyer' | 'broker';
	first_name: string;
	last_name: string;
	email: string;
	firebase_uid: string;
	created_at: string;
	subscription_id: number;
};
