import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService implements OnDestroy {
  user: User;
  private loggedIn: Boolean;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.loggedIn = true;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
        this.loggedIn = false;
      }
    })
  }

  ngOnDestroy() {
    this.afAuth.auth.signOut();
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
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