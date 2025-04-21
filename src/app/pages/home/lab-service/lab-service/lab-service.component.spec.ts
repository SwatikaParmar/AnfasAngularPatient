import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabServiceComponent } from './lab-service.component';

describe('LabServiceComponent', () => {
  let component: LabServiceComponent;
  let fixture: ComponentFixture<LabServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
