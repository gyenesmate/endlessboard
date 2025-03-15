import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteSearchPageComponent } from './route-search-page.component';

describe('RouteSearchPageComponent', () => {
  let component: RouteSearchPageComponent;
  let fixture: ComponentFixture<RouteSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteSearchPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
