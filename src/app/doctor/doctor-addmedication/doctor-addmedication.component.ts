import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-doctor-addmedication',
  templateUrl: './doctor-addmedication.component.html',
  styleUrls: ['./doctor-addmedication.component.css']
})
export class DoctorAddmedicationComponent {
 medicationForm!: FormGroup;
  mrn: any;
  medicationId: any;
  isEditMode = false;

    constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private fb: FormBuilder,
  ){ }


    ngOnInit(): void {
  this.mrn = this.route.snapshot.params['id'];
  this.medicationId = this.route.snapshot.params['id2'];

  this.medicationForm = this.fb.group({
    medicationId: [0], // default 0; used in update
    mrn: [this.mrn],
    careProviderCode: [localStorage.getItem('code')],
    medicationName: ['', Validators.required],
    dosage: ['', Validators.required],
    frequency: ['', Validators.required],
    instructions: [''],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
  });

  // If medicationId is present, we're in edit mode
  if (this.medicationId) {
    this.isEditMode = true;
    this.getMedicationDetails();
  }
}


getMedicationDetails(): void {
  this.spinner.show();
  this.contentService.medicationDetail({ medicationId: this.medicationId }).subscribe(
    (response) => {
      this.spinner.hide();
      if (response?.isSuccess && response?.data) {
        this.medicationForm.patchValue(response.data);
      } else {
        this.toastrService.error(response?.messages || 'Failed to fetch medication details.');
      }
    },
    (error) => {
      this.spinner.hide();
      this.toastrService.error('Error fetching medication details.');
    }
  );
}


 addMedication(): void {
  if (this.medicationForm.invalid) {
    this.medicationForm.markAllAsTouched();
    return;
  }

  this.spinner.show();

  const formData = this.medicationForm.value;

  const request$ = this.isEditMode
    ? this.contentService.addMedication(formData) // 🔁 make sure to implement this
    : this.contentService.addMedication(formData);

  request$.subscribe(
    (response) => {
      this.spinner.hide();
      if (response?.isSuccess) {
        this.toastrService.success(response.messages);
        this._location.back();
      } else {
        this.toastrService.error(response?.messages || 'Something went wrong.');
      }
    },
    (error) => {
      this.spinner.hide();
      this.toastrService.error('Server error occurred.');
    }
  );
}




     backClicked() {
        this._location.back();
      } 
  }


