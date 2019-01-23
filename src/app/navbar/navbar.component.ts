import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from  '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  projectsTitle = 'Projects';
  clientsTitle = 'Clients';

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private  authService:  AuthService
  ) {
  }

  ngOnInit(): void {  }

}