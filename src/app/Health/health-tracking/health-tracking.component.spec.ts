import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthTrackingComponent } from './health-tracking.component';

describe('HealthTrackingComponent', () => {
  let component: HealthTrackingComponent;
  let fixture: ComponentFixture<HealthTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthTrackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
