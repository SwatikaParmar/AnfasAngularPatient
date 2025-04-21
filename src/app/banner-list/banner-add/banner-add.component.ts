import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ContentService } from 'src/app/shared/services/content.service';

@Component({
  selector: 'app-banner-add',
  templateUrl: './banner-add.component.html',
  styleUrls: ['./banner-add.component.css'],
})
export class BannerAddComponent implements OnInit {
  submitted = false;
  bannerForm!: FormGroup;
  id: any;
  isEditMode = false;
  imageFile!: File | null;
  previewImage: string | null = null;
  isImageUploaded: boolean = false;
  imageUrl:any;
  bannerType:any;
  bannerUrl:any;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private contentService: ContentService,
    private fb: FormBuilder,
    private _location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.addBanner();  // Initialize the form controls
  
    // Subscribe to query parameters and retrieve values
    this.route.queryParams.subscribe((params) => {
      this.id = params['Id'];  // Retrieve the contentTypeId from query params
      this.bannerType = params['BannerType'];            // Retrieve typeName from query params
      this.bannerUrl = params['BannerImage'];      // Retrieve typeDetails from query params
      
      if (this.id) {
        this.isEditMode = true;  // Set edit mode to true if contentTypeId exists
       this.patchFormValues();
      }
    });
  }
  patchFormValues() {
    if (this.isEditMode) {
      this.bannerForm.patchValue({
        BannerType: this.bannerType,         // Populate the BannerType field
        BannerImage: this.bannerUrl,       // Populate the BannerImage field (but only file name or URL)
      });
  
      // Handle the image preview separately (if BannerImage exists)
      if (this.bannerUrl) {
        // Assuming bannerUrl is just the filename
      this.previewImage = `https://anfas-file.s3.ap-south-1.amazonaws.com/${this.bannerUrl}`;

      }
    } 
  }
  
  
  addBanner() {
    this.bannerForm = this.fb.group({
      BannerType: ['', Validators.required],
      BannerImage: [''],
    });
  }
  
  // Trigger file input programmatically
  triggerFileInput() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Handle file selection
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Check for file type and size (Example: image files and less than 5MB)
      if (!file.type.startsWith('image/')) {
        this.toastrService.error('Only image files are allowed!');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {  // 5MB limit
        this.toastrService.error('File size should be less than 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const newImage = e.target.result;
        if (this.previewImage && this.previewImage === newImage) {
          this.toastrService.info('The selected image is the same as the existing image.');
        } else {
          this.imageFile = file;
          this.previewImage = newImage; // Update preview
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // Remove the uploaded image
  removeImage() {
    this.imageFile = null;
    this.previewImage = null;
  }

  // Submit the form
  banner() {
    this.submitted = true;
  
    if (this.bannerForm.invalid) {
      return;
    }
  
    const formData = new FormData();
    formData.append('Id', this.id || '');
    formData.append('BannerType', this.bannerForm.value.BannerType);
  
    // If a new image is selected, append the new image to the form data
    if (this.imageFile) {
      formData.append('BannerImage', this.imageFile, this.imageFile.name);
    } else {
      // If no new image is selected, append the existing banner image if in edit mode
      if (this.bannerUrl) {
        formData.append('BannerImage', this.bannerUrl);  // Assuming you send the existing image URL or name here
      }
    }
  
    this.spinner.show();
    if (this.isEditMode) {
      // Update banner if in edit mode
      this.contentService.bannerAddUpdate(formData).subscribe(
        response => {
          this.spinner.hide();
          if (response.status) {
            this.toastrService.success(response.messages, "success");
            this._location.back();
          } else {
            this.toastrService.error(response.messages);
          }
        }
      );
    } else {
      // Add new banner if in add mode
      this.contentService.bannerAddUpdate(formData).subscribe(
        response => {
          this.spinner.hide();
          if (response.status) {
            this.toastrService.success(response.messages, "success");
            this.id = response.data.Id;
            this._location.back();
          } else {
            this.toastrService.error(response.messages);
          }
        }
      );
    }
  }
  
  // Go back to the previous page
  backClicked() {
    this._location.back();
  }

  // Getter for easy access to form controls
  get f() {
    return this.bannerForm.controls;
  }
}
