import { z } from 'zod';

export const formSchema = z.object({
	businessName: z.string().min(1, 'Business name is required'),
	industryMarket: z.string().min(1, 'Business industry is required'),
	isPublic: z.boolean(),
	addressLine1: z.string().min(1, 'Address Line 1 is required'),
	addressLine2: z.string().optional(),
	city: z.string().min(1, 'City is required'),
	state: z.string().min(1, 'State is required'),
	zip: z
		.string()
		.min(5, 'ZIP must be at least 5 characters')
		.max(10, 'ZIP must be at most 10 characters'),
	askingPrice: z.coerce.number().nonnegative('Asking price must be positive'),
	annualRevenue: z.coerce.number().nonnegative('Revenue must be positive'),
	annualGross: z.coerce.number().nonnegative('Gross must be positive'),
	annualProfit: z.coerce.number().nonnegative('Profit must be positive')
});

export type FormSchema = typeof formSchema;
