import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorRecordsComponent } from './doctor-records.component';

describe('DoctorRecordsComponent', () => {
  let component: DoctorRecordsComponent;
  let fixture: ComponentFixture<DoctorRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
