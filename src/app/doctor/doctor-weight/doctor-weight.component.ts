import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-doctor-weight',
  templateUrl: './doctor-weight.component.html',
  styleUrls: ['./doctor-weight.component.css']
})
export class DoctorWeightComponent {
 page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  appointmentList: any;
  rootUrl: any;
  mrn: any;
  data: any;
  bloodForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private http: HttpClient
  ) {
    this.bloodForm = this.formBuilder.group({
      FromDate: [''],
      ToDate: ['']
    });
  }

  ngOnInit(): void {
    this.mrn = this.route.snapshot.params['id'];
    this.rootUrl = environment.rootPathUrl;
    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 0;
    });
    this.getBlood();
  }


  getBlood() {
    const formValues = this.bloodForm.value;

    let payload: any = {
      pageNumber: 1,
      pageSize: 100,
      type: 'weightrecords',
      mrn: this.mrn,
      careProviderCode: localStorage.getItem('code')
    };

    if (formValues.FromDate) {
      payload.fromDate = formValues.FromDate;
    }

    if (formValues.ToDate) {
      payload.toDate = formValues.ToDate;
    }
    this.contentService.getBloodPressure(payload).subscribe(response => {
      if (response.isSuccess == true) {

        this.data = response.data.dataList;
      } else {
        this.toastrService.error();
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

  approveItem(item: any) {
    // Your logic to approve
 
    // Optionally update status
    item.status = 'Verified';
    
    let payload = {
      id: item.id,
      type: 'weightrecords',
      status: 'Verified'
    }
    this.contentService.setvitalStatus(payload).subscribe(response => {
      if (response.isSuccess == true) {
        this.toastrService.success(response.messages);
      } else {
        this.toastrService.error(response.messages);

      }
    });
  }

  rejectItem(item: any) {
    // Your logic to reject

    item.status = 'Rejected';

    let payload = {
      id: item.id,
      type: 'weightrecords',
      status: 'Rejected'
    }
    this.contentService.setvitalStatus(payload).subscribe(response => {
      if (response.isSuccess == true) {
        this.toastrService.success(response.messages);
      } else {
        this.toastrService.error(response.messages);

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
