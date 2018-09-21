import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  private id: string;
  private project: Project;

  projectFormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    style: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    size: new FormControl(''),
    location: new FormControl('', [Validators.required]),
    timeEstimate: new FormControl(''),
  });

  constructor(private cs: ContentfulService, private router: Router, private route: ActivatedRoute) {
    this.project = new Project();

    route.params.subscribe(params => {
      this.id = params['id'];
      this.project.clientRef = this.id;
    });

  }

  submit() {

    //NOTE: If we needed to push submitted data to other components, 
    //we would use an EventEmitter to emit to listeners.

    this.project.title = this.projectFormGroup.controls['title'].value;
    this.project.status = this.projectFormGroup.controls['status'].value;
    this.project.style = this.projectFormGroup.controls['style'].value;
    this.project.description = this.projectFormGroup.controls['description'].value;
    this.project.size = this.projectFormGroup.controls['size'].value;
    this.project.location = [this.projectFormGroup.controls['location'].value];
    this.project.timeEstimate = this.projectFormGroup.controls['timeEstimate'].value;

    console.log('submit: this.project ', this.project);

    this.cs.createProject(this.project)
      .then(() => {
        console.log('submit: service call completed');
        this.router.navigate(['/client', this.id]);
      }
    );

  }

}
