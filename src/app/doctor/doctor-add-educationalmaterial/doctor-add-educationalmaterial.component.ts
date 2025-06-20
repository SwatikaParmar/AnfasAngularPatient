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
  id: any;
  detail: any;
  patientList: any;
  totalItems: any;
  existingFileName: any;

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

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.loadDetail();
    }
  }
  
onFileChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
    this.selectedFileName = this.selectedFile.name;

    this.eduForm.patchValue({ file: this.selectedFile });

    // Ensure validator is set if user selects a new file
    this.eduForm.get('file')?.setValidators(Validators.required);
    this.eduForm.get('file')?.updateValueAndValidity();
  }
}



submitForm() {
  if (this.eduForm.invalid) {
    this.eduForm.markAllAsTouched();
    return;
  }

  const payload = {
    Id: this.detail?.id || '', // Add ID if editing
    Title: this.eduForm.value.title,
    Description: this.eduForm.value.description,
    File: this.selectedFile, // new file from user, or null if not changed
    CareProviderCode: localStorage.getItem('code') || ''
  };

  this.spinner.show();
  this.contentService.addEduMaterial(payload).subscribe({
    next: (response) => {
      this.spinner.hide();
      if (response.isSuccess === true) {
        this.toastrService.success(response.messages);
        this._location.back();
      } else {
        this.toastrService.error(response.messages);
      }
    },
    error: () => {
      this.spinner.hide();
      this.toastrService.error('Something went wrong');
    }
  });
}


loadDetail(): void {
  this.spinner.show();
  this.contentService.geteducationalMaterialDetail(this.id).subscribe({
    next: (response) => {
      if (response.isSuccess) {
        this.detail = response.data.educationMaterialDetail;
        this.patientList = response.data.patients || [];
        this.totalItems = this.patientList.length;
this.existingFileName = this.detail?.contentUrl || ''; // Adjust key as per API

        // Patch form values
        this.eduForm.patchValue({
          title: this.detail.title,
          description: this.detail.description
          // file can't be patched like this if it's a file; skip or handle separately
        });

           // Remove required validator for 'file' if existing file is present
      if (this.existingFileName) {
        this.eduForm.get('file')?.clearValidators();
        this.eduForm.get('file')?.updateValueAndValidity();
      }
      
        // If the file is from server and you want to display it, store its name/path for reference (not patch into form directly)
     //   this.selectedFileFromServer = this.detail.file; // Optional for display
      } else {
  
      }
      this.spinner.hide();
    },
    error: (err) => {

      this.spinner.hide();
    
    }
  });
}

 backClicked() {
        this._location.back();
      } 
}
