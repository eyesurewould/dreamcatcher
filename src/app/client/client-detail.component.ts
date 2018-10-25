import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ContentfulService } from '../shared/contentful.service';
import { Entry, EntryCollection } from 'contentful';
import { Client } from '../client/client';
import { emailValidator, phoneValidator } from '../shared/client-validation';

@Component({
    selector: 'client-detail',
    templateUrl: './client-detail.component.html',
    styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

    private id: string;
    private client: Entry<any>;
    private projects: EntryCollection<any>;
    private projectCount = 0;

    clientDetailFormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', emailValidator(/^\w[\w.-]*@([\w-]+\.)+[\w-]+$/g)),
        phone: new FormControl('', phoneValidator(/^\d?[ -.]?\(?\d\d\d\)?[ -.]?\d\d\d[ -.]?\d\d\d\d$/g)),
        notes: new FormControl('')
    });

    public isEditable: boolean = false;

    constructor(private cs: ContentfulService, private route: ActivatedRoute, private router: Router) {
        route.params.subscribe(params => {
            this.id = params['id'];
        });

    }

    ngOnInit() {
        this.load(this.id);

    }

    ngOnChanges() {
        this.load(this.id);

    }

    /**
     * Load a Client entry, then get the projects for the client
     * 
     * @param id A Contentful Entry id
     */
    load(id: string) {

        this.cs.getClient(id)
            .then((responseClient) => {
                this.client = responseClient;
                console.log('why no phone? ', responseClient);
                console.log('why no phone? ', this.client.fields.phone);

                this.clientDetailFormGroup.controls['name'].setValue(this.client.fields.name);

                if (this.client.fields.email != undefined) {
                    this.clientDetailFormGroup.controls['email'].setValue(this.client.fields.email);
                }
                if (this.client.fields.phone != undefined) {
                    this.clientDetailFormGroup.controls['phone'].setValue(this.client.fields.phone);
                }
                if (this.client.fields.notes != undefined) {
                    this.clientDetailFormGroup.controls['notes'].setValue(this.client.fields.notes);
                }
            
                this.cs.getProjectsForClient(id)
                    .then((responseProjects) => {
                        this.projects = responseProjects;
                        //console.log('load: projects count ', responseProjects.items.length);
                        this.projectCount = responseProjects.items.length;

                    })
            })
            .catch((err) => {
                console.error;
            })

    }


    enableEditing() {
        //console.log('enableEditing: start ', this.clientDetailFormGroup);
        this.isEditable = true;
    }

    disableEditing() {
        //console.log('disableEditing: start');
        this.isEditable = false;
    }


    /**
     * Save current edits back to Contentful via the service
     */
    submit() {
        //console.log('submit: start');
        this.isEditable = false;

        var client = new Client();
        client.name = this.clientDetailFormGroup.controls['name'].value;
        client.email = this.clientDetailFormGroup.controls['email'].value;
        client.phone = this.clientDetailFormGroup.controls['phone'].value;
        client.notes = this.clientDetailFormGroup.controls['notes'].value;

        console.log('submit: client data to send ', client);
        this.cs.saveClient(this.id, client)
            .then((entry) => {
                console.log('submit: saved ', entry);
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
    deleteClient(id: string) {
        //console.log('deleteClient: ', id);
        this.cs.deleteClient(id)
            .then(() => {
                console.log('deleteClient: deleted ', id);
                this.router.navigate(['/clients']);
            })
            .catch((err) => {
                console.error;
            })
    }

}
