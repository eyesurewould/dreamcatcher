import { Component, OnInit } from '@angular/core';
import { EntryCollection } from 'contentful';
import { ContentfulService } from '../shared/contentful.service';
import { clientOrder } from '../client/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  private limit = 20; //number of entries per page
  private skip = 0;   //number in the full set we want to start at (e.g. if skip = 100, we want 100,101,102...119 for a total of 20 entries)
  private total;

  public clients: EntryCollection<any>;

  constructor(private cs: ContentfulService) { }

  load() {
    this.cs.getClients('', clientOrder.name, this.limit, this.skip)
      .then((entries) => {
        console.log('load: client entries ', entries);
        this.clients = entries;
        this.total = entries.total;
      })
      .catch((err) => {
        console.error;
      });

    //this.clients = this.cs.getClients('', clientOrder.name, this.limit, this.skip);
    //.then((response) => {
    //    console.log('load: response ', this.clients);
    //    //this.total = response.total;
    //    //this.clients = response;
    //  }
    //)
  }


  nextPage() {
    this.skip = this.skip + this.limit;

    this.cs.getClients('', clientOrder.name, this.limit, this.skip)
      .then((entries) => {
        console.log('nextPage: client entries ', entries);
        this.clients = entries;
        this.total = entries.total;
      })
      .catch((err) => {
        console.error;
      });

    /*this.cs.getClients('', clientOrder.created, this.limit, this.skip)
    .then((response) => {
        console.log('nextPage: response ', response);
        //this.total = response.total;
        //this.clients = response;
      }
    )*/
  }

  prevPage() {
    this.skip = this.skip - this.limit

    this.cs.getClients('', clientOrder.name, this.limit, this.skip)
      .then((entries) => {
        console.log('prevPage: client entries ', entries);
        this.clients = entries;
        this.total = entries.total;
      })
      .catch((err) => {
        console.error;
      });
    /*
    this.cs.getClients('', clientOrder.created, this.limit, this.skip)
    .then((response) => {
        console.log('prevPage: response ', response);
        //this.total = response.total;
        //this.clients = response;
      }
    )*/
  }

  ngOnInit() {
    this.load();

  }

  ngOnChanges() {
    this.load();

  }

}
