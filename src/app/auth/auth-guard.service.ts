import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
//import { threadId } from 'worker_threads';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      //make sure they aren't on the login page - if so, redirect to home
      if ( state.url == '/login' ) {
        this.router.navigate(['/']);
        return false;
      } 
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
