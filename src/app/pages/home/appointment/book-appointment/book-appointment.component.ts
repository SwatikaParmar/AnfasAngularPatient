import {OnInit, Renderer2,  } from '@angular/core';
import {
  AfterViewInit,
  ChangeDetectorRef,
  AfterViewChecked,
  Component,
  ViewChild,NgZone 
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageSwitcherServiceService } from 'src/app/shared/services/language-switcher.service.service';
import { ContentService } from 'src/app/shared/services/content.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, forkJoin, Subscription } from 'rxjs';

import { MatCalendar, MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent {
  @ViewChild('calendar') calendar!: MatCalendar<Date>;

  selectedTime: string = 'morning';
  currentLanguage: string = 'en';
  currentLang: string = 'en'; // Default language
  date!: string;
  activeDate: Date = new Date(); // This controls the active month view
  selectedDate: Date | null = null; // Store the selected date
  availableDates: string[] = []; // Store the available dates from API
  loadingDates = true;
  slots: any;

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
    private zone: NgZone

  ) {
  
  }

  ngAfterViewChecked() {
    if (this.calendar && this.availableDates.length > 0) {
      // Trigger calendar to re-render
      this.calendar.stateChanges.next();
    }
  }

  ngOnInit(): void {
    // your existing root‐class logic
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.languageService.switchLanguage(this.currentLanguage);
  }

  ngAfterViewInit() {
    // now that the <mat-calendar> is in the DOM…
    this.getAvailableDate();
  }

  selectTime(time: string) {
    this.selectedTime = time;
  }

  getAvailableDate(): void {
    const today = new Date();
    const after30 = new Date(today);
    after30.setDate(today.getDate() + 30);

    const payload = {
      OrgCode: 'AMC',
      CareProviderCode: 1567,
      FromDate: this.formatDate(today),
      ToDate: this.formatDate(after30),
    };
    this.content.getAvailableDate(payload).subscribe((resp: { data: string[] }) => {
      // if (!resp.status) {
      //   this.toasterService.error(resp.message);
      //   return;
      // }

      this.availableDates = resp.data.map((d) => this.formatDate(new Date(d)));

      // Trigger change detection and calendar re-render after data is loaded
      this.cdr.detectChanges();
      if (this.calendar) {
        this.calendar.stateChanges.next();
      } else {
        console.error('Calendar is not yet initialized');
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

  // dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
  //   if (view !== 'month') return '';
  //   const iso = this.formatDate(cellDate);
  //   if (this.availableDates.includes(iso)) {
  //     return this.selectedDate && this.formatDate(this.selectedDate) === iso
  //       ? 'clicked-date-highlight'
  //       : 'available-date';
  //   }
  //   return '';
  // };
  
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    debugger
    if (view !== 'month') return '';
  
    const iso = this.formatDate(cellDate);
  
    // If the cell is an available date, highlight it
    if (this.availableDates.includes(iso)) {
      if (this.selectedDate && this.formatDate(this.selectedDate) === iso) {
        return 'clicked-date-highlight';  // Highlight for selected date
      } else {
        return 'available-date';  // Highlight for available date
      }
    }
  
    return '';  // No class if the date is neither selected nor available
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
    
  getSlotsTime(date: string) {
    const payload = {
      OrgCode: 'AMC',
      CareProviderCode: 1567,
      FromDate: date,
      ToDate: date
    };
  
    this.spinner.show();
    this.content.slotsAvaliable(payload).pipe(
      finalize(() => this.spinner.hide())
    ).subscribe((resp: any) => {
      if (resp && resp.data) {
        this.slots = resp.data;
        console.log('Slots:', this.slots);
      } else {
        this.toasterService.warning('No slots available.');
      }
    });
  }
  
  

}
