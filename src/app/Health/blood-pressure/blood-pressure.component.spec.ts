import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloddPressureComponent } from './blood-pressure.component';

describe('BloddPressureComponent', () => {
  let component: BloddPressureComponent;
  let fixture: ComponentFixture<BloddPressureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloddPressureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloddPressureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
