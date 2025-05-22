/**
 * From https://github.com/melt-ui/melt-ui/blob/main/packages/svelte/src/lib/internal/math.ts
 */
export declare function snapValueToStep(value: number, min: number, max: number, step: number): number;
export declare function linearScale(domain: [number, number], range: [number, number], clamp?: boolean): (x: number) => number;
