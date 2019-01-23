import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  projectsTitle = 'Projects';
  clientsTitle = 'Clients';
  //currentUser: string;
  private sub: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.sub = this.authService.isAuthenticated().subscribe(authResp => 
      console.log('isAuthenticated: ', authResp)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }

  tryLogout() {
    this.authService.doLogout()
      .then((res) => {
        //this.currentUser = null;
        this.router.navigate(['/login']);
      }, (error) => {
        console.log("Logout error", error);
      });
  }

}