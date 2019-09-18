import * as firebase from "firebase/app";
import "firebase/auth";
import { Logger } from "./logger";

export class ControllerService {
  constructor() {
    var loginButton = document.getElementById("login");
    if (!loginButton)
    return;
    if (firebase.auth().currentUser) {
    console.log("currentUser");
      loginButton.addEventListener("click", () => this.signOut());
      loginButton.innerHTML = firebase.auth().currentUser.displayName.slice(0, 1);
    } else {
    console.log("not in");
      loginButton.addEventListener("click", () => this.signIn());
    }
  }

  signOut() {
    firebase.auth().signOut().
      then(() => location.reload()).
      catch(reason => { this.showError(reason) });
  }

  signIn() {
    firebase.auth().signInWithEmailAndPassword('vborry@gmail.com', 'password').
      then(cred => {
        location.reload();
      }).
      catch(reason => { this.showError(reason) });
  }
  showError(message: string) {
    console.error(message);
  }
}