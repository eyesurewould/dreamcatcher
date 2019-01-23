import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  user: User;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log('we have a user: ', user)
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        console.log('we dont have a user :( ')
        localStorage.setItem('user', null);
      }
    })
  }

  doLogin(value){
    console.log('make a Promise and call Firebase');
    return new Promise<any>((resolve, reject) => {
      console.log('email: ', value.email, 'password: ', value.password);
      this.afAuth.auth.app.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        console.log('got res from firebase', res);
        resolve(res);
      }, err => reject(err))
    })
  }

  async login(email: string, password: string) {
    console.log('starting login');
    try {
      console.log('calling firebase with an await');
      console.log('email: ',email,'password: ', password);
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      console.log('the await finallt returned');
      this.router.navigate(['home']);
    } catch (e) {
      console.log("Error!" + e.message);
    }
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

}