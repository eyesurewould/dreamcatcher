import { Component, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { FormGroup, FormControl } from '@angular/forms';

import { ContentfulService } from '../shared/contentful.service';

//const URL = 'http://localhost:3000/';
const URL = environment.contentful.urls.upload + '/spaces/' + environment.contentful.space + '/uploads';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  public selectedFiles: FileList;

  form = new FormGroup({
    name: new FormControl(""),
    file: new FormControl("")
  });

  constructor(private http: HttpClient, private el: ElementRef, private cs: ContentfulService) { 


  } 

  onFileSelected(event) {
    this.selectedFiles = event.target.files;

  }

  submit() {
    console.log('submit: ', this.form.controls['file']);
    console.log('submit: ', this.selectedFiles);

    let imageId = this.cs.upload(this.selectedFiles);

    /*
    //locate the file element meant for the file upload.
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');
    let fileCount: number = inputEl.files.length;
    console.log('the count: ', fileCount);

    if (fileCount > 0) {
      let formData = new FormData();
      formData.append('file', inputEl.files.item(0));

      let imageId = this.cs.uploadFile(formData);

      console.log('the id: ', imageId);
    }
    */
  }

  OLDsubmit() {
    //locate the file element meant for the file upload.
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');

    //get the total amount of files attached to the file input.
    let fileCount: number = inputEl.files.length;
    console.log('the count: ', fileCount)

    //create a new fromdata instance
    let formData = new FormData();
    //check if the filecount is greater than zero, to be sure a file was selected.
    if (fileCount > 0) { // a file was selected
      //append the key name 'photo' with the first file in the element
      formData.append('file', inputEl.files.item(0));
      console.log('the data: ', inputEl.files.item(0))

      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/octet-stream',
        'Authorization': 'Bearer ' + environment.contentful.personalToken
      });

      //call the angular http method
      this.http
        //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
        //.post(URL, formData, this.httpOptions).pipe(map((res: Response) => res.json())).subscribe(
        .post(URL, formData, {
          headers: httpHeaders,
          responseType: 'json'
        }).pipe(map((res: Response) => {
          var sys;
          var id = null;
          let resultJson = JSON.stringify(res);
          let result = JSON.parse(resultJson);
          if (result.sys != null) {
            sys = result.sys;
            if (result.sys.id != null) {
              id = result.sys.id;
            }
          }
          console.log('response: ', id);
          return id;
        }
        )).subscribe(
          //map the success function and alert the response
          (success) => {
            console.log(success);
          },
          (error) => console.log(error))
    }

  }

}
