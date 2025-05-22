import type { StyleProperties } from "../../shared/index.js";
export declare function getRangeStyles(direction: "lr" | "rl" | "tb" | "bt", min: number, max: number): StyleProperties;
export declare function getThumbStyles(direction: "lr" | "rl" | "tb" | "bt", thumbPos: number): StyleProperties;
export declare function getTickStyles(direction: "lr" | "rl" | "tb" | "bt", tickPosition: number, offsetPercentage: number): StyleProperties;
