import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-xray-report',
  templateUrl: './xray-report.component.html',
  styleUrls: ['./xray-report.component.css']
})
export class XrayReportComponent {
page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  stepsList: any;
  rootUrl: any;
  xrayLists: any;
selectedFile!: File;
reportId: number = 1; // or get dynamically if needed
imagePreview: string | ArrayBuffer | null = null;
showUploadModal: boolean = false;
showPopup: boolean = false;

  form: any;
  mrn: string = ''; 
  constructor(
      private fb: FormBuilder,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
  ){  this.form = this.fb.group({}); }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 0;
      this.mrn = localStorage.getItem('mrn') || '';

    });
    this.xrayList();  
  }
  
  xrayList() {
    if (!this.mrn) {
      this.toastrService.error('MRN is required to fetch X-ray reports.');
      return;
    }
  
    this.contentService.getXray(this.mrn).subscribe(
      response => {
        if (response.isSuccess) {
          this.xrayLists = response.data;
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



onFileChange(event: any) {
  if (event.target.files.length > 0) {
    this.selectedFile = event.target.files[0];

    // For preview
    const reader = new FileReader();
    reader.onload = (e) => this.imagePreview = reader.result;
    reader.readAsDataURL(this.selectedFile);
  }
}

uploadXray() {
  if (!this.selectedFile) {
    this.toastrService.error('Please select a file');
    return;
  }

  this.spinner.show();

  this.contentService.uploadXrayReport(this.reportId, this.selectedFile).subscribe({
    next: (res) => {
      this.spinner.hide();
      this.toastrService.success('X-ray report uploaded successfully');
      this.xrayList(); // refresh list
      this.closeModal(); // ✅ Close modal after upload success
    },
    error: (err) => {
      this.spinner.hide();
      this.toastrService.error('Upload failed');
    }
  });
}


openModal() {
  this.showUploadModal = true;
}

closeModal() {
  this.showUploadModal = false;
}

openPreview() {
  this.showPopup = true;
}

closePreview() {
  this.showPopup = false;
}
}
