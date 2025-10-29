import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintListDoctorComponent } from './complaint-list-doctor.component';

describe('ComplaintListDoctorComponent', () => {
  let component: ComplaintListDoctorComponent;
  let fixture: ComponentFixture<ComplaintListDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintListDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintListDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
