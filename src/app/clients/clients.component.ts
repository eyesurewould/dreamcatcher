import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EntryCollection } from 'contentful';
import { ContentfulService } from '../shared/contentful.service';
import { clientOrder } from '../client/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  private limit = 10; //number of entries per page
  private skip = 0;   //number in the full set we want to start at (e.g. if skip = 100, we want 100,101,102...119 for a total of 20 entries)
  private total;
  private nowShowing = '';
  private query = '';
  private errorMessage = '';

  public clients: EntryCollection<any>;

  constructor(private cs: ContentfulService, private route: ActivatedRoute, private router: Router) {
    route.params.subscribe(params => {
      if (params['query'] != undefined) {
        this.query = params['query'];
      }
    });

  }

  load() {
    this.getPage();

  }

  nextPage() {
    this.skip = this.skip + this.limit;
    this.getPage();

  }

  prevPage() {
    this.skip = this.skip - this.limit
    this.getPage();

  }

  ngOnInit() {
    this.load();

  }

  ngOnChanges() {
    this.load();

  }

  getPage() {
    this.cs.getClients(this.query, clientOrder.name, this.limit, this.skip)
      .then((entries) => {
        this.clients = entries;
        this.total = entries.total;

        //everything else here is just prepping the message about
        //the search results and total number of results
        if (entries.total == 0) {
          this.nowShowing = 'no matches found'
        } else {
          let currentPageMax = this.skip + this.limit;
          this.nowShowing = 'showing ' + (this.skip + 1) + '-' +
            (currentPageMax < entries.total ? currentPageMax : entries.total) +
            ' of ' + entries.total;
        }
        if (this.query != '') {
          this.nowShowing += ' for \'' + this.query + '\'';
        }
      })
      .catch((err) => {
        this.errorMessage = 'A problem occurred while retrieving data. Please retry later.'
        console.error;
      });

  }

  onSearchKeydown(event) {
    if (event.key === "Enter") {
      this.skip = 0;
      console.log('onSearchKeydown: value ', event.srcElement.value);
      this.query = event.srcElement.value;
      this.load();
      this.router.navigate(['/clients', this.query]);

    }
  }

}
