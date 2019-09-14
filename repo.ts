import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import {Logger} from './logger';


export class RepoService {

  public poiAddOrUpdate: EventEmitter<[string, Poi]> = new EventEmitter<[string, Poi]>();
  public userLocationAddOrUpdate: EventEmitter<[string, User]> = new EventEmitter<[string, User]>();

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyBe8oVxdSfdpugHralC-Kl1fEfu3wzlRA8',
        authDomain: 'clip-4c58d.firebaseapp.com',
        databaseURL: 'https://clip-4c58d.firebaseio.com',
        projectId: 'clip-4c58d',
        storageBucket: 'clip-4c58d.appspot.com',
        messagingSenderId: '93301783306',
        appId: '1:93301783306:web:5602c5baa5c46872'
      });
    }
  }

  start() {
    var poiRef = firebase.database().ref('V1/POI');
    poiRef.on('child_added', (s) => {
      Logger.log('poi added');
      this.poiAddOrUpdate.emit([s.key, s.val()])
    });
    poiRef.on('child_changed', (s) => {
      Logger.log('poi changed');
      this.poiAddOrUpdate.emit([s.key, s.val()])
    });

    var userLocationRef = firebase.database().ref('V1/UserLocation');
    userLocationRef.on('child_added', (s) => {
      Logger.log('location added');
      this.userLocationAddOrUpdate.emit([s.key, s.val()])
    });
    userLocationRef.on('child_changed', (s) => {
      Logger.log('location change');
      this.userLocationAddOrUpdate.emit([s.key, s.val()])
    });
  }

 downloadImage(poiId: string): Promise<string>{
    var imageRef = firebase.storage().ref('images/poi/'+poiId+".jpg");
    return imageRef.getDownloadURL();
  }
}

//"date": "2019-08-27T17:18:07", "direction": -1, "latitude": 45.52499318652715, "longitude": -122.83165047879501, "score": 10, "type": 0, "userid":
export interface Poi {
  lat: number;
  lon: number;
  ts: number;
  typ: number;
  cog: number;
  sc: number;
  uid: string;
}
// course: 107.54
// date: "2019-09-02T22:02:56"
// latitude: 37.33300482
// longitude: -122.04121545
// share: 0

export interface User {
  lat: number;
  lon: number;
  ts: number;
  cog: number;
}