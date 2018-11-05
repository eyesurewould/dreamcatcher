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

  /**
   * Adding an image (asset)
   */
  it('createImage should return non-error',
    (done: DoneFn) => {
      let image = new Image();
      image.title = 'test';
      image.fileName = 'example.jpeg';
      
    });
});
