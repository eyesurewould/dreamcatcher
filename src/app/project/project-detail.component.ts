import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'project-detail',
    templateUrl: './project-detail.component.html',
    styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

    project: any;
    //any means "we expect some object but don't know the kind"

    constructor(private projectService: ProjectService, private route: ActivatedRoute) {
        //Activated Route means "what did the user click on?"
    }

    ngOnInit() {
        this.project = this.projectService.getProject(
            //+ converts to a number (not sure why)
            //snapshot means "route when the page loaded"
            +this.route.snapshot.params['id']
        );
    }
}