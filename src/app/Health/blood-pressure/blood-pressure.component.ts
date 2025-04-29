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
  }
  
  BloodPressureList() {
    let payload = {
      mrn : localStorage.getItem('mrn'),
      type :'bloodpressure',
      pageNumber : 1,
      pageSize : 10
    }

    this.contentService.getHealthTracker(payload).subscribe(
      response => {
        if (response.isSuccess) {
          this.bloodPressureList = response.data.dataList;
        } else {
          this.toastrService.error('Failed to fetch bloodPressure list.');
          console.error('API returned failure:', response);
        }
      },
      error => {
        this.toastrService.error('Error fetching bloodPressure list.');
        console.error('Error fetching bloodPressure list:', error);
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

  closeModal(): void {
    this.showModal = false;
  }


  addRecord(): void {
    debugger
    if (this.form.invalid) {
      this.toastrService.warning('Please fill out the form correctly.');
      return;
    }

    const payload = {
      id: 0,
      mrn: localStorage.getItem('mrn'),
      systolic: this.form.value.systolic,
      diastolic: this.form.value.diastolic,
      notes: this.form.value.notes
    };

    this.spinner.show();

    this.contentService.addBloodPressure(payload).subscribe({
      next: (res) => {
        this.spinner.hide();
        if (res.isSuccess) {
          this.toastrService.success('Blood Pressure Record Added Successfully');
          this.form.reset();
          this.BloodPressureList(); // Refresh list
        } else {
          this.toastrService.error('Failed to add blood pressure record');
        }
      },
      error: (err) => {
        this.spinner.hide();
        this.toastrService.error('Error adding blood pressure record');
        console.error('Error:', err);
      }
    });
  }
}




