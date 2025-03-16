import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteBuilderPageComponent } from './route-builder-page.component';

describe('RouteBuilderPageComponent', () => {
  let component: RouteBuilderPageComponent;
  let fixture: ComponentFixture<RouteBuilderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteBuilderPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteBuilderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
