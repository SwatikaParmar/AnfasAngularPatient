import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageSwitcherServiceService } from 'src/app/shared/services/language-switcher.service.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/shared/services/content.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentLanguage: string = 'en';
  currentIndex: number = 0;
  images: string[] = [
    'assets/images/Photo3.jpg',
    'assets/images/Photo2.jpg',

  ];
  dots: any;
  intervalId: any;
  storedUser!: any;
  user: any;
  fname!: string | null;
  lname!: string | null;
  historyListOriginal: any[] = []; // the full original list
  historyList: any[] = [];         // the filtered list
  selectedStatus: string = 'All';  // dropdown selection

  constructor(
    private translateService: TranslateService,
    private languageService: LanguageSwitcherServiceService,
    private router: Router,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private route: ActivatedRoute,
  ) {

  }
  ngOnInit() {
    
    this.fname = localStorage.getItem('fname');
    this.lname = localStorage.getItem('lname');

    this.dots = document.querySelectorAll('.dot');
    this.updateCarousel();
    this.startAutoSlide();
    this.appointment();
  }

  ngOnDestroy() {
    // Clear interval to avoid memory leaks when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startAutoSlide() {
    // this.intervalId = setInterval(() => {
    //   this.currentIndex = (this.currentIndex + 1) % this.images.length;
    //   this.updateCarousel();
    // }, 3000);  // Change every 3 seconds
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateCarousel();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateCarousel();
  }

  updateCarousel() {
    // Update image opacity (ngClass does this now)
    // Update dots (ngClass does this now)
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.updateCarousel();
  }

  goToDoctorList() {
    
    this.router.navigate(['/doctor-list']);
  }


  appointment() {
    this.contentService.getAppointment(localStorage.getItem('mrn')).subscribe(
      response => {
        if (response.status === true) {
          this.historyListOriginal = response.data;
          this.historyList = this.historyListOriginal.length > 0 ? [this.historyListOriginal[0]] : [];
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


}
