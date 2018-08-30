import { Component, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';

import { ContentfulService } from '../shared/contentful.service';
import { Client } from '../client/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnChanges {
  title = "Clients";

  private clients: Object[];

  constructor(private cs: ContentfulService) {
    this.cs.getClients().subscribe((data: Array<object>) => {
      this.clients = data;
      console.log('constructor: clients ', this.clients);
    });

  }

  ngOnChanges() {
    this.cs.getClients().subscribe((data: Array<object>) => {
      this.clients = data;
      console.log('constructor: clients ', this.clients);
    });
  }
}
