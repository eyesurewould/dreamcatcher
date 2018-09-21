import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

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
    private subscription: Subscription;
    
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

    constructor( private cs: ContentfulService, private router: Router, private activeRoute: ActivatedRoute ) {
//TODO: Resolve the routing issue!!! Below we try to force route reload whenever params change;
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

    load(id: string) {
        console.log('load: project entry id ', id);

        this.subscription = this.cs.getProject(id).subscribe(
            responseProject => {
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
        
                console.log('load: project: ', responseProject);
            }
        )

    }

    ngOnInit() {
        this.activeRoute.params.subscribe(routeParams => {
            this.load(routeParams.id);
        });

    }

    ngOnChanges() {
        this.activeRoute.params.subscribe(routeParams => {
            this.load(routeParams.id);
        });

    }

    enableEditing() {
        console.log('enableEditing: start');
        this.isEditable = true;
    }

    disableEditing() {
        console.log('disableEditing: start');
        this.isEditable = false;
    }

    onSubmit() {
        console.log('onSubmit: start');
        this.isEditable = false;

        var projectData = new Project();
        projectData.title = this.project.fields.title;
        projectData.style = this.project.fields.style;
        projectData.status = this.project.fields.status;
        projectData.description = this.project.fields.description;
        projectData.size = this.project.fields.size;
        projectData.location = this.project.fields.location;
        projectData.timeEstimate = this.project.fields.timeEstimate;

        //NOTE: If we needed to push submitted data to other components, 
        //we would use an EventEmitter to emit to listeners.
        
        projectData.title = this.projectDetailFormGroup.controls['title'].value;
        
        if (this.projectDetailFormGroup.controls['style'].value !== '') {
            projectData.style = this.projectDetailFormGroup.controls['style'].value;
        }
        if (this.projectDetailFormGroup.controls['status'].value !== '') {
            projectData.status = this.projectDetailFormGroup.controls['status'].value;
        }
        
        this.cs.saveProject(this.project.sys.id, projectData);

    }

    /**
     * Delete a Contentful Entry
     * 
     * @param id A Contentful Entry id
     */
    deleteProject(id: string) {
        console.log('deleteProject: ', id);
        this.cs.deleteProject(id);
    }

}