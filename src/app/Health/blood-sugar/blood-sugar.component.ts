import { Component } from '@angular/core';
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
      id: 0,
      mrn: localStorage.getItem('mrn'),
      type: this.form.value.type,
      value: this.form.value.value,
      notes: this.form.value.notes
    };
  
    this.spinner.show();
  
    this.contentService.addBloodSugar(payload).subscribe({
      next: (res) => {
        this.spinner.hide();
        if (res.isSuccess) {
          this.toastrService.success('Blood Sugar Record Added Successfully');
          this.form.reset();
          this.BloodSugarList();
         
          // Delay the page reload for 3 seconds
          setTimeout(() => {
            window.location.reload();
          }, 1000);  // 3000ms = 3 seconds
        } else {
          this.toastrService.error('Failed to add blood Sugar record');
        }
      },
      error: (err) => {
        this.spinner.hide();
        this.toastrService.error('Error adding blood Sugar record');
        console.error('Error:', err);
      }
    });
  }
  

}
