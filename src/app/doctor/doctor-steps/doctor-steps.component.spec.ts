import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorStepsComponent } from './doctor-steps.component';

describe('DoctorStepsComponent', () => {
  let component: DoctorStepsComponent;
  let fixture: ComponentFixture<DoctorStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorStepsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
