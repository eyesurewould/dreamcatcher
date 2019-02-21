import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public email = '';
  public instagram = '';
  
  constructor() { 

    //TODO: pull this info from a user's profile or environment
    this.email = 'test@gmail.com';
    this.instagram = 'https://www.instagram.com/test/'
  }

  ngOnInit() {
  }

}
