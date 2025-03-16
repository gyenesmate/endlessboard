import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { routeBuilderPageGuard } from './route-builder-page.guard';

describe('routeBuilderPageGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => routeBuilderPageGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
