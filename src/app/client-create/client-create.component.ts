import { Component } from '@angular/core';
//import { Subscription } from 'rxjs';
import { ContentfulService } from '../shared/contentful.service';
import { Entry } from 'contentful';
import { Client } from '../client/client';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent {

  //private client: Entry<any>;
  private client: Client;
  private socialType = [
    "Instagram",
    "Facebook",
    "Pinterest",
    "Reddit",
    "Other"
  ];

  constructor(private cs: ContentfulService) { 
    this.client = new Client();

  }

  createClient() {
    console.log('createClient: start');
    console.log('createClient: global ', this.client);
    //var client = new Client();
    //client.name = this.client.fields.name;
    //client.email = this.client.fields.email;
    //client.phone = this.client.fields.phone;
    //client.socialHandle = this.client.fields.socialHandle;
    //client.socialType = this.client.fields.socialType;

    console.log('createClient: local ', this.client);
    this.cs.createClient(this.client);
  }

}
