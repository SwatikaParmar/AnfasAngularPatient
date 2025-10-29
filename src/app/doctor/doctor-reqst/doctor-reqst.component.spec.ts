import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorReqstComponent } from './doctor-reqst.component';

describe('DoctorReqstComponent', () => {
  let component: DoctorReqstComponent;
  let fixture: ComponentFixture<DoctorReqstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorReqstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorReqstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
