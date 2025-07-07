import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XrayReportComponent } from './xray-report.component';

describe('XrayReportComponent', () => {
  let component: XrayReportComponent;
  let fixture: ComponentFixture<XrayReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XrayReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XrayReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
