import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntryCollection } from 'contentful';
import { Entry } from 'contentful';
import { ContentfulService } from 'angular-contentful-service';


@Component({
    selector: 'client-detail',
    templateUrl: './client-detail.component.html',
    styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

    private id: string;
    private client: Entry<any>;
    private projects: EntryCollection<any>;

    constructor(private cs: ContentfulService, private route: ActivatedRoute) {
        console.log('ClientDetailComponent starting');
        route.params.subscribe(params => {
            console.log("ClientDetailComponent: params", params);
            this.id = params['id'];
        });

    }

    ngOnInit() {
        console.log('ClientDetailComponent: ngOnInit: params ', this.id);
        this.load(this.id);

    }

    ngOnChanges() {
        console.log('ClientDetailComponent: ngOnChanges: params ', this.id);
        this.load(this.id);

    }

    load(id: string) {
        console.log('ClientDetailComponent: load client and projects: id ', id);

        this.cs.getEntry(
            id,
            { include: 2 }
        )
            .then(clients => {
                this.client = clients;
                console.log('ClientDetailComponent: client name ', this.client.fields.name);
            });

 
        this.cs.getEntries(
            {
                content_type: 'ink',
                links_to_entry: id,
                include: 2
            }
        )
            .then(projects => {
                this.projects = projects;
                console.log('ClientDetailComponent: projects title ', this.projects[0].fields.title);
            })
    }

}
