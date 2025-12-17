import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent {
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
statusId: string | number = '';
selectedRequestType: number | '' = '';
  reqstTypeList: any;

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
    pageSize: this.itemsPerPage
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


  this.contentService.getRequestLists(payload).subscribe({
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


onFilterChange(): void {
  this.page = 1; // reset pagination
  this.RequestList();
}








 


// Convert numeric statusId to readable text
// Convert numeric statusId to text
getStatusText(statusId: number): string {
  switch (statusId) {
    case 1: return 'Pending';
    case 2: return 'Approved';
    case 3: return 'Rejected';
    case 4: return 'Other';
    default: return '--';
  }
}

// Badge class
getBadgeClass(statusId: number): string {
  switch (statusId) {
    case 1: return 'bg-warning text-dark';
    case 2: return 'bg-success text-white';
    case 3: return 'bg-danger text-white';
    case 4: return 'bg-primary text-white';
    default: return 'bg-secondary text-white';
  }
}

getReqstTypeList() {
  this.contentService.getRequestTypeAdmin(localStorage.getItem('mrn')).subscribe(response => {
    if (response?.status) {
      debugger
      this.reqstTypeList = response.data || [];
    } else {
      this.reqstTypeList = [];
    }
  });
}



}



