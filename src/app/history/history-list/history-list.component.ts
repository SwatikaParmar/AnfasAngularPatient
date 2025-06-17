import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent {
  page: number = 0;
  itemsPerPage!: number;
  totalItems!: number;
  item: any;
  rootUrl: any;
  isArabic: boolean = false; // set this to true if the current language is Arabic
  historyListOriginal: any[] = []; // the full original list
  historyList: any[] = [];         // the filtered list
  selectedStatus: string = 'All';  // dropdown selection
  showAppointmentButton = true;
  selectedAppointment: any = null;
  isHistoryDataLoaded = false;

  constructor(
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateService,
  ) { this.isArabic = this.translateService.currentLang === 'ar'; }

  ngOnInit(): void {
    this.rootUrl = environment.rootPathUrl;
    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 0;
    });
    this.appointment();

    const currentUrl = this.router.url;
    if (currentUrl.includes('history-list')) {
      this.showAppointmentButton = false;
    }
  }


appointment() {
  this.spinner.show(); // Optional spinner
  this.contentService.getAppointment(localStorage.getItem('mrn')).subscribe(
    response => {
      this.spinner.hide();
      this.isHistoryDataLoaded = true; // <-- important
      if (response.status === true) {
        this.historyListOriginal = response.data;
        this.historyList = [...this.historyListOriginal];
      } else {
        
      }
    },
    error => {
      this.spinner.hide();
      this.isHistoryDataLoaded = true; // <-- important
      
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



  filterHistoryList() {
    if (this.selectedStatus === 'All' || !this.selectedStatus) {
      this.historyList = [...this.historyListOriginal];
    } else {
      this.historyList = this.historyListOriginal.filter(item =>
        item.slots[0]?.statusUid?.valueDescription === this.selectedStatus
      );
    }
  }

  editContent(item: any): void {
    const senderId = localStorage.getItem('mrn'); // senderId comes from localStorage
    const slot = item.slots; // Get the first slot from the array

    if (!slot || !item.careProviderUid) {
      this.toastrService.error('Invalid appointment slot or provider data.');
      return;
    }

    const receiverId = item.careProviderUid.code; // Doctor code as receiverId
    const receiverName = item.careProviderUid.name; // Doctor's name as receiverName
    const receiverLastName = item.careProviderUid.lastName;

    if (senderId && receiverId) {
      this.router.navigate(['/history-list/chat'], {
        queryParams: {
          senderId: senderId,
          receiverId: receiverId,
          receiverName: receiverName,
          receiverLastName: receiverLastName
        }
      });
    } else {
      this.toastrService.error('Invalid sender or receiver information.');
    }
  }



  closeOnOutsideClick(event: MouseEvent): void {
    this.selectedAppointment = null;
  }


  getStatusColor(status: string | undefined): string {
    switch (status) {
      case 'No Show': return 'orange';
      case 'Booked': return 'blue';
      case 'Confirmed': return 'green';
      case 'Cancelled': return 'red';
      default: return 'inherit';
    }
  }

  // edit(item: any): void {
  //   const CareProviderCode = item.careProviderUid.code;
  //   const receiverName = item.careProviderUid.name;
  //   const receiverLastName = item.careProviderUid.lastName;

  //   console.log('Navigating with:', CareProviderCode, receiverName, receiverLastName);

  //   if (CareProviderCode && receiverName && receiverLastName) {
  //     this.router.navigate(['/appointment-list/appointment/book'], {
  //       queryParams: {
  //         CareProviderCode,
  //         receiverName,
  //         receiverLastName
  //       }
  //     });
  //   } else {
  //     this.toastrService.error('Invalid sender or receiver information.');
  //   }
  // }

  rescheduleAppointment(item: any) {

    const payload = {
      appointmentdate: new Date().toISOString(), // Ideally, allow user to pick a new date/time
      comment: 'reschedule',
      mrn: localStorage.getItem('mrn'),
      orgcode: 'AMC', // Replace with dynamic value if needed
      appointmentnumber: item.slots[0]?.appointmentNumber,
      status: 'BOKSTS2', // Assuming this is the new "Rescheduled" status
      slotId: item.slots[0]?.id
    };

    if (!payload.appointmentnumber || !payload.slotId) {
      this.toastrService.error('Missing appointment information.');
      return;
    }

    this.contentService.rescheduleAppointment(payload).subscribe({
      next: (response) => {
        if (response.status) {
          this.toastrService.success(response.message || 'Appointment rescheduled successfully.');
          window.location.reload();
        } else {
          this.toastrService.error(response.message || 'Failed to reschedule appointment.');
        }
      },
      error: (error) => {
        this.toastrService.error('Error while rescheduling appointment.');
        console.error('Reschedule error:', error);
      }
    });
  }

  cancelAppointment(item: any) {

    const payload = {
      comment: "Cancel",   // or any appropriate comment
      mrn: localStorage.getItem('mrn'),                      // Medical Record Number
      orgcode: "AMC",                        // Organization code
      appointmentnumber: item.slots[0].appointmentNumber,       // Unique appointment ID
      status: "BOKSTS3"                    // Status update
    };


    this.contentService.cancelAppoint(payload).subscribe(response => {
      if (response.status == true) {

        this.toastrService.success(response.message);
        window.location.reload();
      } else {

        this.toastrService.error(response.message)

      }
    })
  }

}
