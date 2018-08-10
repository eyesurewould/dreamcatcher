import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { ProjectFilterPipe } from '../shared/project-filter.pipe';
import { ActivatedRoute } from '@angular/router';

@Component ({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnChanges {
    
    @Input() filterBy?: string = 'all';
    visibleProjects: any[] = [];

    constructor ( private projectService: ProjectService, private route: ActivatedRoute ) {
        this.visibleProjects = this.projectService.getProjects();
    }

    ngOnChanges() {
        this.visibleProjects = this.projectService.getProjects();
    }

    ngOnInit() {
        //if path includes a style param, we set it as the filter
        if( this.route.snapshot.params['style'] === undefined ) {
            this.filterBy = 'all';
        } else {
            this.filterBy = this.route.snapshot.params['style'];
        }
    }
}