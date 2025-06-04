import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-doctor-records',
  templateUrl: './doctor-records.component.html',
  styleUrls: ['./doctor-records.component.css']
})
export class DoctorRecordsComponent {
 page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  appointmentList: any;
  rootUrl: any;
  mrn: any;
  medicationList: any;
  educationMaterial: any;
  visitList: any;

    constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private http: HttpClient
  ){ }

  ngOnInit(): void {
     this.mrn = this.route.snapshot.params['id'];
    this.rootUrl = environment.rootPathUrl;
    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 0;
    });
    this.getMedicationRecord();
  }



  getMedicationRecord(){
this.spinner.show();
    let payload = {
      pageNumber : 1,
      pageSize :100,
      careProviderCode : localStorage.getItem('code'),
      mrn :this.mrn
    }

    this.contentService.getdoctorMedication(payload).subscribe(response => {
      if(response.isSuccess == true){
this.spinner.hide();
        this.medicationList = response.data;
      } else {
        this.spinner.hide();

        this.toastrService.error(response.message);
      }
    })

  }

onCheckboxChange(event: Event, item: any): void {
  const input = event.target as HTMLInputElement;
  const newStatus = input.checked ? 'Active' : 'InActive';
debugger
  const payload = {
    medicationId: item.medicationId,
    status: newStatus
  };

  this.contentService.setMedicationStatus(payload).subscribe({
    next: () => {
      item.status = newStatus; // update UI
      this.toastrService.success(`Status changed to ${newStatus}`);
        this.getMedicationRecord();
    },
    error: (err) => {
      console.error('Error updating status:', err);
      this.toastrService.error('Failed to update status');
    }
  });
}



 getPatientEducation(){

let payload = {
  pageNumber : 1,
  pageSize : 100,
  careProviderCode : localStorage.getItem('code'),
  mrn : this.mrn
}

this.contentService.geteducationalMaterialDoct(payload).subscribe(response => {
  if(response.isSuccess == true){
this.educationMaterial = response.data.dataList
  }else {
    this.toastrService.error(response.messages)

  }
});
 }


 getDoctorVisit(){
    this.contentService.getVisit(this.mrn).subscribe(
      response => {
        if (response.status === true) {
          this.visitList = response.data;
        } else {
          this.toastrService.error('Failed to fetch  list.');
          console.error('API returned failure:', response);
        }
      },
      error => {
        this.toastrService.error('Error fetching  list.');
        console.error('Error fetching  list:', error);
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

}
