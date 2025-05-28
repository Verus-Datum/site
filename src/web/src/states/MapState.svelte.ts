import type { MapStateType } from '$types/Map';
import maplibregl, { type LngLatLike } from 'maplibre-gl';
import { mode } from 'mode-watcher';

class MapState implements MapStateType {
	private _center = $state<LngLatLike>([-86.225, 34.7295]);
	private _map = $state<maplibregl.Map | undefined>();
	private _container = $state<string>();

	set map(setTo: maplibregl.Map) {
		this._map = setTo;
	}

	get map(): maplibregl.Map | undefined {
		return this._map;
	}

	get container(): string {
		return this._container as string;
	}

	set container(setTo: string) {
		this._container = setTo;
		if (!this._map) {
			this._map = new maplibregl.Map({
				container: this._container,
				style:
					mode.current === 'dark'
						? 'https://tiles.openfreemap.org/styles/dark'
						: 'https://tiles.openfreemap.org/styles/bright',
				center: this._center,
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
