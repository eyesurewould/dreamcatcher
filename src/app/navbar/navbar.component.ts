import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  projectsTitle = 'Projects';
  clientsTitle = 'Clients';
  private sub: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }

  tryLogout() {
    this.authService.doLogout()
      .then((res) => {
        this.router.navigate(['/login']);
      }, (error) => {
        console.log("Logout error", error);
      });
  }

}