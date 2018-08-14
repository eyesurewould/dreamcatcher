import { TestBed, inject } from '@angular/core/testing';

import { ContentfulAssetService } from './contentful-asset.service';

describe('ContentfulAssetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentfulAssetService]
    });
  });

  it('should be created', inject([ContentfulAssetService], (service: ContentfulAssetService) => {
    expect(service).toBeTruthy();
  }));
});
