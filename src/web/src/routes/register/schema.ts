import { z } from 'zod';

export const registrationSchema = z.object({
	firstName: z.string().min(1).max(50),
	lastName: z.string().min(1).max(50),
	email: z.string().email().min(5).max(100),
	password: z.string().min(6).max(100)
});

export type RegistrationSchema = typeof registrationSchema;
