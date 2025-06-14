import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
@Component({
  selector: 'app-doctor-patient',
  templateUrl: './doctor-patient.component.html',
  styleUrls: ['./doctor-patient.component.css']
})
export class DoctorPatientComponent {
 page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  appointmentList: any;
  rootUrl: any;
  patientlist: any;
 
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
    this.getDocAppointment();  
  }



   getDocAppointment(){

    this.spinner.show();
    const CareProviderCode = localStorage.getItem('code')
    debugger
    this.contentService.docPatient(CareProviderCode).subscribe(response => {
      if (response.isSuccess == true) {
          
          this.patientlist = response.data;
          this.spinner.hide();
        } else {
          this.spinner.hide();
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

    editContent(patient: any): void {
    const senderId = patient?.mrn;
    const receiverId = localStorage.getItem('code'); // CareProviderCode comes from local storage
    const receiverName = patient?.firstName;

    if (senderId && receiverId) {
      this.router.navigate(['/doctor-patient/Patient/chat'], {
        queryParams: {
          senderId,
          receiverId,
          receiverName
        }
      });
    } else {
      this.toastrService.error('Invalid sender or receiver information.');
    }
  }
}
