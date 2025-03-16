import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { profilePageGuard } from './profile-page.guard';

describe('profilePageGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => profilePageGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
