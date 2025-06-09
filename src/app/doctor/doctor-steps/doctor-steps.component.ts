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
  selector: 'app-doctor-steps',
  templateUrl: './doctor-steps.component.html',
  styleUrls: ['./doctor-steps.component.css']
})
export class DoctorStepsComponent {
page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  appointmentList: any;
  rootUrl: any;
  mrn: any;
  stepsData: any;
  bloodForm!: FormGroup;
  todaySteps: number = 0;
  last7Days: any[] = [];
chartData: { date: Date; steps: number }[] = [];

maxStepCount: number = 1;

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

  const payload: any = {
    pageNumber: 1,
    pageSize: 100,
    type: 'steprecords',
    mrn: this.mrn,
    careProviderCode: localStorage.getItem('code')
  };

  if (formValues.FromDate) payload.fromDate = formValues.FromDate;
  if (formValues.ToDate) payload.toDate = formValues.ToDate;

  this.contentService.getBloodPressure(payload).subscribe(response => {
    if (response.isSuccess === true) {
      this.stepsData = response.data.dataList || [];

      // Sort by date ascending
      this.stepsData.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

      // Store today's steps
      const todayDate = new Date().toISOString().split('T')[0];
      const todayEntry = this.stepsData.find((item: any) => item.date.startsWith(todayDate));
      this.todaySteps = todayEntry ? todayEntry.steps : 0;

     this.chartData = this.stepsData.map((item: { date: string | number | Date; steps: any; }) => ({
  date: new Date(item.date),
  steps: item.steps
}));

this.maxStepCount = Math.max(...this.chartData.map(item => item.steps), 10000); // fallback to 10k

    } else {
      this.toastrService.error('Failed to fetch step records');
    }
  });
}

get yAxisTicks(): number[] {
  const step = Math.ceil(this.maxStepCount / 5);
  return [0, step, step * 2, step * 3, step * 4, step * 5];
}

get yAxisLines(): number[] {
  return [20, 40, 60, 80]; // Lines at 20%, 40%, etc.
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
    console.log('Approved:', item);
    // Optionally update status
    item.status = 'Verified';
    
    let payload = {
      id: item.id,
      type: 'steprecords',
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
    console.log('Rejected:', item);
    item.status = 'Rejected';

    let payload = {
      id: item.id,
      type: 'steprecords',
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



}
