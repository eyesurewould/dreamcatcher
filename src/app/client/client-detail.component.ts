import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContentfulService } from '../shared/contentful.service';
import { Client } from '../client/client';

@Component({
    selector: 'client-detail',
    templateUrl: './client-detail.component.html',
    styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

    private id: string;
    private client: Object;

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
        this.cs.getClient( id ).subscribe((data: Client) => {
            this.client = data;
            console.log('constructor: client ', this.client);
          });

 
        /*this.cs.getProjects(
            {
                content_type: 'ink',
                links_to_entry: id,
                include: 2
            }
        )
            .then(projects => {
                this.projects = projects;
            })*/
    }

}
