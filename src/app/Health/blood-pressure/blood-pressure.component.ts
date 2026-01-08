import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blood-pressure',
  templateUrl: './blood-pressure.component.html',
  styleUrls: ['./blood-pressure.component.css']
})
export class BloodPressureComponent {
 page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  bloodPressureList: any;
  rootUrl: any;
  form!: FormGroup;
  showModal: boolean = false; // controls modal visibility
  isLTR = true;
  bloodID: any;
  fileName: string = '';
imagePreview: string | ArrayBuffer | null = null;
showPopup: boolean = false;
imageFile: File | null = null;
previewImageUrl: string | null = null;

  constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private fb: FormBuilder
  ){ }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.initForm();

    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 0;
    });

    this.BloodPressureList();
    const lang = document.documentElement.lang || 'en'; // get lang from <html lang="en">
    this.isLTR = lang !== 'ar'; // or however you detect RTL languages
  }

  openImagePreview(fullImageUrl: string): void {
  this.previewImageUrl = fullImageUrl;
}

  getStatusColor(status: any): string {
    switch (status) {
      case 1:
        return 'orange';  // Yellow or Orange
      case 2:
        return 'green';
      case 3:
        return 'red';
      default:
        return 'black';  // Default color
    }
  }

closeImagePreview(): void {
  this.previewImageUrl = null;
}

  
  BloodPressureList() {
    let payload = {
      mrn : localStorage.getItem('mrn'),
      type :'bloodpressure',
      pageNumber : 1,
      pageSize : 1000
    }

    this.contentService.getHealthTracker(payload).subscribe(
      response => {
        if (response.isSuccess) {
          this.bloodPressureList = response.data.dataList;
        } else {
        
        }
      },
      error => {
       
      }
    );
  }    

  onPageChange(page: number): void {
    // Update query parameters for pagination
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge',
    });
  }


  backClicked() {
    this._location.back();
    
  }
  
  initForm(): void {
    this.form = this.fb.group({
      systolic: ['', [Validators.required]],
      diastolic: ['', [Validators.required]],
      notes: [''] // hidden in modal, optional
    });
  }

  openModal(): void {
    this.form.reset();
    this.showModal = true;
  }

    openModals(id:any): void {
      this.bloodID = id;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }


  addRecord(): void {
  if (this.form.invalid) {
    this.toastrService.warning('Please fill out the form correctly.');
    return;
  }

  const payload = {
    id: this.bloodID ? this.bloodID : 0,
    mrn: localStorage.getItem('mrn'),
    systolic: this.form.value.systolic,
    diastolic: this.form.value.diastolic,
    notes: this.form.value.notes
  };

  this.spinner.show();

  this.contentService.addBloodPressure(payload).subscribe({
    next: (res) => {
      if (res.isSuccess) {
        this.toastrService.success('Blood Pressure Record Added Successfully');
debugger
        // 🟢 Now upload image if file is selected
        if (this.imageFile) {
          const newRecordId = res.data?.id || payload.id; // Assuming ID comes back in `res.data.id`
          this.uploadVitalPictureAfterRecord(newRecordId);
        } else {
          this.postUploadCleanup();
        }
      } else {
        this.spinner.hide();
        this.toastrService.error('Failed to add blood pressure record');
      }
    },
    error: (err) => {
      this.spinner.hide();
      this.toastrService.error('Error adding blood pressure record');
  
    }
  });
}


onFileChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (file) {
    this.fileName = file.name;
    this.imageFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

uploadVitalPictureAfterRecord(recordId: number): void {
  if (!this.imageFile) return;

  this.contentService.uploadVitalPicture(this.imageFile, recordId, 'BloodPressure').subscribe({
    next: () => {
 //     this.toastrService.success('Image uploaded successfully.');
      this.postUploadCleanup();
    },
    error: (err) => {
      this.spinner.hide();
      this.toastrService.error('Image upload failed.');

    }
  });
}

postUploadCleanup(): void {
  this.spinner.hide();
  this.form.reset();
  this.imageFile = null;
  this.imagePreview = null;
  this.fileName = '';
  this.BloodPressureList(); // Refresh list
  this.closeModal();        // Close modal if any
}



openPreview(): void {
  this.showPopup = true;
}

closePreview(): void {
  this.showPopup = false;
}


convertToLocalTime(utcDate: string): string {
  if (!utcDate) return 'N/A'; // Handle missing dates

  const utcDateObj = new Date(utcDate + 'Z'); // Ensure it's treated as UTC
  if (isNaN(utcDateObj.getTime())) return 'Invalid Date'; // Handle invalid date

  const day = String(utcDateObj.getDate()).padStart(2, '0');
  const month = String(utcDateObj.getMonth() + 1).padStart(2, '0');
  const year = utcDateObj.getFullYear();

  const hours = utcDateObj.getHours();
  const minutes = String(utcDateObj.getMinutes()).padStart(2, '0');

  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHour = String(hours % 12 || 12).padStart(2, '0');

  return `${day}-${month}-${year} ${formattedHour}:${minutes} ${ampm}`;
}

}




