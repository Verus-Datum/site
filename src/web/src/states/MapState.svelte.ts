import type { MapStateType } from '$types/Map';
import maplibregl, { type LngLatLike } from 'maplibre-gl';

class MapState implements MapStateType {
	private _center = $state<LngLatLike>([-86.5853, 34.7295]);
	private _map = $state<maplibregl.Map | undefined>();
	private _container = $state<any>();

	set map(setTo: maplibregl.Map) {
		this._map = setTo;
	}

	get map(): maplibregl.Map | undefined {
		return this._map;
	}

	get container(): any {
		return this._container;
	}

	set container(setTo: any) {
		this._container = setTo;
		if (!this._map) {
			this._map = new maplibregl.Map({
				container: this._container,
				style: 'https://tiles.openfreemap.org/styles/bright',
				center: [-86.5853, 34.7295],
				zoom: 10
			});
		}
	}

	get center(): LngLatLike {
		return this._center;
	}

	set center(setTo: LngLatLike) {
		this._center = setTo;
		if (this._map) {
			this._map.flyTo({
				center: this._center,
				zoom: 12
			});
		}
	}
}

export const mapState = new MapState();
