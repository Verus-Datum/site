export type Subscription = {
	id: number;
	stripe_customer_id: string;
	stripe_subscription_id: string;
	plan_id: string;
	subscription_status: string;
	current_period_end: string;
};
