import { TestBed } from '@angular/core/testing';

import { Forcast5Service } from './forcast-5.service';

describe('Forcast5Service', () => {
  let service: Forcast5Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Forcast5Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
