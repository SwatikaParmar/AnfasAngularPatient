import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-doctor-education',
  templateUrl: './doctor-education.component.html',
  styleUrls: ['./doctor-education.component.css']
})
export class DoctorEducationComponent {
 page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  materialList: any;
  rootUrl: any;
role: string = '';

  constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
  ){ }

  ngOnInit(): void {
    debugger
      this.role = localStorage.getItem('role') || '';

    this.rootUrl = environment.rootPathUrl;
    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 0;
    });
    this.MaterialList();  
  }


  MaterialList() {
    this.spinner.show();
    let payload = {
      pageNumber : 1,
      pageSize : 10,
      // isApproved : true,
      careProviderCode : localStorage.getItem('code'),
     
    }

    this.contentService.geteducationalMaterialDoc(payload).subscribe(
      response => {
        if (response.isSuccess) {
          this.materialList = response.data.dataList;
          this.spinner.hide();
        } else {
          this.spinner.hide();
       
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

