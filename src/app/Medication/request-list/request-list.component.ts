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

  constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;

    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 1;
      this.RequestList(); // ✅ Corrected method name
    });
  }

  RequestList(): void {
    this.spinner.show();

    const mrn = localStorage.getItem('mrn') || '';
    const payload = {
      userName: mrn,
      pageNumber: this.page,
      pageSize: this.itemsPerPage
    };

    this.contentService.getRequestList(payload).subscribe({
      next: (response: any) => {
        if (response?.status) {
          this.requestList = response.data || [];
          this.totalItems = response.data?.length || 0; // ✅ Corrected assignment
        } else {
      
        }
      },
      error: (error) => {
       
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
}



