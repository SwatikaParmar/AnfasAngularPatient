import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAddEducationalmaterialComponent } from './doctor-add-educationalmaterial.component';

describe('DoctorAddEducationalmaterialComponent', () => {
  let component: DoctorAddEducationalmaterialComponent;
  let fixture: ComponentFixture<DoctorAddEducationalmaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorAddEducationalmaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAddEducationalmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
