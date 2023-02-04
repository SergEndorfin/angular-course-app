import { TestBed } from '@angular/core/testing';

import { AuthSessionStorageService } from './session-storage.service';

describe('SessionStorageService', () => {
  let service: AuthSessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSessionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
