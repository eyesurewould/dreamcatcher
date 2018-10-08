import { TestBed, inject } from '@angular/core/testing';

import { TestPromiseService } from './test-promise.service';

describe('TestPromiseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestPromiseService]
    });
  });

  it('should be created', inject([TestPromiseService], (service: TestPromiseService) => {
    expect(service).toBeTruthy();
  }));
});
