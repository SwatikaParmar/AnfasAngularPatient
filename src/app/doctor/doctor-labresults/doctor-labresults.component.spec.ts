import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorLabresultsComponent } from './doctor-labresults.component';

describe('DoctorLabresultsComponent', () => {
  let component: DoctorLabresultsComponent;
  let fixture: ComponentFixture<DoctorLabresultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorLabresultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorLabresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
