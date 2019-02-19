import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  user: User;
  private loggedIn: Boolean;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log('we have a user: ', user.email)
        this.user = user;
        this.loggedIn = true;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        console.log('we dont have a user');
        localStorage.setItem('user', null);
        this.loggedIn = false;
      }
    })
  }

  doLogin(value){
    console.log('make a Promise and call Firebase');
    return new Promise<any>((resolve, reject) => {
      console.log('email: ', value.email, 'password: ', value.password);
      this.afAuth.auth.app.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(this.afAuth.auth.app.auth().currentUser){
        this.afAuth.auth.signOut()
        resolve();
      }
      else{
        reject();
      }
    });
  }

  isAuthenticated(){
    return this.loggedIn;
  }

}