import { Component, OnChanges } from '@angular/core';
import { EntryCollection } from 'contentful';
import { ContentfulService } from 'angular-contentful-service';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnChanges {
    title = 'Recent Projects for all artists';
    
    private projects: EntryCollection<any>;

    constructor(private cs: ContentfulService) {
        this.cs.getEntries({ content_type: 'ink', include: 2 })
            .then(projects => {
                this.projects = projects;
                console.log(this.projects);
            })
    }

    getEntries(query?: any) {
        this.cs.getEntries(query).then(res => console.log(res));
    }

    ngOnChanges() {
        //
    }
}