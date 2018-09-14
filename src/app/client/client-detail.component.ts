import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContentfulService } from '../shared/contentful.service';
import { Subscription } from 'rxjs';
import { Entry, EntryCollection } from 'contentful';
import { Client } from '../client/client';
import { Project } from '../project/project';
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

    constructor(private cs: ContentfulService, private route: ActivatedRoute) {
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

                this.subscriptionProjects = this.cs.getProjectsForClient(id).subscribe(
                    responseProjects => {
                        this.projects = responseProjects;
                        this.projectCount = responseProjects.items.length;
                        console.log(this.projectCount, ' projects: ', responseProjects);
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
        console.log('enableEditing: start');
        this.isEditable = true;
    }

    disableEditing() {
        console.log('disableEditing: start');
        this.isEditable = false;
    }

    save() {
        console.log('save: start');
        this.isEditable = false;

        var client = new Client();
        client.name = this.client.fields.name;
        client.email = this.client.fields.email;
        client.phone = this.client.fields.phone;

        this.cs.saveClient(this.id, client);
    }

    onSubmit() {
        console.log('onSubmit: start');
        this.isEditable = false;

        var clientData = new Client();
        clientData.name = this.client.fields.name;
        clientData.email = this.client.fields.email;
        clientData.phone = this.client.fields.phone;

        //NOTE: If we needed to push submitted data to other components, 
        //we would use an EventEmitter to emit to listeners.
        
        clientData.name = this.clientDetailFormGroup.controls['name'].value;
        if (this.clientDetailFormGroup.controls['email'].value !== '') {
            clientData.email = this.clientDetailFormGroup.controls['email'].value;
        }
        if (this.clientDetailFormGroup.controls['phone'].value !== '') {
            clientData.phone = this.clientDetailFormGroup.controls['phone'].value;
        }
        
        this.cs.createClient(clientData);

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
