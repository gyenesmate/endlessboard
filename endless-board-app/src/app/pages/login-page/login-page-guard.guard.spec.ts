import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginPageGuardGuard } from './login-page-guard.guard';

describe('loginPageGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginPageGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
