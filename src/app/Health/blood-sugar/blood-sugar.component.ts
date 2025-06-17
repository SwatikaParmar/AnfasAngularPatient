import { Component ,ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var bootstrap: any; // Add at the top if not already declared
@Component({
  selector: 'app-blood-sugar',
  templateUrl: './blood-sugar.component.html',
  styleUrls: ['./blood-sugar.component.css']
})
export class BloodSugarComponent {
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  bloodSugarList: any;
  rootUrl: any;
  form!: FormGroup;
  modalInstance: any;
  fileName: string = '';
imagePreview: string | ArrayBuffer | null = null;
showPopup: boolean = false;
imageFile: File | null = null;
previewImageUrl: string | null = null;
  showModal: boolean = false; // controls modal visibility
  isLTR = true;
  bloodID: any;
  @ViewChild('bloodSugarModal', { static: true }) modalElement!: ElementRef;
@ViewChild('fileInputRef') fileInputRef!: ElementRef<HTMLInputElement>;

  constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.initForm();
    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 0;
    });
    this.BloodSugarList();
    // Initialize Bootstrap modal manually
    this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);

  }
  openImagePreview(fullImageUrl: string): void {
  this.previewImageUrl = fullImageUrl;
}

closeImagePreview(): void {
  this.previewImageUrl = null;
}

  BloodSugarList() {
    this.spinner.show();
  
    const payload = {
      mrn: localStorage.getItem('mrn'),
      type: 'bloodsugar',
      pageNumber: 1,
      pageSize: 10
    };
  
    this.contentService.getHealthTracker(payload).subscribe({
      next: (response) => {
        if (response?.isSuccess) {
          this.bloodSugarList = response.data?.dataList || [];
        } else {
          this.toastrService.error('Failed to fetch blood sugar list.');
          console.error('API returned failure:', response);
        }
        this.spinner.hide();
      },
      error: (error) => {
        this.toastrService.error('Error fetching blood sugar list.');
        console.error('Error fetching blood sugar list:', error);
        this.spinner.hide();
      }
    });
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
      type: ['', [Validators.required]],
      value: ['', [Validators.required]],
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
    type: this.form.value.type,
    value: this.form.value.value,
    notes: this.form.value.notes
  };

  this.spinner.show();

  this.contentService.addBloodSugar(payload).subscribe({
    next: (res) => {
      if (res.isSuccess) {
        this.toastrService.success('Blood Sugar Record Added Successfully');

        // Upload image if selected
        if (this.imageFile) {
          const newRecordId = res.data?.id || payload.id; // Assuming ID comes back in `res.data.id`
          this.uploadVitalPictureAfterRecord(newRecordId);
        } else {
          this.postUploadCleanup(); // No image, just cleanup
        }
      } else {
        this.spinner.hide();
        this.toastrService.error('Failed to add blood sugar record');
      }
    },
    error: (err) => {
      this.spinner.hide();
      this.toastrService.error('Error adding blood sugar record');
      console.error('Error:', err);
    }
  });
}

  

  // openModal(): void {
  //   this.form.reset();
  //   this.showModal = true;
  // }

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

  // closeModal(): void {
  //   this.showModal = false;
  // }

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

  this.contentService.uploadVitalPicture(this.imageFile, recordId, 'BloodSugar').subscribe({
    next: () => {
 //     this.toastrService.success('Image uploaded successfully.');
      this.postUploadCleanup();
    },
    error: (err) => {
      this.spinner.hide();
      this.toastrService.error('Image upload failed.');
      console.error('Upload Error:', err);
    }
  });
}

postUploadCleanup(): void {
  this.spinner.hide();
  this.form.reset();
  this.imageFile = null;
  this.imagePreview = null;
  this.fileName = '';
  this.BloodSugarList(); // Refresh list
  this.closeModal();
}



openPreview(): void {
  this.showPopup = true;
}

closePreview(): void {
  this.showPopup = false;
}




}
