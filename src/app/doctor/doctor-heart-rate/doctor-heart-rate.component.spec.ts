import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorHeartRateComponent } from './doctor-heart-rate.component';

describe('DoctorHeartRateComponent', () => {
  let component: DoctorHeartRateComponent;
  let fixture: ComponentFixture<DoctorHeartRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorHeartRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorHeartRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
