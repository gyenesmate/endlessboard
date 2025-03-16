import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimbingWallComponent } from './climbing-wall.component';

describe('ClimbingWallComponent', () => {
  let component: ClimbingWallComponent;
  let fixture: ComponentFixture<ClimbingWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClimbingWallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClimbingWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
