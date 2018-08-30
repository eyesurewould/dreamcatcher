import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { Entry, EntryCollection } from 'contentful';
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
    //private project: EntryCollection<any>;

    constructor( private cs: ContentfulService, private router: Router, private activeRoute: ActivatedRoute ) {
        console.log('constructor: starting');
        // force route reload whenever params change;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;

        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                console.log(evt);
               // trick the Router into believing it's last link wasn't previously loaded
               this.router.navigated = false;
               // if you need to scroll back to top, here is the right place
               window.scrollTo(0, 0);
            }
        });
    }

    ngOnInit() {
        this.activeRoute.params.subscribe(routeParams => {
            this.load(routeParams.id);
        });

    }

    load(id: string) {
        console.log('load: starting load ');
        console.log('load: project entry id ', id);

        this.cs.getEntry(
            id,
            { include: 2 }
        )
            .then(projects => {
                this.project = projects;
                console.log('load: client entry id ', this.project.fields.clientRef.sys.id);
                this.cs.getEntry(
                    this.project.fields.clientRef.sys.id,
                    { include: 2 }
                )
                    .then(client => {
                        this.client = client;
                        console.log('load: project ', this.project);
                        console.log('load: client ', this.client);
                    });

            })

    }

    confirmDelete(id) {
        console.log('confirmDelete: ', id);
    }

}