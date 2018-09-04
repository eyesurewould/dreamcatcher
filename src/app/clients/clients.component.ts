import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntryCollection } from 'contentful';
import { ContentfulService } from '../shared/contentful.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnDestroy, OnInit {
  title = "Clients";

  private clients: EntryCollection<any>;
  private subscription: Subscription;

  constructor(private cs: ContentfulService) { }

  load() {
    this.subscription = this.cs.getClients('').subscribe(
      response => {
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
    this.subscription.unsubscribe();
  }

}
