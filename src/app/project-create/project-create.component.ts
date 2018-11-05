import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContentfulService } from '../shared/contentful.service';
import { Project } from '../project/project';

import { Router } from '@angular/router';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent {

  public id: string;
  public project: Project;

  projectFormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    style: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    size: new FormControl(''),
    location: new FormControl('', [Validators.required]),
    timeEstimate: new FormControl(),
  });

  constructor(private cs: ContentfulService, private router: Router, private route: ActivatedRoute) {
    this.project = new Project();

    route.params.subscribe(params => {
      this.id = params['id'];
      this.project.clientRef = this.id;
    });

  }

  submit() {
    this.project.title = this.projectFormGroup.controls['title'].value;

    if (this.projectFormGroup.controls['status'].value !== '') {
      this.project.status = this.projectFormGroup.controls['status'].value;
    }
    if (this.projectFormGroup.controls['style'].value !== '') {
      this.project.style = this.projectFormGroup.controls['style'].value;
    }
    if (this.projectFormGroup.controls['description'].value !== '') {
      this.project.description = this.projectFormGroup.controls['description'].value;
    }
    if (this.projectFormGroup.controls['size'].value !== '') {
      this.project.size = this.projectFormGroup.controls['size'].value;
    }
    if (this.projectFormGroup.controls['location'].value !== '') {
      this.project.location = [this.projectFormGroup.controls['location'].value];
    }
    if (this.projectFormGroup.controls['timeEstimate'].value !== '') {
      this.project.timeEstimate = this.projectFormGroup.controls['timeEstimate'].value;
    }
    //console.log('submit: this.project ', this.project);

    this.cs.createProject(this.project)
      .then((entry) => {
        //introduce a slight pause here so the new project has time to 
        //appear in subsequent query for all projects for this client
        //TODO: Investigate a cleaner way to handle this - reach out
        //to Contenful dev team and see if they have a webhook or something
        setTimeout(() => {
          this.router.navigate(['/client', this.id]);
        },
          400);
        
      });

  }

}
