import { MAP_API_KEY } from '../config';

import 'leaflet/dist/leaflet.css';
import { map, tileLayer, icon, Icon, marker, popup, latLng } from 'leaflet';
import mapIcon from '../../public/images/leaf-orange.png';
import mapIconShadow from '../../public/images/leaf-shadow.png';

export default class Map {
  #zoom = 5;
  #map = null;

  static isGeolocationAvailable = () => {
    return 'geolocation' in navigator;
  };

  static getCurrentPosition = (options = {}) => {
    return new Promise((resolve, reject) => {
      if (!Map.isGeolocationAvailable()) {
        reject('Geolocation not supported');
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  static createMap = async (selector, options = {}) => {
    if ('center' in options && options.center) {
      return new Map(selector, options);
    }

    const defaultCoordinate = [-6.2, 106.816666];

    if ('locate' in options && options.locate) {
      try {
        const position = await Map.getCurrentPosition();
        const coordinate = [position.coords.latitude, position.coords.longitude];

        return new Map(selector, {
          ...options,
          center: coordinate,
        });
      } catch (error) {
        console.error('Location not found << location denied? geoapi unsupported?');

        return new Map(selector, {
          ...options,
          center: defaultCoordinate,
        });
      }
    }
    return new Map(selector, {
      ...options,
      center: defaultCoordinate,
    });
  };

  constructor(selector, options = {}) {
    this.#zoom = options.zoom ?? this.#zoom;
    const tile = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    });
    this.#map = map(document.querySelector(selector), {
      zoom: this.#zoom,
      scrollWheelZoom: false,
      layers: [tile],
      ...options,
    });
  }

  changeCamera = (coordinate, zoomLevel = null) => {
    if (!zoomLevel) {
      this.#map.setView(latLng(coordinate), this.#zoom);
      return;
    }
    this.#map.setView(latLng(coordinate), zoomLevel);
  };

  createIcon = (options = {}) => {
    return icon({
      ...Icon.Default.prototype.options,
      iconRetinaUrl: mapIcon,
      iconUrl: mapIcon,
      shadowUrl: mapIconShadow,
      ...options,
    });
  };

  addMarker = (coordinates, markerOptions = {}, popupOptions = null) => {
    if (typeof markerOptions !== 'object') {
      throw new Error('markerOptions must be an object');
    }
    const newMarker = marker(coordinates, {
      icon: this.createIcon(),
      ...markerOptions,
    });

    if (popupOptions) {
      if (typeof popupOptions !== 'object') {
        throw new Error('popupOptions must be an object');
      }
      if (!('content' in popupOptions)) {
        throw new Error('popupOptions must include `content` property.');
      }
      const newPopup = popup(coordinates, popupOptions);
      newMarker.bindPopup(newPopup);
    }

    newMarker.addTo(this.#map);

    return newMarker;
  };

  getCenter = () => {
    const { lat, lng } = this.#map.getCenter();
    return {
      lat: lat,
      lon: lng,
    };
  };

  addMapEventListener = (eventName, callback) => {
    this.#map.addEventListener(eventName, callback);
  };
}
