import { TestBed } from '@angular/core/testing';

import { PatientSatisfactionService } from './patient-satisfaction.service';

describe('PatientSatisfactionService', () => {
  let service: PatientSatisfactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientSatisfactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
