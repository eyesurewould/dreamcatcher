import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ContentfulService } from '../shared/contentful.service';
import { Entry } from 'contentful';
import { Project } from '../project/project';
import { Image } from '../shared/image';

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

    private selectedFiles: FileList;

    private isEditable: boolean = false;
    private saving = false;

    constructor(private cs: ContentfulService, private router: Router, private route: ActivatedRoute) {
        //TODO: Resolve the routing issue!!! 
        //Below we try to force route reload whenever params 
        //change but caching re-uses stale content
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;

        route.params.subscribe(params => {
            this.id = params['id'];
        });

        /* IN PROGRESS
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

                var fields = this.projectDetailFormGroup.controls;

                if (this.project.fields.title != undefined) {
                    fields['title'].setValue(this.project.fields.title);
                }
                if (this.project.fields.style != undefined) {
                    fields['style'].setValue(this.project.fields.style);
                }
                if (this.project.fields.status != undefined) {
                    fields['status'].setValue(this.project.fields.status);
                }
                if (this.project.fields.description != undefined) {
                    fields['description'].setValue(this.project.fields.description);
                }
                if (this.project.fields.size != undefined) {
                    fields['size'].setValue(this.project.fields.size);
                }
                if (this.project.fields.location != undefined) {
                    fields['location'].setValue(this.project.fields.location);
                }
                if (this.project.fields.timeEstimate != undefined) {
                    fields['timeEstimate'].setValue(this.project.fields.timeEstimate);
                }

            })
            .catch((err) => {
                console.error;
            })

    }


    enableEditing() {
        //console.log('enableEditing: start');
        this.isEditable = true;
    }

    disableEditing() {
        //console.log('disableEditing: start');
        this.isEditable = false;
    }

    /**
     * Each time the file select dialog is used, we REPLACE the
     * set of selected files to be uploaded on submit.
     * @param event 
     */
    onFileSelected(event) {
        this.selectedFiles = event.target.files;
        
    }

    /**
     * Save current edits back to Contentful via the service
     */
    submit() {
        //console.log('submit: start');
        this.isEditable = false;
        this.saving = true;

        var project = new Project();
        var fields = this.projectDetailFormGroup.controls;

            project.title = fields['title'].value;
        if (fields['style'].touched && fields['style'].value !== '') {
            project.style = fields['style'].value;
        }
        if (fields['status'].touched && fields['status'].value !== '') {
            project.status = fields['status'].value;
        }
        if (fields['description'].touched && fields['description'].value !== '') {
            project.description = fields['description'].value;
        }
        if (fields['size'].touched && fields['size'].value !== '') {
            project.size = fields['size'].value;
        }
        if (fields['location'].touched && fields['location'].value !== '') {
            project.location = fields['location'].value;
        }
        if (fields['timeEstimate'].touched && fields['timeEstimate'].value !== '') {
            project.timeEstimate = fields['timeEstimate'].value;
        }
/*
        if (this.selectedFiles !== null) {

            // IN PROGRESS
            //here we are in the component back-end and we want to gather the File objects 
            //and provide them to the service for uploading. We should keep them as true
            //File objects versus trying to manipulate them into something else (and
            //currently we do that since the whole FileList is stuffed into a local var)

            
            let newAssets: Image[];
            for(var i = 0; i < this.selectedFiles.length; i++) {
                let image = new Image();
                image.fileName = this.selectedFiles[i].name;
                image.type = this.selectedFiles[i].type;
                image.title = this.selectedFiles[i].name;
                image.file = <File>this.selectedFiles[i];

                console.log('a new image ', image);
                newAssets[i] = image;
            }; 

            //console.log('all new images ', this.selectedFiles);
            project.assets = this.selectedFiles;
        }
*/
        //console.log('submit: project data to send ', project);
        this.cs.saveProject(this.project.sys.id, project)
            .then((entry) => {
                //now navigate so the page is re-loaded
                this.saving = false;
                this.router.navigate(['/project', this.project.sys.id]);
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
        //console.log('deleteProject: ', id);
        this.cs.deleteProject(id)
            .then(() => {
                console.log('deleteProject: deleted ', id);
                this.router.navigate(['/projects']);
            })
            .catch((err) => {
                console.error;
            })
    }

}