import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
	blur?: number;
	delay?: number;
};

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -12, x: 0, start: 0.8, duration: 500, blur: 0, delay: 0 }
): TransitionConfig => {
	params.duration = 250;
	params.blur = 0.5;
	params.delay = 0;

	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (
		valueA: number,
		scaleA: [number, number],
		scaleB: [number, number]
	) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + key + ':' + style[key] + ';';
		}, '');
	};

	return {
		duration: params.duration ?? 250,
		delay: params.delay ?? 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);
			const blur = scaleConversion(t, [0, 1], [params.blur ?? 0, 0]);

			return styleToString({
				transform:
					transform + 'translate3d(' + x + 'px, ' + y + 'px, 0) scale(' + scale + ')',
				opacity: t,
				filter: 'blur(' + blur + 'px)'
			});
		},
		easing: cubicOut
	};
};

export function clickOutside(node: Node, callback: () => unknown, exclude: Node[] = []) {
	const handleClick = (event: MouseEvent) => {
		if (
			node &&
			!node.contains(event.target as Node) &&
			!exclude.some((excludeNode) => excludeNode.contains(event.target as Node))
		) {
			callback();
		}
	};

	// Delay adding the event listener to prevent it from firing immediately on open
	setTimeout(() => {
		document.addEventListener('click', handleClick, true);
	}, 0);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
