import { Component, OnChanges, OnInit } from '@angular/core';

import { EntryCollection } from 'contentful'; 
import { ContentfulService } from 'angular-contentful-service';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnChanges, OnInit {
    title = 'Recent Projects for all artists';
    
    private projects: EntryCollection<any>; 

    constructor(private cs: ContentfulService) {}

    load() {
        this.cs.getEntries({ content_type: 'ink', include: 2 })
            .then(projects => {
                this.projects = projects;
                //console.log(this.projects);
            })

    }

    ngOnInit() { 
        this.load();

    }

    ngOnChanges() { 
        this.load();

    }
}