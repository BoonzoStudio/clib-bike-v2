
import './style.css';
import { Logger } from "./logger";
import { RepoService } from "./repo-service";
import { MapService } from "./map-service";
import { MapUpdater } from "./map-updater";
import { ControllerService } from "./controller-service";

export class App {

  map: MapService;
  repo: RepoService;
  mapUpdater: MapUpdater;
  controller: ControllerService;

  constructor() {
    this.repo = new RepoService();
    this.map = new MapService();
    this.mapUpdater = new MapUpdater(this.map, this.repo);
    this.controller = new ControllerService();
  }
}

const app = new App();

