import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorReqstDetailComponent } from './doctor-reqst-detail.component';

describe('DoctorReqstDetailComponent', () => {
  let component: DoctorReqstDetailComponent;
  let fixture: ComponentFixture<DoctorReqstDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorReqstDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorReqstDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
