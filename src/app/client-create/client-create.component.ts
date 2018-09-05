import { Component } from '@angular/core';
import { ContentfulService } from '../shared/contentful.service';
import { Client } from '../client/client';
import { isNull } from 'util';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent {

  private client: Client;
  private socialTypes = [
    "Instagram",
    "Facebook",
    "Pinterest",
    "Reddit",
    "Other",
    "None"
  ];

  constructor(private cs: ContentfulService) { 
    this.client = new Client();
  }

  onSubmit() {
    console.log('createClient: start', JSON.stringify(this.client));
    console.log('createClient: global ', this.client);

    if( isNull( this.client.socialType ) ) {
      this.client.socialType = ["None"];
    }

    console.log('createClient: local ', this.client);
    this.cs.createClient(this.client);

    
  }

}
