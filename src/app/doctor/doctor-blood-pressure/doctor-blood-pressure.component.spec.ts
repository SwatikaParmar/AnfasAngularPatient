import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorBloodPressureComponent } from './doctor-blood-pressure.component';

describe('DoctorBloodPressureComponent', () => {
  let component: DoctorBloodPressureComponent;
  let fixture: ComponentFixture<DoctorBloodPressureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorBloodPressureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorBloodPressureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
