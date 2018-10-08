import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContentfulService } from '../shared/contentful.service';
import { Client } from '../client/client';
import { emailValidator, phoneValidator } from '../shared/client-validation';

import { Router } from '@angular/router';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent {

  private client: Client;
  
  //RegEx for a US Phone (the Contentful pattern!!)
  // ^\d?[ -.]?\(?\d\d\d\)?[ -.]?\d\d\d[ -.]?\d\d\d\d$ 
  //RegEx for Email (from Contentful!!??)
  // ^\w[\w.-]*@([\w-]+\.)+[\w-]+$ (doesn't seem very clean)
  clientFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', emailValidator(/^\w[\w.-]*@([\w-]+\.)+[\w-]+$/g)),
    phone: new FormControl('', phoneValidator(/^\d?[ -.]?\(?\d\d\d\)?[ -.]?\d\d\d[ -.]?\d\d\d\d$/g))
  });

  constructor(private cs: ContentfulService, private router: Router) {
    this.client = new Client();

  }

  submit() {

    //NOTE: If we needed to push submitted data to other components, 
    //we would use an EventEmitter to emit to listeners.
    this.client.name = this.clientFormGroup.controls['name'].value;

    if (this.clientFormGroup.controls['email'].value !== '') {
      this.client.email = this.clientFormGroup.controls['email'].value;
    }
    if (this.clientFormGroup.controls['phone'].value !== '') {
      this.client.phone = this.clientFormGroup.controls['phone'].value;
    }
    
    this.cs.createClient(this.client)
      .then((response) => {
        this.router.navigate(['/client', response.sys.id]);
      });
      
  }

}
