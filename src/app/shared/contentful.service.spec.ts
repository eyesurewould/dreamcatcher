import { TestBed, inject } from '@angular/core/testing';

import { ContentfulService } from './contentful.service';
import * as contentful from 'contentful';
import * as contentfulMgmt from 'contentful-management';

import { environment } from '../../environments/environment';

describe('ContentfulServiceService', () => {

  let contentfulService: ContentfulService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentfulService]
    });

    contentfulService = new ContentfulService();
  });

  it('#getClients should return value from observable',
    (done: DoneFn) => {
      contentfulService.getClients().subscribe(value => {
      expect(value).toBe('observable value');
      done();
    });
  });

//  it('should be created', inject([ContentfulService], (service: ContentfulService) => {
//    expect(service).toBeTruthy();
//  }));
});
