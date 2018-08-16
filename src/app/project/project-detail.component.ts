import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Entry } from 'contentful';
import { ContentfulService } from 'angular-contentful-service';

@Component({
    selector: 'project-detail',
    templateUrl: './project-detail.component.html',
    styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

    private id: string;
    private client: Entry<any>;
    private project: Entry<any>;

    constructor(private cs: ContentfulService, private route: ActivatedRoute) {
        console.log('ProjectDetailComponent starting');
        route.params.subscribe(params => {
            console.log("ProjectDetailComponent: params", params);
            this.id = params['id'];
        });
    }

    ngOnInit() {
        console.log('ProjectDetailComponent: ngOnInit: params ', this.id);
        this.load(this.id);
    }

    load(id: string) {
        console.log('ProjectDetailComponent: load project: id ', id);

        console.log('ProjectDetailComponent: retrieve project');
        this.cs.getEntry(
            id,
            { include: 2 }
        )
            .then(projects => {
                this.project = projects;
                console.log('ProjectDetailComponent: project title ', this.project.fields.title);
            })

        console.log('ProjectDetailComponent: previous client name ', this.client.fields.name);
        console.log('ProjectDetailComponent: previous client id ', this.client.sys.id);
        console.log('ProjectDetailComponent: retrieve client from id ', this.project.fields.clientRef.sys.id);
        this.cs.getEntry(
            this.project.fields.clientRef.sys.id,
            { include: 2 }
        )
            .then(client => {
                this.client = client;
                console.log('ProjectDetailComponent: client data ', this.client);
                console.log('ProjectDetailComponent: client name ', this.client.fields.name);
            });


        /*
    console.log('retrieve client from project at id ', this.project.fields.clientRef.sys.id);
    this.cs.getEntry(
        this.project.fields.clientRef.sys.id,
        { include: 2 }
    )
        .then(clients => {
            this.client = clients;
            console.log('show client name ');
            console.log('client name ', this.client.fields.name);
        });*/

    }

}