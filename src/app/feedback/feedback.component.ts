import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from '../shared/services/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  feedbackList: any;
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
    this.feedbackLists();  
  }
  
  feedbackLists() {
    this.spinner.show();
    let payload  = {      
      PageNumber : 1,
      PageSize: 10              
    }
                                                            
    this.contentService.getFeedbackList(payload).subscribe((response) => {
      if (response.success) {
        this.spinner.hide();
    //    this.toastrService.success(response.messages);
        this.feedbackList = response.data.data;
        this.totalItems = response.totalItems; // Assuming the API response contains totalItems
      } else {        
        this.spinner.hide();     
        this.toastrService.error(response.messages);
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

  
}


