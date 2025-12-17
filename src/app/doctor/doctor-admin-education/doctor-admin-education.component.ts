import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-doctor-admin-education',
  templateUrl: './doctor-admin-education.component.html',
  styleUrls: ['./doctor-admin-education.component.css']
})
export class DoctorAdminEducationComponent {
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

    getStatusColor(status: any): string {
    switch (status) {
      case 1:
        return 'orange';  // Yellow or Orange
      case 2:
        return 'green';
      case 3:
        return 'red';
      default:
        return 'black';  // Default color
    }
  }

  MaterialList() {
    this.spinner.show();
    let payload = {
      pageNumber : 1,
      pageSize : 100000,
      // isApproved : true,
      careProviderCode : localStorage.getItem('code'),
     
    }

    this.contentService.geteducationalMaterialDocAdmin(payload).subscribe(
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

