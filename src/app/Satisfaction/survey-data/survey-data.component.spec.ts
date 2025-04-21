import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyDataComponent } from './survey-data.component';

describe('SurveyDataComponent', () => {
  let component: SurveyDataComponent;
  let fixture: ComponentFixture<SurveyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
