import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.css']
})
export class DoctorAppointmentComponent {
page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  appointmentList: any;
  rootUrl: any;
  doctorappoint: any;
 
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


 getDocAppointment() {
this.spinner.show();
  const now = new Date();
  const fromDate = new Date(now.getFullYear(), now.getMonth(), 1); // First day of current month
  const toDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of current month

  const payload = {
    careProviderCode:  localStorage.getItem('code'),
    FromDate: fromDate.toISOString().split('T')[0], // e.g., "2025-05-01"
    ToDate: toDate.toISOString().split('T')[0]      // e.g., "2025-05-31"
  };
debugger
  this.contentService.docAppointment(payload).subscribe(
    response => {
      if (response.status === true) {
        this.doctorappoint = response.data;
        this.spinner.hide();

      } else {
        this.spinner.hide();

        this.toastrService.error('Failed to fetch list.');
        console.error('API returned failure:', response);
      }
    },
    error => {
              this.spinner.hide();

      this.toastrService.error('Error fetching list.');
      console.error('Error fetching list:', error);
    }
  );
}


 editContent(item: any): void {
  const senderId = item?.careProviderCode;
  const receiverId = item?.patientMRN;
  const receiverName = item?.patientName;


  if (senderId && receiverId) {
    this.router.navigate(['/doctor-appointment/appointment-list/chat'], {
      queryParams: {
        senderId,
        receiverId,
        receiverName,
      
      }
    });
  } else {
    this.toastrService.error('Invalid sender or receiver information.');
  }
}

  
}
