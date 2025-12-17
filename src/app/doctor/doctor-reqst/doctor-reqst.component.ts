import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-doctor-reqst',
  templateUrl: './doctor-reqst.component.html',
  styleUrls: ['./doctor-reqst.component.css']
})
export class DoctorReqstComponent {
 page: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  requestList: any[] = [];
  rootUrl: any;
  currentLang = 'en'; // default

    filterMRN: string = '';
filterPatientName: string = '';
fromDate: string = '';
toDate: string = '';
statusId: number | '' = '';
  reqstType: any;
reqstTypeList: any[] = [];
selectedRequestType: number | '' = '';

  constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
  this.getReqstTypeList(); // ✅ add this

    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 1;
      this.RequestList(); // ✅ Corrected method name
    });
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
  
RequestList(): void {
  this.spinner.show();

  const payload: any = {
    pageNumber: this.page,
    pageSize: this.itemsPerPage,
    code: localStorage.getItem('loginId')
  };

  // 🔍 Text Filters
  if (this.filterMRN) payload.mrn = this.filterMRN;
  if (this.filterPatientName) payload.searchQuery = this.filterPatientName;

  // 📅 Date Filters
  if (this.fromDate) payload.fromDate = this.fromDate;
  if (this.toDate) payload.toDate = this.toDate;

  // 📌 Status Filter
  if (this.statusId) payload.statusId = this.statusId;

    // ✅ REQUEST TYPE FILTER
  if (this.selectedRequestType) {
    payload.requestTypeId = this.selectedRequestType;
  }


  this.contentService.getRequestList(payload).subscribe({
    next: (response: any) => {
      if (response?.status) {
        this.requestList = response.data?.items || response.data || [];
        this.totalItems = response.data?.totalCount || 0;
      } else {
        this.requestList = [];
        this.totalItems = 0;
      }
    },
    error: () => {
      this.requestList = [];
      this.totalItems = 0;
      this.toastrService.error('Failed to load request list');
    },
    complete: () => {
      this.spinner.hide();
    }
  });
}

  onPageChange(page: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge',
    });
  }

  clearFilters(): void {
  this.filterMRN = '';
  this.filterPatientName = '';
  this.fromDate = '';
  this.toDate = '';
  this.statusId = '';
  this.selectedRequestType = ''; // ✅ add
  this.page = 1;
  this.RequestList();
}

getReqstTypeList() {
  this.contentService.getRequestTypeDoctor(localStorage.getItem('loginId')).subscribe(response => {
    if (response?.status) {
      debugger
      this.reqstTypeList = response.data || [];
    } else {
      this.reqstTypeList = [];
    }
  });
}

onFilterChange(): void {
  this.page = 1; // reset pagination
  this.RequestList();
}


}



