import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.css']
})
export class ComplaintListComponent {
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  complaintList: any;
  rootUrl: any;



  constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
  ){ }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 0;
    });
    this.ComplaintList();  
  }
  
  ComplaintList() {

    let payload = {
      mrn : localStorage.getItem('mrn'),
      page : 1,
      pageSize : 1000
    }

    this.contentService.getComplaint(payload).subscribe(
      response => {
        if (response.status === true) {
          this.complaintList = response.data.complaints;
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
  
 
  goToComplaintChat(complaint: any): void {
  this.router.navigate(['/complaint/chat', complaint.complaintId], {
    state: { complaintData: complaint }
  });
}

  
  
}


