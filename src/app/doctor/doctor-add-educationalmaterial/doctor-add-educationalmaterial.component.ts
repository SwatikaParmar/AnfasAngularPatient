import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-doctor-add-educationalmaterial',
  templateUrl: './doctor-add-educationalmaterial.component.html',
  styleUrls: ['./doctor-add-educationalmaterial.component.css']
})
export class DoctorAddEducationalmaterialComponent {

  eduForm!: FormGroup;
  selectedFile: File | null = null;
selectedFileName: string = '';

    constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private fb: FormBuilder,
  ){ 
      this.eduForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      file: [null, Validators.required]
    });
  }


onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
    this.selectedFileName = this.selectedFile.name;

    // Patch the form control manually if needed
    this.eduForm.patchValue({ file: this.selectedFile });
    this.eduForm.get('file')?.updateValueAndValidity();
  }
}

 submitForm() {
  if (this.eduForm.invalid) {
    this.eduForm.markAllAsTouched();
    return;
  }

  const payload = {
    Id: '', // leave blank or add actual ID if updating
    Title: this.eduForm.value.title,
    Description: this.eduForm.value.description,
    File: this.selectedFile, // this must be a File object
    CareProviderCode: localStorage.getItem('code') || ''
  };
this.spinner.show();
  this.contentService.addEduMaterial(payload).subscribe({
    next: (response) => {
      if (response.isSuccess === true) {
        this.toastrService.success(response.messages);
        this.spinner.hide();
        this._location.back();
      } else {
                this.spinner.hide();

        this.toastrService.error(response.messages);
      }
    },
    error: () => {
      this.toastrService.error('Something went wrong');
    }
  });
}


 backClicked() {
        this._location.back();
      } 
}
