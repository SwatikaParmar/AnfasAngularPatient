import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetconsentformComponent } from './getconsentform.component';

describe('GetconsentformComponent', () => {
  let component: GetconsentformComponent;
  let fixture: ComponentFixture<GetconsentformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetconsentformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetconsentformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
