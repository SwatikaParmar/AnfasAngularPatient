import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsAddComponent } from './patients-add.component';

describe('PatientsAddComponent', () => {
  let component: PatientsAddComponent;
  let fixture: ComponentFixture<PatientsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
