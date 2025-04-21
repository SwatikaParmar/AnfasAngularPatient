import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ContentService } from 'src/app/shared/services/content.service';

@Component({
  selector: 'app-satisfaction-survey',
  templateUrl: './satisfaction-survey.component.html',
  styleUrls: ['./satisfaction-survey.component.css']
})
export class SatisfactionSurveyComponent {
page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  rootUrl: any;
  satisfactionList: any;

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
    this.satisfactionLists();  
  }
  
  satisfactionLists() {
    this.spinner.show();
    let payload  = {      
      PageNumber : 1,
      PageSize: 10              
    }
                                                            
    this.contentService.getSatisfactionList(payload).subscribe((response) => {
      if (response.isSuccess) {
        this.spinner.hide();
    //    this.toastrService.success(response.messages);
        this.satisfactionList = response.data.records;
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

  
  delete(id:any){
  
    this.spinner.show();
      this.contentService.getSatisfactionDelete(id).subscribe(response => {
        if(response.isSuccess == true) {
          this.spinner.hide();
          this.toastrService.success(response.messages);
          window.location.reload();
        } else {
          this.spinner.hide();
          this.toastrService.error(response.messages);
        }
      });
    }
}


