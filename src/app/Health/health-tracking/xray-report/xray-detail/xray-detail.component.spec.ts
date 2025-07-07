import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XrayDetailComponent } from './xray-detail.component';

describe('XrayDetailComponent', () => {
  let component: XrayDetailComponent;
  let fixture: ComponentFixture<XrayDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XrayDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XrayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
