import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from '../shared/services/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
 page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  list: any;
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
    this.NotificationList();  
  }
  
 NotificationList() {
  let payload = {
    pageNumber: 1,
    pageSize: 10
  };

  this.spinner.show();
  this.contentService.getNotification(payload).subscribe(
    response => {
      this.spinner.hide();
      if (response.isSuccess) {
        this.list = response.data?.dataList || [];
        this.totalItems = response.data?.totalCount || 0;
      } else {
        this.toastrService.error('Failed to load notifications');
        this.list = [];
      }
    },
    error => {
      this.spinner.hide();
      this.toastrService.error('An error occurred while fetching notifications');
      this.list = [];
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
