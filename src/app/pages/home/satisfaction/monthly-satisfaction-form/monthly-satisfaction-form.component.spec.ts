import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySatisfactionFormComponent } from './monthly-satisfaction-form.component';

describe('MonthlySatisfactionFormComponent', () => {
  let component: MonthlySatisfactionFormComponent;
  let fixture: ComponentFixture<MonthlySatisfactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlySatisfactionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlySatisfactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
