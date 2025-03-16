import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { routeBuilderPageGuardGuard } from './route-builder-page-guard.guard';

describe('routeBuilderPageGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => routeBuilderPageGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
