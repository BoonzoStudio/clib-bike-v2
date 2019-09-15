
import './style.css';
import { Logger } from "./logger";
import { RepoService } from "./repo-service";
import { MapService } from "./map-service";
import { MapUpdater } from "./map-updater";

export class App {

  map: MapService;
  repo: RepoService;
  mapUpdater: MapUpdater;

  constructor() {
    this.repo = new RepoService();
    this.map = new MapService();
    this.mapUpdater = new MapUpdater(this.map, this.repo);
    //this.repo.start();
  }
}

const app = new App();