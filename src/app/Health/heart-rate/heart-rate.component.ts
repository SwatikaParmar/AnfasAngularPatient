import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';

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

}
