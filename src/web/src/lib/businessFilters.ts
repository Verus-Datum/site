import type { Listing } from '$models/Listing';
import type { Business } from '$types/Business';

export function filterByContactMethod(businesses: Listing[], method: string): Listing[] {
	return businesses.filter((b) => b.contact_method.toLowerCase() === method.toLowerCase());
}

export function filterByMarket(businesses: Listing[], market: string): Listing[] {
	return businesses.filter((b) => b.market.toLowerCase() === market.toLowerCase());
}

export function filterByPublic(businesses: Listing[], isPublic: boolean): Listing[] {
	return businesses.filter((b) => b.is_public === isPublic);
}

export function filterByPriceRange(businesses: Listing[], min: number, max: number): Listing[] {
	return businesses.filter((b) => b.asking_price >= min && b.asking_price <= max);
}

export function filterByRevenueRange(businesses: Listing[], min: number, max: number): Listing[] {
	return businesses.filter((b) => b.revenue_per_yr >= min && b.revenue_per_yr <= max);
}

export function filterByProfitRange(businesses: Listing[], min: number, max: number): Listing[] {
	return businesses.filter((b) => b.profit_per_yr >= min && b.profit_per_yr <= max);
}

export function sortByPrice(businesses: Listing[], direction: 'asc' | 'desc'): Listing[] {
	return [...businesses].sort((a, b) =>
		direction === 'asc' ? a.asking_price - b.asking_price : b.asking_price - a.asking_price
	);
}

export function sortByRevenue(businesses: Listing[], direction: 'asc' | 'desc'): Listing[] {
	return [...businesses].sort((a, b) =>
		direction === 'asc'
			? a.revenue_per_yr - b.revenue_per_yr
			: b.revenue_per_yr - a.revenue_per_yr
	);
}

export function sortByProfit(businesses: Listing[], direction: 'asc' | 'desc'): Listing[] {
	return [...businesses].sort((a, b) =>
		direction === 'asc' ? a.profit_per_yr - b.profit_per_yr : b.profit_per_yr - a.profit_per_yr
	);
}

export function sortByName(businesses: Listing[], direction: 'asc' | 'desc'): Listing[] {
	return [...businesses].sort((a, b) => {
		const cmp = a.name.localeCompare(b.name);
		return direction === 'asc' ? cmp : -cmp;
	});
}

export function getLowestAskingPrice(businesses: Listing[]): number {
	return Math.min(...businesses.map((b) => b.asking_price));
}

export function getHighestAskingPrice(businesses: Listing[]): number {
	return Math.max(...businesses.map((b) => b.asking_price));
}

export function getLowestRevenue(businesses: Listing[]): number {
	return Math.min(...businesses.map((b) => b.revenue_per_yr));
}

export function getHighestRevenue(businesses: Listing[]): number {
	return Math.max(...businesses.map((b) => b.revenue_per_yr));
}

export function getLowestGross(businesses: Listing[]): number {
	return Math.min(...businesses.map((b) => b.gross_per_yr));
}

export function getHighestGross(businesses: Listing[]): number {
	return Math.max(...businesses.map((b) => b.gross_per_yr));
}

export function getLowestProfit(businesses: Listing[]): number {
	return Math.min(...businesses.map((b) => b.profit_per_yr));
}

export function getHighestProfit(businesses: Listing[]): number {
	return Math.max(...businesses.map((b) => b.profit_per_yr));
}
