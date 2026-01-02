import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {
  requestForm!: FormGroup;
  submitted = false;
  id: any;
  requestTypeList: any;
  selectedRequestType: string = '';
  showDescription: any;

  constructor(
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private content: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.initializeForm();
    this.getRequestType();

    if (this.id) {
      this.getRequestDetails(this.id);
    }
  }

  initializeForm() {
    this.requestForm = this.formBuilder.group({
      username: [localStorage.getItem('mrn') || '', Validators.required],
      requestTypeId: ['', Validators.required],
      discretion: ['', Validators.required], // required only if medical type
      companionName: [''], // shown only if companion type
      companionNationalId: [''],
      phoneNumber: [''],
      dob: ['']
    });
  }

getRequestDetails(id: number) {
  const mrn = localStorage.getItem('mrn') || '';

  this.content.requestDetail(id, mrn).subscribe((response: any) => {
    if (response.status) {
      const r = response.data;

      this.requestForm.patchValue({
        requestTypeId: r.requestTypeId,
        discretion: r.discretion,
        companionName: r.companionName,
        companionNationalId: r.companionNationalId,
        phoneNumber: r.phoneNumber,
        dob: r.dob
      });

      // 🔥 IMPORTANT: Now update UI + validators based on type
      this.onRequestTypeChange();
    }
  });
}


  get f() {
    return this.requestForm.controls;
  }

  backClicked() {
    this._location.back();
  }

  getRequestType() {
    let mrn = localStorage.getItem('mrn')
    this.content.getRequestType(mrn).subscribe(response => {
      if (response.status) {
        this.requestTypeList = response.data;
      }
    });
  }
onRequestTypeChange() {
  const selectedId = Number(this.requestForm.get('requestTypeId')?.value);
  this.selectedRequestType = '';
  this.showDescription = false;

  // Clear all validators first
  this.requestForm.get('discretion')?.clearValidators();
  this.requestForm.get('companionName')?.clearValidators();
  this.requestForm.get('companionNationalId')?.clearValidators();
  this.requestForm.get('phoneNumber')?.clearValidators();
  this.requestForm.get('dob')?.clearValidators();

  switch (selectedId) {
    case 1: // Medical Report
      this.selectedRequestType = 'medicalreport';
      this.showDescription = true;
      this.requestForm.get('discretion')?.setValidators([Validators.required]);
      break;

    case 6: // Companion
      this.selectedRequestType = 'companion';
      this.showDescription = true;
      this.requestForm.get('discretion')?.setValidators([Validators.required]);
      this.requestForm.get('companionName')?.setValidators([Validators.required]);
      this.requestForm.get('companionNationalId')?.setValidators([Validators.required]);
      this.requestForm.get('phoneNumber')?.setValidators([Validators.required]);
      this.requestForm.get('dob')?.setValidators([Validators.required]);
      break;

    case 7: // ✅ Hospitalization Notice Request
      this.selectedRequestType = 'hospitalization';
      this.showDescription = true;
      this.requestForm.get('discretion')?.setValidators([Validators.required]);
      break;

    default:
      // Nothing required
      break;
  }

  this.requestForm.updateValueAndValidity();
}



 onSubmit() {
  this.submitted = true;

  // ❌ Stop if form is invalid
  if (this.requestForm.invalid) {
    Object.keys(this.requestForm.controls).forEach(key => {
      const control = this.requestForm.get(key);
      control?.markAsTouched();
      control?.updateValueAndValidity();
    });
    return;
  }

  this.spinner.show();

  const requestData = {
    id: this.id ? Number(this.id) : 0,
    username: localStorage.getItem('mrn'),
    requestTypeId: this.requestForm.value.requestTypeId,
    discretion: this.requestForm.value.discretion,
    companionName: this.requestForm.value.companionName,
    companionNationalId: this.requestForm.value.companionNationalId,
    phoneNumber: this.requestForm.value.phoneNumber,
    dob: this.requestForm.value.dob
  };

  this.content.addRequest(requestData).subscribe({
    // ✅ SUCCESS (HTTP 200)
    next: (response: any) => {
      this.spinner.hide();

      if (response?.status) {
        const msg = this.id
          ? 'Updated successfully'
          : 'Added successfully';

        this.toaster.success(msg);
        this.router.navigate(['/request-list']);
      } else {
        // ⚠️ Backend returned 200 but status=false
        this.toaster.error(
          response?.message || 'Failed to save request'
        );
      }
    },

    // ❌ ERROR (HTTP 400 / 404 / 500)
    error: (err) => {
      this.spinner.hide();

      // 🔥 MOST IMPORTANT PART
      const errorMessage =
        err?.error?.message ||   // backend custom message
        err?.message ||          // angular error message
        'Something went wrong';  // fallback

      this.toaster.error(errorMessage);
    }
  });
}

}
