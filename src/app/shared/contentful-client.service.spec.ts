import { TestBed, inject } from '@angular/core/testing';

import { ContentfulClientService } from './contentful-client.service';

describe('ContentfulClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentfulClientService]
    });
  });

  it('should be created', inject([ContentfulClientService], (service: ContentfulClientService) => {
    expect(service).toBeTruthy();
  }));
});
