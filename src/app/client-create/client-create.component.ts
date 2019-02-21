import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContentfulService } from '../contentful/contentful.service';
import { Client } from '../client/client';
import { emailValidator, phoneValidator } from '../util/validation';

import { Router } from '@angular/router';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent {

  public client: Client;
  
  //TODO: RegEx patterns are from Contentful. They are NOT great
  //Patterns are duplicated here and in the ClientComponent, so
  //re-factor to a shared loaction to remove duplication.
  //Consider making them part of configuration for easy adjustment.
  clientFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', emailValidator(/^\w[\w.-]*@([\w-]+\.)+[\w-]+$/g)),
    phone: new FormControl('', phoneValidator(/^\d?[ -.]?\(?\d\d\d\)?[ -.]?\d\d\d[ -.]?\d\d\d\d$/g)),
    notes: new FormControl('')
  });

  constructor(private cs: ContentfulService, private router: Router) {
    this.client = new Client();

  }

  submit() {

    this.client.name = this.clientFormGroup.controls['name'].value;

    if (this.clientFormGroup.controls['email'].value !== '') {
      this.client.email = this.clientFormGroup.controls['email'].value;
    }
    if (this.clientFormGroup.controls['phone'].value !== '') {
      this.client.phone = this.clientFormGroup.controls['phone'].value;
    }
    if (this.clientFormGroup.controls['notes'].value !== '') {
      this.client.notes = this.clientFormGroup.controls['notes'].value;
    }
    
    //console.log('submit: client data to send ', this.client);
    this.cs.createClient(this.client)
      .then((response) => {
        this.router.navigate(['/client', response.sys.id]);
      });
      
  }

}
