import type { Business } from '$types/Business';

export function filterByContactMethod(businesses: Business[], method: string): Business[] {
	return businesses.filter((b) => b.contact_method.toLowerCase() === method.toLowerCase());
}

export function filterByMarket(businesses: Business[], market: string): Business[] {
	return businesses.filter((b) => b.market.toLowerCase() === market.toLowerCase());
}

export function filterByPublic(businesses: Business[], isPublic: boolean): Business[] {
	return businesses.filter((b) => b.is_public === isPublic);
}

export function filterByPriceRange(businesses: Business[], min: number, max: number): Business[] {
	return businesses.filter((b) => b.asking_price >= min && b.asking_price <= max);
}

export function filterByRevenueRange(businesses: Business[], min: number, max: number): Business[] {
	return businesses.filter((b) => b.revenue_per_yr >= min && b.revenue_per_yr <= max);
}

export function filterByProfitRange(businesses: Business[], min: number, max: number): Business[] {
	return businesses.filter((b) => b.profit_per_yr >= min && b.profit_per_yr <= max);
}

export function sortByPrice(businesses: Business[], direction: 'asc' | 'desc'): Business[] {
	return [...businesses].sort((a, b) =>
		direction === 'asc' ? a.asking_price - b.asking_price : b.asking_price - a.asking_price
	);
}

export function sortByRevenue(businesses: Business[], direction: 'asc' | 'desc'): Business[] {
	return [...businesses].sort((a, b) =>
		direction === 'asc'
			? a.revenue_per_yr - b.revenue_per_yr
			: b.revenue_per_yr - a.revenue_per_yr
	);
}

export function sortByProfit(businesses: Business[], direction: 'asc' | 'desc'): Business[] {
	return [...businesses].sort((a, b) =>
		direction === 'asc' ? a.profit_per_yr - b.profit_per_yr : b.profit_per_yr - a.profit_per_yr
	);
}

export function sortByName(businesses: Business[], direction: 'asc' | 'desc'): Business[] {
	return [...businesses].sort((a, b) => {
		const cmp = a.name.localeCompare(b.name);
		return direction === 'asc' ? cmp : -cmp;
	});
}

export function getLowestAskingPrice(businesses: Business[]): number {
	return Math.min(...businesses.map((b) => b.asking_price));
}

export function getHighestAskingPrice(businesses: Business[]): number {
	return Math.max(...businesses.map((b) => b.asking_price));
}

export function getLowestRevenue(businesses: Business[]): number {
	return Math.min(...businesses.map((b) => b.revenue_per_yr));
}

export function getHighestRevenue(businesses: Business[]): number {
	return Math.max(...businesses.map((b) => b.revenue_per_yr));
}

export function getLowestGross(businesses: Business[]): number {
	return Math.min(...businesses.map((b) => b.gross_per_yr));
}

export function getHighestGross(businesses: Business[]): number {
	return Math.max(...businesses.map((b) => b.gross_per_yr));
}

export function getLowestProfit(businesses: Business[]): number {
	return Math.min(...businesses.map((b) => b.profit_per_yr));
}

export function getHighestProfit(businesses: Business[]): number {
	return Math.max(...businesses.map((b) => b.profit_per_yr));
}
