import { Component, OnInit } from '@angular/core';
import { EntryCollection } from 'contentful';
import { ContentfulService } from '../shared/contentful.service';
import { clientOrder } from '../client/client';
import { projectOrder } from '../project/project';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private clients: EntryCollection<any>;
  private projects: EntryCollection<any>;

  //TODO: Move these to configuration
  private clientLimit = 6;
  private projectLimit = 6;

  private errorMessageClients = '';
  private errorMessageProjects = '';

  constructor(private cs: ContentfulService) {

  }

  load() {
    this.cs.getClients('', clientOrder.updated, this.clientLimit)
      .then((entries) => {
        //console.log('load: client entries ', entries);
        this.clients = entries;
      })
      .catch((err) => {
        this.errorMessageClients = 'A problem occurred while retrieving data. Please retry later.';
        console.error;
      });

      this.cs.getProjects('', projectOrder.updated, this.projectLimit)
      .then((entries) => {
        //console.log('load: project entries ', entries);
        this.projects = entries;
      })
      .catch((err) => {
        this.errorMessageProjects = 'A problem occurred while retrieving data. Please retry later.';
        console.error;
      });

  }

  ngOnInit() {
    this.load();

  }

}