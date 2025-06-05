import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAddmedicationComponent } from './doctor-addmedication.component';

describe('DoctorAddmedicationComponent', () => {
  let component: DoctorAddmedicationComponent;
  let fixture: ComponentFixture<DoctorAddmedicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorAddmedicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAddmedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
