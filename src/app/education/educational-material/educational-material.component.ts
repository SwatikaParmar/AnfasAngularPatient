import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-educational-material',
  templateUrl: './educational-material.component.html',
  styleUrls: ['./educational-material.component.css']
})
export class EducationalMaterialComponent {
 page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  materialList: any;
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
    this.MaterialList();  
  }


  MaterialList() {
    let payload = {
      pageNumber : 1,
      pageSize : 10,
      // isApproved : true,
      mrn : localStorage.getItem('mrn'),
     
    }

    this.contentService.geteducationalMaterial(payload).subscribe(
      response => {
        if (response.isSuccess) {
          this.materialList = response.data.dataList;
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

}



