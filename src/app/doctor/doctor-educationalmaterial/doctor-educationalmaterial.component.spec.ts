import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorEducationalmaterialComponent } from './doctor-educationalmaterial.component';

describe('DoctorEducationalmaterialComponent', () => {
  let component: DoctorEducationalmaterialComponent;
  let fixture: ComponentFixture<DoctorEducationalmaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorEducationalmaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorEducationalmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
