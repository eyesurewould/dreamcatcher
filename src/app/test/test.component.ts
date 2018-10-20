import { Component, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

//const URL = 'http://localhost:3000/';
const URL = environment.contentful.urls.upload + '/spaces/' + environment.contentful.space + '/uploads';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  private selectedFiles: FileList;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/octet-stream',
      'Authorization': 'Bearer ' + environment.contentful.personalToken
    })
  };

  constructor(private http: HttpClient, private el: ElementRef) { } //, private uploader: ContentfulUploadService) { }

  onFileSelected(event) {
    this.selectedFiles = event.target.files;

  }

  submit() {
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

      //call the angular http method
      this.http
        //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
        //.post(URL, formData, this.httpOptions).pipe(map((res: Response) => res.json())).subscribe(
        .post(URL, formData, this.httpOptions).pipe(map((res: Response) => {
          return console.log('response: ', res.sys.id);
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
