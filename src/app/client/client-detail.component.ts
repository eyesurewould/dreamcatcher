import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentfulService } from '../shared/contentful.service';
import { Subscription } from 'rxjs';
import { Entry, EntryCollection } from 'contentful';

@Component({
    selector: 'client-detail',
    templateUrl: './client-detail.component.html',
    styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit, OnDestroy {

    private id: string;
    private client: Entry<any>;
    private projects: EntryCollection<any>;
    private subscriptionClient: Subscription;
    private subscriptionProjects: Subscription;

    constructor(private cs: ContentfulService, private route: ActivatedRoute) {
        route.params.subscribe(params => {
            this.id = params['id'];
        });

    }

    load(id: string) {

        //the new shit
        this.subscriptionClient = this.cs.getClient(id).subscribe(
            responseClient => {
                this.client = responseClient;
                this.subscriptionProjects = this.cs.getProjectsForClient(id).subscribe(
                    responseProjects => {
                        this.projects = responseProjects;
                    }
                )
            }
        )
    }

    ngOnInit() {
        this.load(this.id);

    }

    ngOnChanges() {
        this.load(this.id);

    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscriptionClient.unsubscribe();
        this.subscriptionProjects.unsubscribe();
    }

}
