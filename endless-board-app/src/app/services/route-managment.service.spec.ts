import { TestBed } from '@angular/core/testing';

import { RouteManagmentService } from './route-managment.service';

describe('RouteManagmentService', () => {
  let service: RouteManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
