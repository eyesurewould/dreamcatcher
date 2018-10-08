import { Component, OnChanges, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { EntryCollection } from 'contentful';
import { ContentfulService } from '../shared/contentful.service';
import { projectOrder } from '../project/project';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnChanges, OnInit {

    private limit = 20;
    private skip = 0;
    private total;

    private projects: EntryCollection<any>;

    constructor(private cs: ContentfulService) { }

    load() {

        this.cs.getProjects('', projectOrder.updated, this.limit)
            .then((entries) => {
                console.log('load: project entries ', entries);
                this.projects = entries;
                this.total = entries.total;
            })
            .catch((err) => {
                console.error;
            });

        //this.cs.getProjects('', projectOrder.created, this.limit)
        //.then((response) => {
        //this.total = response.total;
        //this.projects = response;
        //    }
        //) 

    }

    nextPage() {
        this.skip = this.skip + this.limit;
        this.cs.getProjects('', projectOrder.updated, this.limit, this.skip)
            .then((entries) => {
                console.log('nextPage: project entries ', entries);
                this.projects = entries;
                this.total = entries.total;
            })
            .catch((err) => {
                console.error;
            });

        /*
        this.cs.getProjects('', projectOrder.created, this.limit, this.skip)
        .then((response) => {
                console.log('nextPage: response ', response);
                //this.total = response.total;
                //this.projects = response;
            }
        )*/

    }

    prevPage() {
        this.skip = this.skip - this.limit
        this.cs.getProjects('', projectOrder.updated, this.limit, this.skip)
            .then((entries) => {
                console.log('nextPage: project entries ', entries);
                this.projects = entries;
                this.total = entries.total;
            })
            .catch((err) => {
                console.error;
            });

        /*
        this.cs.getProjects('', projectOrder.created, this.limit, this.skip)
        .then((response) => {
                console.log('prevPage: response ', response);
                //this.total = response.total;
                //this.projects = response;
            }
        )*/

    }

    ngOnInit() {
        this.load();

    }

    ngOnChanges() {
        this.load();

    }

}