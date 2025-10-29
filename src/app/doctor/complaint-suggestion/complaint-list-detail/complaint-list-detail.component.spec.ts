import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintListDetailComponent } from './complaint-list-detail.component';

describe('ComplaintListDetailComponent', () => {
  let component: ComplaintListDetailComponent;
  let fixture: ComponentFixture<ComplaintListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintListDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
