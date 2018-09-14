import { Component, OnDestroy, OnChanges, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EntryCollection } from 'contentful';
//import { ContentfulService } from 'angular-contentful-service';
import { ContentfulService } from '../shared/contentful.service';
import { projectOrder } from '../project/project';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnDestroy, OnChanges, OnInit {
    title = 'Recent Projects for all artists';

    private projects: EntryCollection<any>;
    private projectsSubscription: Subscription;

    constructor(private cs: ContentfulService) { }

    load() {
/*        this.cs.getEntries({ content_type: 'ink', include: 2 })
            .then(projects => {
                this.projects = projects;
                //console.log(this.projects);
            })*/

        this.projectsSubscription = this.cs.getProjects('', projectOrder.created, 5).subscribe(
            response => {
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