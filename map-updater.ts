import mapboxgl from 'mapbox-gl';
import { Map as MapBoxMap, Marker, SymbolLayout, Point, Popup } from 'mapbox-gl';

import { Logger } from "./logger";
import { RepoService, Poi, User } from "./repo-service";
import { MapService } from "./map-service";

export class MapUpdater {

  poiMarkers: Map<string, Marker>;
  userMarkers: Map<string, Marker>;

  constructor(private mapService: MapService, private repo: RepoService) {
    mapService.map.on('load', () => this.onLoad());
  }

  onLoad() {
    this.poiMarkers = new Map<string, Marker>();
    this.repo.poiAddOrUpdate.subscribe(([id, poi]) => this.UpdatePoi(id, poi));

    this.userMarkers = new Map<string, Marker>();
    this.repo.userLocationAddOrUpdate.subscribe(([id, loc]) => this.UpdateUserLocation(id, loc));

    this.repo.start();

    //this.mapService.map.resize();
  }

  UpdatePoi(id: string, p: Poi) {
    Logger.log('poi change received ' + id);
    if (this.poiMarkers.has(id)) {
      var m = this.poiMarkers.get(id);
      m.remove();
      this.poiMarkers.delete(id);
    }
    var el = document.createElement('i');
    el.className = 'material-icons';
    el.innerHTML = 'warning';
    el.style.color = 'red';
    el.style.fontSize = '24px';
    if (p.pic)
      el.style.background = 'white';
    else
      el.style.background = 'lightgray';
    el.style.width = '24px';
    el.style.height = '24px';
    el.style.borderRadius = '20%';
    el.style.textAlign = 'center';
    el.style.lineHeight = '24px';
    el.style.verticalAlign = 'middle';
    el.style.padding = '3px';
    el.style.cursor = 'pointer';
    var popup = new Popup({ offset: 25, maxWidth: 'none' });
    this.repo.downloadImage(id).then((url) => {
      Logger.log(url);
      popup.setHTML('<style> img {  padding-top: 10px; padding-right: 10px;padding-bottom: 10px;padding-left: 10px;}</style><img src="' + url + '" width="300" alt="No Image"/>' + '<br>Created: ' + this.formatDate(p.ts));
    }).catch();

    var marker = new Marker(el)
      .setLngLat([p.lon, p.lat])
      .setPopup(popup)
      .addTo(this.mapService.map);

    // marker.on('click', ()=>this.repo.downloadImage(id));
    this.poiMarkers.set(id, marker);
  }
  // https://codepen.io/aderaaij/pen/KvJbGj
  UpdateUserLocation(id: string, u: User) {
    Logger.log('location change received ' + id);
    if (this.userMarkers.has(id)) {
      var m = this.userMarkers.get(id);
      m.remove();
      this.userMarkers.delete(id);
    }
    var el = document.createElement('span');
    el.className = 'material-icons';
    el.innerHTML = 'directions_bike';
    if (new Date().getTime() - u.ts < 2 * 60 * 60 * 1000) {
      el.style.color = 'black';
    } else {
      el.style.color = 'gray';
    }
    el.style.fontSize = '30px';
    el.style.background = '#80808030';
    el.style.width = '32px';
    el.style.height = '32px';
    el.style.borderRadius = '50%';
    el.style.textAlign = 'center';
    el.style.lineHeight = '32px';
    el.style.verticalAlign = 'middle';
    el.style.padding = '4px';
    el.style.cursor = 'pointer';

    var popup = new Popup({ offset: 25, maxWidth: 'none' });
    popup.setHTML('Last Update: ' + this.formatDate(u.ts));

    var marker = new Marker(el)
      .setLngLat([u.lon, u.lat])
      .setPopup(popup)
      .addTo(this.mapService.map);
    this.userMarkers.set(id, marker);
  }

  formatDate(timeStamp: number): string {
    var d = new Date(timeStamp);
    var localDate = new Date(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
    var offset = localDate.getTimezoneOffset() / 60;
    var hours = localDate.getHours();
    localDate.setHours(hours - offset);
    return localDate.toLocaleString();
  }
}