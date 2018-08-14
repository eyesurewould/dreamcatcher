import { Component, OnInit } from '@angular/core';
import { EntryCollection } from 'contentful';
import { Entry } from 'contentful';

import { ContentfulService } from 'angular-contentful-service'

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {

  private projects: EntryCollection<any>;
  private clients: EntryCollection<any>;

  constructor(private cs: ContentfulService) {}
 
  getEntries(query?: any) {
    this.cs.getEntries(query).then(res => console.log(res));
  }
 
  getEntry(id: string, query?: any) {
    this.cs.getEntry(id, query).then(res => console.log(res));
  }

  ngOnInit() {
    this.cs.getEntries({content_type: 'ink', include: 2})
    .then(projects => this.projects = projects)

    this.cs.getEntries({content_type: 'client', include: 2})
    .then(clients => this.clients = clients)

    //this.cs.getEntry('56h3TgXKAUywamqwyiyIie', {include: 2})
    //.then(clients => this.clients = clients)
  }

}
