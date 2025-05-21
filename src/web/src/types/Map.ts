import maplibregl, { type LngLatLike } from 'maplibre-gl';

type MapStateType = {
	map: maplibregl.Map | undefined;
	center: LngLatLike;
};

export type { MapStateType };
