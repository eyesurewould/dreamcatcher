import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentfulService } from '../shared/contentful.service';
import { Subscription } from 'rxjs';
import { Entry, EntryCollection } from 'contentful';
import { Client } from '../client/client';
import { Project } from '../project/project';

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

    private isEditable: boolean = false;

    constructor(private cs: ContentfulService, private route: ActivatedRoute) {
        route.params.subscribe(params => {
            this.id = params['id'];
        });

    }

    load(id: string) {
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

    enableEditing() {
        console.log('enableEditing: start');
        this.isEditable = true;
    }

    save() {
        console.log('save: start');
        this.isEditable = false;

        var client = new Client();
        client.name             = this.client.fields.name;
        client.email            = this.client.fields.email;
        client.phone            = this.client.fields.phone;
        client.socialHandle     = this.client.fields.socialHandle;
        client.socialType       = this.client.fields.socialType;

        this.cs.saveClient(this.id, client);
    }

    deleteClient(id: string) {
        console.log('deleteClient: ', id);
    }

}
