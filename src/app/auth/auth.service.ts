import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  constructor() { }

  signUp(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
      console.log(error);
    });
  }
  signin(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(data => {
      firebase.auth().currentUser.getIdToken().then((token: string) => {
        this.token = token;
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  getToken() {
    firebase.auth().currentUser.getIdToken().then((token: string) =>
      this.token = token
    );
    return this.token;
  }
  isAuthenticated() {
    return this.token != null ;
  }
}
