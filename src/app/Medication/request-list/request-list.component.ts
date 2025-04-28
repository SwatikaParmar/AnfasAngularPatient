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
page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
 requestList: any;
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
    this.RequestList();  
  }
  
  RequestList() {
    let payload = {
      userName : localStorage.getItem('mrn'),
      pageNumber : 1,
      pageSize : 10
    }

    this.contentService.getRequestList(payload).subscribe(
      response => {
        if (response.status) {
          this.requestList = response.data;
        } else {
          this.toastrService.error('Failed to fetch request list.');
          console.error('API returned failure:', response);
        }
      },
      error => {
        this.toastrService.error('Error fetching request list.');
        console.error('Error fetching request list:', error);
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

}



