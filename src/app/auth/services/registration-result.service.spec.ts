import { TestBed } from '@angular/core/testing';

import { RegistrationResultService } from './registration-result.service';

describe('RegistrationResultService', () => {
  let service: RegistrationResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
