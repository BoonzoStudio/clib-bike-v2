import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

export class MapService {
  map: mapboxgl.Map;

  constructor() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2xpcC1iaWtlIiwiYSI6ImNqemExa21sYzAwMWUzY251ZnI0bGlqdnkifQ.z-txdJ5mzB8xpSa0VQwpgg';

    this.map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/clip-bike/cjza2dmff565b1cnx125pfd4j',
      center: [-122.866208, 45.5234], // [lng, lat]
      zoom: 9
    });

    this.map.addControl(new mapboxgl.NavigationControl(),'top-right');

    }
}
