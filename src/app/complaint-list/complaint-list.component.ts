import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { ContentService } from '../shared/services/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

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
  item: any;
  complaintId: any;

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
    this.complaintLists();  
  }
  
  complaintLists() {
    this.spinner.show(); 
    this.contentService.getComplaintList().subscribe(
      response => {
        this.spinner.hide();  // Hide spinner on successful response
        if (response.status === true) {
          this.complaintList = response.data.complaints;
        } else {
          this.toastrService.error('Failed to fetch complaint list.');
          console.error('API returned failure:', response);
        }
      },
      error => {
        this.spinner.hide();  // Hide spinner on error as well
        this.toastrService.error('Error fetching complaint list. Please try again later.');
        console.error('Error fetching complaint list:', error);
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
  onStatusChange(complaintId:number ,status: string) {
    // Ensure the complaintId is correctly set
    let payload = {
      complaintId: complaintId,  // Ensure item has complaintId
      status: status,  // The selected status from the dropdown
    };
  
    this.contentService.statusPost(payload).subscribe((response) => {
      if (response.status) {
        // this.toastrService.success(response.messages);
        // You can choose not to reload the page to avoid the reset of state
        window.location.reload(); 
      } else {
        this.toastrService.error(response.messages);
      }
    });
  }
  
          
}
   


