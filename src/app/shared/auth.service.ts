import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth){}

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        console.log('doRegister: response ', res);
        firebase.auth().currentUser.updateProfile({
          displayName: value.name,
          photoURL: value.password
        }).then(function() {
          // Update successful.
          console.log('new user name is ',firebase.auth().currentUser.displayName)
        })
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        console.log('perform a logout');
        this.afAuth.auth.signOut()
        resolve();
      }
      else{
        reject();
      }
    });
  }

}
