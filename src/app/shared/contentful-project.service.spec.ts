import { TestBed, inject } from '@angular/core/testing';

import { ContentfulProjectService } from './contentful-project.service';

describe('ContentfulProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentfulProjectService]
    });
  });

  it('should be created', inject([ContentfulProjectService], (service: ContentfulProjectService) => {
    expect(service).toBeTruthy();
  }));
});
