import { TestBed } from '@angular/core/testing';

import { CropApi } from './crop-api';

describe('CropApi', () => {
  let service: CropApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
