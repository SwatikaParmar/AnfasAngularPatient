import {OnInit, Renderer2,  } from '@angular/core';
import {
  AfterViewInit,
  ChangeDetectorRef,
  AfterViewChecked,
  Component,
  ViewChild,NgZone 
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageSwitcherServiceService } from 'src/app/shared/services/language-switcher.service.service';
import { ContentService } from 'src/app/shared/services/content.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, forkJoin, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { MatCalendar, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent {
  @ViewChild('calendar') calendar!: MatCalendar<Date>;

  currentLanguage: string = 'en';
  currentLang: string = 'en'; // Default language
  date!: string;
  activeDate: Date = new Date(); // This controls the active month view
  selectedDate: Date | null = null; // Store the selected date
  availableDates: string[] = []; // Store the available dates from API
  loadingDates = true;

  
  selectedTime: 'morning' | 'evening' = 'morning';
  slots: any[] = [];
  filteredSlots: any[] = [];
  rootUrl: any;
  receiverName: any;
  CareProviderCode: any;
  selectedSlot: any = null;




  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private content: ContentService,
    private toasterService: ToastrService,
    private router: Router,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private languageService: LanguageSwitcherServiceService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private _location: Location,
  ) {
  
  }

  ngAfterViewChecked() {
    if (this.calendar && this.availableDates.length > 0) {
      // Trigger calendar to re-render
      this.calendar.stateChanges.next();
    }
  }

  ngAfterViewInit() {
    this.getAvailableDate();
  }

  ngOnInit(): void {
     this.rootUrl = environment.rootPathUrl;
        this.route.queryParamMap.subscribe(params => {
          this.CareProviderCode = params.get('CareProviderCode') || '';
          this.receiverName = params.get('receiverName') || 'Unknown Receiver';
        });
    // your existing root‐class logic
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.languageService.switchLanguage(this.currentLanguage);
  }

 
  

  getAvailableDate(): void {
    this.spinner.show();  // 👈 Start spinner
    const today = new Date();
    const after30 = new Date(today);
    after30.setDate(today.getDate() + 30);

    const payload = {
      OrgCode: 'AMC',
      CareProviderCode: this.CareProviderCode,
      FromDate: this.formatDate(today),
      ToDate: this.formatDate(after30),
    };
    this.content.getAvailableDate(payload).subscribe((resp: { data: string[] }) => {
      this.availableDates = [...resp.data.map((d) => this.formatDate(new Date(d)))];

      this.cdr.detectChanges();
      // Trigger re-render of dateClass logic
      if (this.calendar) {
        this.calendar.updateTodaysDate();
        this.calendar.stateChanges.next();
        this.spinner.hide(); // 👈 Stop spinner

      }
  

    });
  }

  formatDate(d: Date): string {
    return [
      d.getFullYear(),
      ('0' + (d.getMonth()+1)).slice(-2),
      ('0' + d.getDate()).slice(-2)
    ].join('-');
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view !== 'month') return '';

    const iso = this.formatDate(cellDate);
    if (this.availableDates.includes(iso)) {
      return 'available-date';
    }

    return '';
  };
  
  // Handle date selection
  // onSelect(date: Date | null) {
  //   // Check if the date is null or not
  //   if (date !== null) {
  //     const iso = this.formatDate(date);
  //     if (this.availableDates.includes(iso)) {
  //       this.selectedDate = date;
  //     }
  //   } else {
  //     // Handle null case if needed (e.g., reset selectedDate)
  //     this.selectedDate = null;
  //   }
  // }
  

  // Update active date when month changes
  onMonthChange(date: Date) {
    this.activeDate = date; // Update active date when the month changes
    this.getAvailableDate(); // Re-fetch available dates based on the new month
  }

  // onDateChange(event: Date) {
  //   this.selectedDate = event;
  //   console.log('Selected date:', event);
  //   // You can fetch your slots here
  // }

  getWeekdayName(id: number): string {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return id >= 1 && id <= 7 ? weekdays[id - 1] : 'Unknown';
  }

  onAvailableDateSelect(event: any) {
    this.availableDates  = event.target.value;
  }
  onDateChange(event: Date) {
    this.selectedDate = event;
    const formattedDate = this.formatDate(event);
    this.getSlotsTime(formattedDate);
  }
  onSelect(date: Date | null) {
    if (date !== null) {
      const iso = this.formatDate(date);
      if (this.availableDates.includes(iso)) {
        this.selectedDate = date;
        this.getSlotsTime(iso); // Fetch time slots when date is selected
      }
    } else {
      this.selectedDate = null;
    }
  }

  backClicked() {
    this._location.back();
  }  

  getSlotsTime(date: string) {
    const payload = {
      OrgCode: 'AMC',
      CareProviderCode: this.CareProviderCode,
      FromDate: date,
      ToDate: date
    };
  debugger
    this.spinner.show();
    this.content.slotsAvaliable(payload).pipe(
      finalize(() => this.spinner.hide())
    ).subscribe((resp: any) => {
      if (resp && resp.data) {
        this.slots = resp.data.freeSlots;
        this.filterSlotsByTime(); // Filter when data is loaded
        console.log('Slots:', this.slots);
      } else {
        this.toasterService.warning('No slots available.');
      }
    });
  }
  
   // Filter by AM or PM
   filterSlotsByTime() {
    debugger
    if (this.selectedTime === 'morning') {
      this.filteredSlots = this.slots.filter(slot => slot.startTime.includes('AM'));
    } else {
      this.filteredSlots = this.slots.filter(slot => slot.startTime.includes('PM'));
    }
  }

  selectTime(time: 'morning' | 'evening') {
    this.selectedTime = time;
  debugger
    this.filteredSlots = this.slots.filter(slot => {
      const isMorning = slot.startTime.trim().toLowerCase().includes('am');
      return time === 'morning' ? isMorning : !isMorning;
    });
  }
  

  bookSelectedAppointment() {
    if (!this.selectedDate) {
      this.toasterService.warning('Please select a date first.');
      return;
    }
  
    if (!this.filteredSlots.length) {
      this.toasterService.warning('Please select a time slot.');
      return;
    }
  
    const selectedSlot = this.filteredSlots[0]; // you can improve this to allow user selection
    
    const payload = {
      appointmentDate: this.formatDate(this.selectedDate),
      comment: null,
      mrn:  localStorage.getItem('mrn'),  // Ideally, you should get the MRN dynamically
      careProviderCode: this.CareProviderCode,
      orgCode: 'AMC',
      checkOrganisation: true,
      appointmentNumber: '',
      status: 'BOKSTS1',
      statusCode: 'BOKSTS1',
      reasonCode: '11429006',
      reasonText: 'UNK',
      slotId: selectedSlot.slotId,
      visitTypeCode: 'VSTTYP14',
      isTeleconsult: false
    };
  
    this.spinner.show();
    this.content.bookAppointment(payload).pipe(
      finalize(() => this.spinner.hide())
    ).subscribe((response: any) => {
      if (response.status) {
        this.toasterService.success('Appointment booked successfully.');
        this.router.navigate(['/appointment-list'], { queryParams: { referenceId: response.data.referenceid } });
      } else {
        this.toasterService.error('Failed to book appointment.');
      }
    }, (error) => {
      this.spinner.hide();
      this.toasterService.error('Something went wrong. Please try again.');
      console.error('Error booking appointment:', error);
    });
  }
  

  navigateToPreview(): void {
    const mrn = localStorage.getItem('mrn');
    if (mrn) {
      this.router.navigate(['/profile/consent'], {
        queryParams: { mrn }
      });
    } else {
      this.toasterService.warning('MRN is missing.');
    }
  }
  selectSlot(slot: any): void {
    this.selectedSlot = slot;
  }

}
