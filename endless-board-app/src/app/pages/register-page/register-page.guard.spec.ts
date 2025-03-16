import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { registerPageGuard } from './register-page.guard';

describe('registerPageGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => registerPageGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
