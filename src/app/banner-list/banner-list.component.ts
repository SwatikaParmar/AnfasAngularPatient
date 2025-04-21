import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from '../shared/services/content.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.css']
})
export class BannerListComponent {
  bannerList: any;
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  rootUrl: any;
  item:any;
  selectedImage: string | null = null;

  constructor(
     private toastrService: ToastrService,
       private spinner: NgxSpinnerService,
       private contentService: ContentService,
       private router: Router,
       private route: ActivatedRoute,
  ) {
    
  }

  ngOnInit(): void {
      this.rootUrl = environment.rootPathUrl;
        this.route.queryParams.subscribe((params) => {
          this.page = +params['page'] || 0;
        });
        this.bannerLists();  
}

formatCamelCase(value: string): string {
  if (!value) return 'N/A';
  // Add a space before each uppercase letter, except the first letter
  return value.replace(/([a-z])([A-Z])/g, '$1 $2');
}


bannerLists() {
  this.spinner.show(); // Show spinner while fetching data
  this.contentService.getBannerList().subscribe(
    response => {
      if (response && response.status === true) { 
        this.bannerList = response.data; 
      } else {
        this.toastrService.error('Failed to fetch banner list.'); 
      }
      this.spinner.hide(); // Hide spinner after handling the response
    },
    error => {
      this.toastrService.error('Error fetching banner list.'); // Handle error
      console.error('Error fetching banner list:', error); // Log error for debugging
      this.spinner.hide(); // Ensure spinner is hidden even on error
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

delete(id:any){
  
  this.spinner.show();
    this.contentService.deleteBanner(id).subscribe(response => {
      if(response.status == true) {
        this.spinner.hide();
        this.toastrService.success(response.messages);
        window.location.reload();
      } else {
        this.spinner.hide();
        this.toastrService.error(response.messages);
      }
    });
  }
  
  editContent(item: any): void {
    // Navigate to the content update page with query parameters (Id, BannerImage, BannerType)
    this.router.navigate(['/banner-list/banner-update'], {
      queryParams: {
        Id: item.id,             // Pass the content ID
        BannerImage: item.bannerUrl,  // Pass the image name or path
        BannerType: item.bannerType   // Pass the banner type
      }
    });
  }
  


}