import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitDiagnoseComponent } from './visit-diagnose.component';

describe('VisitDiagnoseComponent', () => {
  let component: VisitDiagnoseComponent;
  let fixture: ComponentFixture<VisitDiagnoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitDiagnoseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitDiagnoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
