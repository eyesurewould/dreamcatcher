import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntryCollection } from 'contentful';
import { ContentfulService } from '../shared/contentful.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnDestroy {
  title = "Clients";

  private clients: EntryCollection<any>;
  private subscription: Subscription;

  constructor(private cs: ContentfulService) {
    this.subscription = this.cs.getClients('').subscribe(
      response => {
        this.clients = response;
      }
    )
    
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
