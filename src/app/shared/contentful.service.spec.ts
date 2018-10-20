import { TestBed, inject } from '@angular/core/testing';

import { ContentfulService } from './contentful.service';
//import * as contentful from 'contentful';
//import * as contentfulMgmt from 'contentful-management';
//import { environment } from '../../environments/environment';
import { Image } from './image';

describe('ContentfulService', () => {
  let service = ContentfulService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentfulService]
    });
  });

  it('should be created', inject([ContentfulService], (service: ContentfulService) => {
    expect(service).toBeTruthy();
  }));

  //IN PROGRESS - first time creating tests for a service, 
  //so not sure how to properly mock it
  /*
  it('#getClients should return value from observable',
    (done: DoneFn) => {
      service.getClients('test', null, 5, 0).subscribe(value => {
        console.log(value);
        expect(value).toBe('observable value');
        done();
      });
    });
  */


  /**
   * Adding an image (asset)
   */
  it('createImage should return non-error',
    (done: DoneFn) => {
      let image = new Image();
      image.title = 'test';
      image.fileName = 'example.jpeg';
      
      //service.createImage(image).subscribe(value => {
      //  console.log(value);
      //  expect(value).toBe('non-error');
      //  done();
      //});
    });
});
