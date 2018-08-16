//import { Component, OnChanges, Input } from '@angular/core';
import { Component, OnChanges } from '@angular/core';

import { EntryCollection } from 'contentful';
import { ContentfulService } from 'angular-contentful-service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnChanges {
  title = "Clients";
  //@Input() filterBy?: string = 'all';

  private clients: EntryCollection<any>;

  constructor( private cs: ContentfulService ) { 
    this.cs.getEntries({ content_type: 'client', include: 2 })
      .then(clients => {
        this.clients = clients;
      })
  }

  getEntries(query?: any) {
    this.cs.getEntries(query).then(res => console.log(res));
  }

  ngOnChanges() {
    
  }
}
