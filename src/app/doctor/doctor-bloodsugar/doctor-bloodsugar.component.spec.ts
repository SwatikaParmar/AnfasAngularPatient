import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorBloodsugarComponent } from './doctor-bloodsugar.component';

describe('DoctorBloodsugarComponent', () => {
  let component: DoctorBloodsugarComponent;
  let fixture: ComponentFixture<DoctorBloodsugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorBloodsugarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorBloodsugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
