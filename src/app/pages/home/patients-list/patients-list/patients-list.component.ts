import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent {
  patientList: any;
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  rootUrl: any;
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
        this.patientLists();  
}


patientLists() {
  this.spinner.show(); 
  this.contentService.getPatientList().subscribe(
    response => {
      if (response && response.isSuccess === true) { 
        this.patientList = response.data; 
      } else {
        this.toastrService.error('Failed to fetch patient list.'); 
      }
      this.spinner.hide();
    },
    error => {
      this.toastrService.error('Error fetching patient list.'); 
      console.error('Error fetching patient list:', error); 
      this.spinner.hide(); 
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

editContent(item: any): void {
  this.router.navigate(['/patients-list/patients-detail'], {
    queryParams: {
      Mrn: item?.mrn,  
      MobilePhone: item?.phoneNumber,  
      NationalId: item?.nationality  
    }
  });
}


}