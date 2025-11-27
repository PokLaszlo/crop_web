import { TestBed } from '@angular/core/testing';

import { ProducerApi } from './producer-api';

describe('ProducerApi', () => {
  let service: ProducerApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProducerApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
