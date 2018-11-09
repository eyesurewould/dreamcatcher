import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { FirebaseUserModel } from '../shared/user.model';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  projectsTitle = 'Projects';
  clientsTitle = 'Clients';
  loggedIn = false;
  user: FirebaseUserModel = new FirebaseUserModel();
  userDisplayName = '';

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    if(firebase.auth().currentUser) {
      console.log('constructor: we have a current user');
      this.userDisplayName = firebase.auth().currentUser.email;
    } else {
      console.log('constructor: no current user');
    }

    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        console.log('ngOnInit: data', data);
        this.user = data;
        if(this.user) {
          this.loggedIn = true;
        }
      }
      console.log('ngOnInit: user', this.user);
    })


  }

  logout() {
    this.authService.doLogout()
      .then((res) => {
        console.log('authService thinks it did a logout...')
        //TODO: Confirm this truly performs a logout and navigates the user 
        //to a non-secure page such as the login page
        this.loggedIn = false;
        //this.location.back();
      }, (error) => {
        console.log("Logout error", error);
      });
  }

}