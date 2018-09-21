import { Component, OnDestroy, OnChanges, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntryCollection } from 'contentful';
import { ContentfulService } from '../shared/contentful.service';
import { projectOrder } from '../project/project';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnDestroy, OnChanges, OnInit {
    
    private projects: EntryCollection<any>;
    private projectsSubscription: Subscription;
    private limit = 20;
    private skip = 0;
    private total;

    constructor(private cs: ContentfulService) { }

    load() {
        this.projectsSubscription = this.cs.getProjects('', projectOrder.created, this.limit).subscribe(
            response => {
                this.total = response.total;
                this.projects = response;
            }
        )

    }

    nextPage() {
        this.skip = this.skip + this.limit;
        this.projectsSubscription = this.cs.getProjects('', projectOrder.created, this.limit, this.skip).subscribe(
            response => {
                console.log('nextPage: response ', response);
                this.total = response.total;
                this.projects = response;
            }
        )

    }

    prevPage() {
        this.skip = this.skip - this.limit
        this.projectsSubscription = this.cs.getProjects('', projectOrder.created, this.limit, this.skip).subscribe(
            response => {
                console.log('prevPage: response ', response);
                this.projects = response;
            }
        )

    }

    ngOnInit() {
        this.load();

    }

    ngOnChanges() {
        this.load();

    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.projectsSubscription.unsubscribe();
    }
}