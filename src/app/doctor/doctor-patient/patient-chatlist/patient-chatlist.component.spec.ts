import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientChatlistComponent } from './patient-chatlist.component';

describe('PatientChatlistComponent', () => {
  let component: PatientChatlistComponent;
  let fixture: ComponentFixture<PatientChatlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientChatlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientChatlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
