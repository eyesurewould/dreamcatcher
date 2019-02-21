import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EntryCollection } from 'contentful';
import { ContentfulService } from '../contentful/contentful.service';
import { clientOrder } from '../client/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  //number of entries per page. 
  //TODO: Move to configuration
  public limit = 10; 

  //number in the full set we want to start at 
  //(e.g. if skip = 50, we want 50, 51, 52...59 for a total of 10 
  //entries (or whatever limit is set to))
  public skip = 0;   
  public total;
  public query = '';
  
  public errorMessage = '';
  public nowShowing = '';
  
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

  /** 
   * Pagination method - get a subset of records 
   * from Contentful via the ContentfulService
   */
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

  /**
   * We capture key strokes in the input field. Enter triggers the search
   * @param event 
   */
  onSearchKeydown(event) {
    if (event.key === "Enter") {
      this.skip = 0;
      this.query = event.srcElement.value;
      this.load();
      this.router.navigate(['/clients', this.query]);

    }
  }

}
