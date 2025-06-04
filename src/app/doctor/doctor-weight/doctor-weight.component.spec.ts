import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorWeightComponent } from './doctor-weight.component';

describe('DoctorWeightComponent', () => {
  let component: DoctorWeightComponent;
  let fixture: ComponentFixture<DoctorWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorWeightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
