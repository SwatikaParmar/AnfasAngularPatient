import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAdminEducationDetailComponent } from './doctor-admin-education-detail.component';

describe('DoctorAdminEducationDetailComponent', () => {
  let component: DoctorAdminEducationDetailComponent;
  let fixture: ComponentFixture<DoctorAdminEducationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorAdminEducationDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAdminEducationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
