import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ContentfulService } from '../shared/contentful.service';
import { Entry, EntryCollection } from 'contentful';
import { Client } from '../client/client';
import { emailValidator, phoneValidator } from '../shared/client-validation';

@Component({
    selector: 'client-detail',
    templateUrl: './client-detail.component.html',
    styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit, OnDestroy {

    private id: string;
    private client: Entry<any>;
    private projects: EntryCollection<any>;
    private projectCount = 0;
    private subscriptionClient: Subscription;
    private subscriptionProjects: Subscription;

    clientDetailFormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', emailValidator(/^\w[\w.-]*@([\w-]+\.)+[\w-]+$/g)),
        phone: new FormControl('', phoneValidator(/^\d?[ -.]?\(?\d\d\d\)?[ -.]?\d\d\d[ -.]?\d\d\d\d$/g))
    });

    private isEditable: boolean = false;

    constructor(private cs: ContentfulService, private route: ActivatedRoute, private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };

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
        this.subscriptionClient = this.cs.getClient(id).subscribe(
            responseClient => {
                this.client = responseClient;

                this.clientDetailFormGroup.controls['name'].setValue(this.client.fields.name);

                if (this.client.fields.email != undefined) {
                    this.clientDetailFormGroup.controls['email'].setValue(this.client.fields.email);
                }
                if (this.client.fields.phone != undefined) {
                    this.clientDetailFormGroup.controls['phone'].setValue(this.client.fields.phone);
                }

                this.subscriptionProjects = this.cs.getProjectsForClient(id).subscribe(
                    responseProjects => {
                        this.projects = responseProjects;
                        this.projectCount = responseProjects.items.length;

                    }
                )
            }
        )
    }


    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscriptionClient.unsubscribe();
        this.subscriptionProjects.unsubscribe();
    }

    enableEditing() {
        console.log('enableEditing: start ', this.clientDetailFormGroup);
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

        var client = new Client();
        client.name = this.clientDetailFormGroup.controls['name'].value;
        client.email = this.clientDetailFormGroup.controls['email'].value;
        client.phone = this.clientDetailFormGroup.controls['phone'].value;

        console.log('submit: client data to send ', client);
        this.cs.saveClient(this.id, client);

        setTimeout(() => {
            this.router.navigate(['/client', this.id]);
        }, 1000);


    }


    /**
     * Delete a Contentful Entry
     * 
     * @param id A Contentful Entry id
     */
    deleteClient(id: string) {
        console.log('deleteClient: ', id);
        this.cs.deleteClient(id);
    }

}
