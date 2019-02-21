import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContentfulService } from './contentful.service';
import { Image } from '../util/image';

describe('ContentfulService', () => {
  let service = ContentfulService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ HttpClientTestingModule, HttpClientModule ],
      providers: [ContentfulService]
    });
  });

  it('should be created', inject([HttpClientTestingModule, ContentfulService], (service: ContentfulService) => {
    expect(service).toBeTruthy();
  }));

  /**
   * Adding an image (asset)
   
  it('createImage should return non-error',
    (done: DoneFn) => {
      let image = new Image();
      image.title = 'test';
      image.fileName = 'example.jpeg';
      
    });
    */
});
