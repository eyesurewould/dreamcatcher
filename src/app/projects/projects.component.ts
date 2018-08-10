import { Component, OnChanges, Input } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { ProjectFilterPipe } from '../shared/project-filter.pipe';

@Component ({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnChanges {
    title = 'Recent Projects for all artists';
    @Input() filterBy?: string = 'all';
    visibleProjects: any[] = [];

    constructor (private projectService: ProjectService ) {
        this.visibleProjects = this.projectService.getProjects();
    }

    ngOnChanges() {
        this.visibleProjects = this.projectService.getProjects();
    }
}