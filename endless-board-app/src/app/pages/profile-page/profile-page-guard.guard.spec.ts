import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { profilePageGuardGuard } from './profile-page-guard.guard';

describe('profilePageGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => profilePageGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
