import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntryCollection } from 'contentful';
import { ContentfulService } from '../shared/contentful.service';
import { clientOrder } from '../client/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnDestroy, OnInit {

  private clients: EntryCollection<any>;
  private clientsSubscription: Subscription;
  private limit = 20;
  private skip = 0;
  private total;

  constructor(private cs: ContentfulService) { }

  load() {
    this.clientsSubscription = this.cs.getClients('', clientOrder.name, this.limit, this.skip).subscribe(
      response => {
        this.total = response.total;
        this.clients = response;
      }
    )
  }

  nextPage() {
    this.skip = this.skip + this.limit;
    this.clientsSubscription = this.cs.getClients('', clientOrder.created, this.limit, this.skip).subscribe(
      response => {
        console.log('nextPage: response ', response);
        this.total = response.total;
        this.clients = response;
      }
    )
  }

  prevPage() {
    this.skip = this.skip - this.limit
    this.clientsSubscription = this.cs.getClients('', clientOrder.created, this.limit, this.skip).subscribe(
      response => {
        console.log('prevPage: response ', response);
        this.clients = response;
      }
    )
  }

  ngOnInit() {
    this.load();

  }

  ngOnChanges() {
    this.load();

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.clientsSubscription.unsubscribe();
  }

}
