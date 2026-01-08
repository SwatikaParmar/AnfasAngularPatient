import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.css']
})
export class WeightComponent {
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  weightList: any;
  rootUrl: any;
  form!: FormGroup;
  showModal = false; // modal visibility control


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
    this.WeightList();
  }

  WeightList() {
    let payload = {
      mrn: localStorage.getItem('mrn'),
      type: 'weightrecords',
      pageNumber: 1,
      pageSize: 1000
    }

    this.contentService.getHealthTracker(payload).subscribe(
      response => {
        if (response.isSuccess) {
          this.weightList = response.data.dataList;
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
      weights: ['', [Validators.required]],
      notes: [''] // hidden in modal, optional
    });
  }


  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.form.reset();
  }
  addRecord(): void {
    if (this.form.invalid) {
      this.toastrService.warning('Please fill out the form correctly.');
      return;
    }

    const payload = {
      id: 0,
      mrn: localStorage.getItem('mrn'),
      weights: this.form.value.weights,
      notes: this.form.value.notes
    };

    this.spinner.show();

    this.contentService.addWeight(payload).subscribe({
      next: (res) => {
        this.spinner.hide();
        if (res.isSuccess) {
          this.toastrService.success('Weight Record Added Successfully');
          this.form.reset();
          this.WeightList(); // Refresh list
          this.closeModal(); // close modal after successful add
        } else {
          this.toastrService.error('Failed to add weight record');
        }
      },
      error: (err) => {
        this.spinner.hide();
        this.toastrService.error('Error adding weight record');
    
      }
    });
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

