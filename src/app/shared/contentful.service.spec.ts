import { TestBed, inject } from '@angular/core/testing';

import { ContentfulService } from './contentful.service';
//import * as contentful from 'contentful';
//import * as contentfulMgmt from 'contentful-management';
//import { environment } from '../../environments/environment';

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
});
