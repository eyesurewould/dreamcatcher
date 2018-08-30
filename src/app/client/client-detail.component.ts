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
        route.params.subscribe(params => {
            this.id = params['id'];
        });

    }

    ngOnInit() {
        this.load(this.id);

    }

    ngOnChanges() {
        this.load(this.id);

    }

    load(id: string) {
        this.cs.getEntry(
            id,
            { include: 2 }
        )
            .then(clients => {
                this.client = clients;                
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
            })
    }

}
