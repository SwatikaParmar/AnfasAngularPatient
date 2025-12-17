import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAdminEducationComponent } from './doctor-admin-education.component';

describe('DoctorAdminEducationComponent', () => {
  let component: DoctorAdminEducationComponent;
  let fixture: ComponentFixture<DoctorAdminEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorAdminEducationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAdminEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
