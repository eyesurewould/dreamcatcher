import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntryCollection } from 'contentful';
import { ContentfulService } from '../shared/contentful.service';
import { clientOrder } from '../client/client';
import { projectOrder } from '../project/project';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy, OnInit {

  private clients: EntryCollection<any>;
  private projects: EntryCollection<any>; 
  private clientsSubscription: Subscription;
  private projectsSubscription: Subscription;

  constructor(private cs: ContentfulService) { 

  }

  load() {
    this.clientsSubscription = this.cs.getClients('', clientOrder.updated, 5 ).subscribe(
      response => {
        this.clients = response;
      }
    );
    this.projectsSubscription = this.cs.getProjects('', projectOrder.updated, 5).subscribe(
      response => {
          this.projects = response;
      }
    );

  }

  ngOnInit() {
    this.load();

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.clientsSubscription.unsubscribe();
    this.projectsSubscription.unsubscribe();
  }

}