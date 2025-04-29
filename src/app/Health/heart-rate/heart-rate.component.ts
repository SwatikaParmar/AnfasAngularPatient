import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    this.HeartRateList();  
  }
  
  HeartRateList() {
    let payload = {
      mrn : localStorage.getItem('mrn'),
      type :'heartrate',
      pageNumber : 1,
      pageSize : 10
    }

    this.contentService.getHealthTracker(payload).subscribe(
      response => {
        if (response.isSuccess) {
          this.heartRateList = response.data.dataList;
        } else {
          this.toastrService.error('Failed to fetch heartrate list.');
          console.error('API returned failure:', response);
        }
      },
      error => {
        this.toastrService.error('Error fetching heartrate list.');
        console.error('Error fetching heartrate list:', error);
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
      debugger
      if (this.form.invalid) {
        this.toastrService.warning('Please fill out the form correctly.');
        return;
      }
  
      const payload = {
        id: 0,
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
            this.heartRateList(); // Refresh list
          } else {
            this.toastrService.error('Failed to add Heart Rate record');
          }
        },
        error: (err) => {
          this.spinner.hide();
          this.toastrService.error('Error adding Heart Rate record');
          console.error('Error:', err);
        }
      });
    }
}
