import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalMaterialDetailComponent } from './educational-material-detail.component';

describe('EducationalMaterialDetailComponent', () => {
  let component: EducationalMaterialDetailComponent;
  let fixture: ComponentFixture<EducationalMaterialDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationalMaterialDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationalMaterialDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
