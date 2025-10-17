import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
declare var bootstrap: any;  // Declare bootstrap for TypeScript

@Component({
  selector: 'app-heart-rate',
  templateUrl: './heart-rate.component.html',
  styleUrls: ['./heart-rate.component.css']
})
export class HeartRateComponent {
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  heartRateList: any;
  rootUrl: any;
  form!: FormGroup;
  isArabic: boolean = false; // Set to true if Arabic is the current language

  @ViewChild('heartRateModal', { static: true }) heartRateModal!: ElementRef;  // Non-null assertion

  previewImageUrl: string | null = null;
  bloodID: any;
  @ViewChild('heartRateModal', { static: true }) modalElement!: ElementRef;
@ViewChild('fileInputRef') fileInputRef!: ElementRef<HTMLInputElement>;

imagePreview: string | ArrayBuffer | null = null;
  showModal: boolean = false; // controls modal visibility
  modalInstance: any;
  fileName: string = '';
showPopup: boolean = false;
imageFile: File | null = null;
  statusMessage!: any;

  constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private fb: FormBuilder
  ) {  this.isArabic = this.translate.currentLang === 'ar';}

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.initForm();
    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 0;
    });
    this.HeartRateList();
        this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
        this.onlineStatus();
  // Repeat API call every 1 minute (60000 ms)
  setInterval(() => {
    this.onlineStatus();
  }, 60000); // 60,000 ms = 1 minute
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
  HeartRateList() {
    let payload = {
      mrn: localStorage.getItem('mrn'),
      type: 'heartrate',
      pageNumber: 1,
      pageSize: 10
    };

    this.contentService.getHealthTracker(payload).subscribe(
      (response) => {
        if (response.isSuccess) {
          this.heartRateList = response.data.dataList;
        } else {
         
        }
      },
      (error) => {
       
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
      beatsPerMinute: ['', [Validators.required]],
      notes: [''] // hidden in modal, optional
    });
  }

  addRecord(): void {
    if (this.form.invalid) {
      this.toastrService.warning('Please fill out the form correctly.');
      return;
    }
  
    const payload = {
      id: this.bloodID ? this.bloodID : 0,
      mrn: localStorage.getItem('mrn'),
      beatsPerMinute: this.form.value.beatsPerMinute,
      notes: this.form.value.notes
    };
  
    this.spinner.show();
  
    this.contentService.addHeartRate(payload).subscribe({
      next: (res) => {
        this.spinner.hide();
        if (res.isSuccess) {
          this.toastrService.success('Heart Rate Record Added Successfully');
          this.form.reset();
          // ✅ Close the modal
          const modalInstance = bootstrap.Modal.getInstance(this.heartRateModal.nativeElement);
          modalInstance?.hide();
  
          setTimeout(() => {
            window.location.reload();
          }, 1000);

              // Upload image if selected
        if (this.imageFile) {
          const newRecordId = res.data?.id || payload.id; // Assuming ID comes back in `res.data.id`
          this.uploadVitalPictureAfterRecord(newRecordId);
        } else {
          this.postUploadCleanup(); // No image, just cleanup
        }
        
        } else {
          this.toastrService.error('Failed to add Heart Rate record');
        }
      },
      error: (err) => {
        this.spinner.hide();
        this.toastrService.error('Error adding Heart Rate record');
    
      }
    });
  }


    openImagePreview(fullImageUrl: string): void {
  this.previewImageUrl = fullImageUrl;
}

closeImagePreview(): void {
  this.previewImageUrl = null;
}

openModal() {
  this.form.reset();

  // Clear file input
  if (this.fileInputRef) {
    this.fileInputRef.nativeElement.value = '';
  }

  // Clear image preview if needed
  this.imagePreview = null;
  this.showPopup = false;

  // Show modal
  if (this.modalInstance) {
    this.modalInstance.show();
  }
}

    openModals(id:any): void {
      debugger
      this.bloodID = id;
   this.form.reset();

  // Clear file input
  if (this.fileInputRef) {
    this.fileInputRef.nativeElement.value = '';
  }

  // Clear image preview if needed
  this.imagePreview = null;
  this.showPopup = false;

  // Show modal
  if (this.modalInstance) {
    this.modalInstance.show();
  }
  }

  closeModal() {
    this.modalInstance.hide();
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

  this.contentService.uploadVitalPicture(this.imageFile, recordId, 'HeartRate').subscribe({
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
  this.HeartRateList(); // Refresh list
  this.closeModal();
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


onlineStatus(){

  let payload = {
    userName: localStorage.getItem('mrn'),
    onlineStatus : true
  }

  this.contentService.onlineStatusManually(payload).subscribe(response => {
    if(response.isSuccess == true){

      this.statusMessage = response.data;
    }else {

    }
  })
}
  
}
