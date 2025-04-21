import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfactionFormComponent } from './satisfaction-form.component';

describe('SatisfactionFormComponent', () => {
  let component: SatisfactionFormComponent;
  let fixture: ComponentFixture<SatisfactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SatisfactionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatisfactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
