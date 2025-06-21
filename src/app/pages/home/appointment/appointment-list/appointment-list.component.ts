import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent {
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  appointmentList: any;
  rootUrl: any;
  doctorList: any;
 
  constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
  ){ }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 0;
    });
    this.doctorLists();  
  }

 doctorLists() {
  this.spinner.show(); // Show spinner before API call

  this.contentService.getDoctors().subscribe(
    response => {
      this.spinner.hide(); // Hide spinner after response

      if (response.status === true) {
        this.doctorList = response.data;
      } else {

      }
    },
    error => {
      this.spinner.hide(); // Hide spinner even if there's an error
   
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
    
      backClicked() {
        this._location.back();
      }  


      editContent(item: any): void {
        const CareProviderCode = item.code; 
        const receiverName = item.name; 
        
        if (CareProviderCode && receiverName) {
          this.router.navigate(['/appointment-list/appointment/book'], {
            queryParams: {
              CareProviderCode: CareProviderCode,
              receiverName: receiverName 
            }
          });
        } else {
        
        }
      }
}
