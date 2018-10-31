import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-test-upload',
  templateUrl: './test-upload.component.html',
  styleUrls: ['./test-upload.component.css']
})
export class TestUploadComponent {
  //private apiBaseUrl = 'http://localhost:3000'; //this is a fake url for a local Node.js server
  public apiBaseUrl = environment.contentful.urls.upload + '/spaces/' + environment.contentful.space + '/uploads';
  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  /**
   * Handles the change event of the input tag,
   * Extracts the image file uploaded and 
   * makes an Http request with the image file.
   */
  handleInputChange(event) {

    var image = event.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!image.type.match(pattern)) {
      console.error('File is not an image');
      //of course you can show an alert message here
      return;
    }

    let endPoint = '';    // '/upload/profileImage'; //use your own API endpoint
    let headers = new HttpHeaders();
    headers.set('Authorization', 'Bearer ' + environment.contentful.personalToken);
    headers.set('Content-Type', 'application/octet-stream');
    //headers.set('Upload-Content-Type', image.type)

    this.makeRequest(endPoint, 'POST', image, headers).subscribe(
      response => { this.handleSuccess(response); },
      error => { this.handleError(error); }
    );

  }

  /**
   * Makes the HTTP request and returns an Observable
   */
  private makeRequest(
      endPoint: string,
      method: string, body = null,
      headers: HttpHeaders = new HttpHeaders()): Observable<any> {

    let url = this.apiBaseUrl + endPoint;
    this.headers = headers;
    if (method == 'GET') {
      let options = ({ headers: this.headers });
      return this.http.get(url, options)
        .pipe(map(this.extractData))
        .pipe(catchError(this.extractError));
    } else if (method == 'POST') {
      let options = ({ headers: this.headers });
      return this.http.post(url, body, options)
        .pipe(map(this.extractData))
        .pipe(catchError(this.extractError));
    }
  }

  /**
   * Extracts the response from the API response.
   */
  private extractData(res) {    //was (res: HttpResponse) but we had an error
    let body = res.json();
    return body.response || {};
  }

  private extractError(res) {   //was (res: HttpResponse) but we had an error
    let errMsg = 'Error received from the API';
    return errMsg;
  }

  private handleSuccess(response) {
    console.log('Successfully uploaded image');
    //provide your own implementation of handling the response from API
  }

  private handleError(errror) {
    console.error('Error uploading image')
    //provide your own implementation of displaying the error message
  }

}