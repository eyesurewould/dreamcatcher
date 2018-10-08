import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ContentfulService } from '../shared/contentful.service';
import { Entry } from 'contentful';
import { Project } from '../project/project';

@Component({
    selector: 'project-detail',
    templateUrl: './project-detail.component.html',
    styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit, OnChanges {

    private id: string;
    private project: Entry<any>;

    projectDetailFormGroup = new FormGroup({
        title: new FormControl('', [Validators.required]),
        style: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        size: new FormControl(''),
        location: new FormControl(''),
        timeEstimate: new FormControl(''),
    });

    private isEditable: boolean = false;

    constructor(private cs: ContentfulService, private router: Router, private route: ActivatedRoute) {
        //TODO: Resolve the routing issue!!! Below we try to force route reload whenever params change;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;

        route.params.subscribe(params => {
            this.id = params['id'];
        });

        /*
        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                console.log(evt);
                // trick the Router into believing it's last link wasn't previously loaded
                this.router.navigated = false;
                // if you need to scroll back to top, here is the right place
                window.scrollTo(0, 0);
            }
        }); */
    }

    ngOnInit() {
        this.route.params.subscribe(routeParams => {
            this.load(routeParams.id);
        });

    }

    ngOnChanges() {
        this.route.params.subscribe(routeParams => {
            this.load(routeParams.id);
        });

    }

    /**
     * Load a Project entry
     * 
     * @param id A Contentful Entry id
     */
    load(id: string) {

        this.cs.getProject(id)
            .then((responseProject) => {
                this.project = responseProject;

                if (this.project.fields.style != undefined) {
                    this.projectDetailFormGroup.controls['title'].setValue(this.project.fields.title);
                }
                if (this.project.fields.style != undefined) {
                    this.projectDetailFormGroup.controls['style'].setValue(this.project.fields.style);
                }
                if (this.project.fields.status != undefined) {
                    this.projectDetailFormGroup.controls['status'].setValue(this.project.fields.status);
                }
                if (this.project.fields.description != undefined) {
                    this.projectDetailFormGroup.controls['description'].setValue(this.project.fields.description);
                }
                if (this.project.fields.size != undefined) {
                    this.projectDetailFormGroup.controls['size'].setValue(this.project.fields.size);
                }
                if (this.project.fields.location != undefined) {
                    this.projectDetailFormGroup.controls['location'].setValue(this.project.fields.location);
                }
                if (this.project.fields.timeEstimate != undefined) {
                    this.projectDetailFormGroup.controls['timeEstimate'].setValue(this.project.fields.timeEstimate);
                }

            })
            .catch((err) => {
                console.error;
            })

    }


    enableEditing() {
        console.log('enableEditing: start');
        this.isEditable = true;
    }

    disableEditing() {
        console.log('disableEditing: start');
        this.isEditable = false;
    }


    /**
     * Save current edits back to Contentful via the service
     */
    submit() {
        console.log('submit: start');
        this.isEditable = false;

        var project = new Project();
        project.title = this.project.fields.title;
        project.style = this.project.fields.style;
        project.status = this.project.fields.status;
        project.description = this.project.fields.description;
        project.size = this.project.fields.size;
        project.location = this.project.fields.location;
        project.timeEstimate = this.project.fields.timeEstimate;

        //NOTE: If we needed to push submitted data to other components, 
        //we would use an EventEmitter to emit to listeners.

        project.title = this.projectDetailFormGroup.controls['title'].value;

        if (this.projectDetailFormGroup.controls['style'].value !== '') {
            project.style = this.projectDetailFormGroup.controls['style'].value;
        }
        if (this.projectDetailFormGroup.controls['status'].value !== '') {
            project.status = this.projectDetailFormGroup.controls['status'].value;
        }

        console.log('submit: project data to send ', project);
        this.cs.saveProject(this.project.sys.id, project)
            .then((entry) => {
                console.log('submit: saved ', entry);
                //now navigate so the page is re-loaded
            })
            .catch((err) => {
                console.error;
            })

    }

    /**
     * Delete a Contentful Entry
     * 
     * @param id A Contentful Entry id
     */
    deleteProject(id: string) {
        console.log('deleteProject: ', id);
        this.cs.deleteProject(id)
            .then(() => {
                console.log('deleteProject: deleted ');
                this.router.navigate(['/projects']);
            })
            .catch((err) => {
                console.error;
            })
    }

}