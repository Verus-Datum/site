import type { Product } from '$models/Product';
import { API_URL } from '$utils/api';
import { toast } from 'svelte-sonner';

export const productService = {
	async getAll(): Promise<Product[]> {
		try {
			const res = await fetch(`${API_URL}/products`);
			if (!res.ok) throw new Error('Failed to fetch products');
			return await res.json();
		} catch (error) {
			toast.error('Cannot load products');
			throw error;
		}
	},

	async getById(id: number): Promise<Product> {
		try {
			const res = await fetch(`${API_URL}/products/${id}`);
			if (!res.ok) throw new Error('Failed to fetch product');
			return await res.json();
		} catch (error) {
			toast.error('Cannot load product');
			throw error;
		}
	},

	async create(product: Omit<Product, 'id'>): Promise<Product> {
		try {
			const res = await fetch(`${API_URL}/products`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(product)
			});
			if (!res.ok) throw new Error('Failed to create product');
			return await res.json();
		} catch (error) {
			toast.error('Product creation failed');
			throw error;
		}
	}
};
