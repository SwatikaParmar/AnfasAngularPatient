import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentChatListComponent } from './appointment-chat-list.component';

describe('AppointmentChatListComponent', () => {
  let component: AppointmentChatListComponent;
  let fixture: ComponentFixture<AppointmentChatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentChatListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
