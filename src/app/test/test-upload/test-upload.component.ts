import { Component, ElementRef } from '@angular/core';
import { ContentfulService } from '../../shared/contentful.service';

@Component({
  selector: 'app-test-upload',
  templateUrl: './test-upload.component.html',
  styleUrls: ['./test-upload.component.css']
})
export class TestUploadComponent {

  private selectedFiles: FileList;

  constructor(private el: ElementRef, private uploader: ContentfulService) { }

  onFileSelected(event) {
    this.selectedFiles = event.target.files;

  }

  submit() {
    //locate the file element meant for the file upload.
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');
    let fileCount: number = inputEl.files.length;
    
    if (fileCount > 0) { // a file was selected

      for (var i = 0; i < fileCount; i++) {
        //create a new formData instance for each loop
        let formData = new FormData();
        formData.append('file', inputEl.files.item(i));

        this.uploader.uploadFile(formData);
        /*
          .subscribe((data: any) => {
            console.log('get: ', data);
          });
          */
      }

    }

  }

}
