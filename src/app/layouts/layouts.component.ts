import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from '../shared/services/content.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { LanguageSwitcherServiceService } from '../shared/services/language-switcher.service.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

export enum VisitSectionType {
  Dashboard = 1,
  Medication = 2,
  Appointment = 3,
  EducationMaterial = 4,
  Visit = 5,
  Report = 6,
  Request = 7,
  HealthTracking = 8
}

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css'],
})
export class LayoutsComponent {
  show: boolean = false;
  routes: Array<any> = [];
  permissions: Array<any> = [];
  user: any;
  classActives: any;
  userRole!: any;
  planType: any;
  item: any;
  cartCount: any;
  distributorcartCount: any;
  // currentLanguage: any;
  currentLanguage: string = 'en';
  isLanguageMenuOpen: boolean = false;
  role = localStorage.getItem('role');
  isSidebarCollapsed = false;
 public VisitSectionType = VisitSectionType;
isProfileMenuOpen:boolean = false;

// Web View
isProfileMenuOpenWeb = false;
isLanguageMenuOpenWeb = false;

// Mobile View
isProfileMenuOpenMobile = false;
isLanguageMenuOpenMobile = false;

  
  constructor(
    private spinner: NgxSpinnerService,
    private contentService: ContentService,
    private auth: AuthService,
    private el: ElementRef,
    private router: Router,
    private translate: TranslateService,
    private languageService: LanguageSwitcherServiceService,
    private toastr :ToastrService
  ) {}

  ngOnInit(): void {
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.languageService.switchLanguage(this.currentLanguage);
  }

 

  /******** Toggle side nav *********/
  sideNavDisplay(event: any) {
    this.show = event;
  }
  

  
toggleMenus() {
  this.isSidebarCollapsed = !this.isSidebarCollapsed;
}
  switchLanguage(lang: string) {
    this.currentLanguage = lang;
    this.languageService.switchLanguage(lang);
    localStorage.setItem('language', lang); // Store selected language


    if (lang === 'ar') {
      localStorage.setItem('arabicLanguage', 'Arabic');
    } else if (lang === 'en') {
      localStorage.setItem('englishLanguage', 'English');
    }

    window.location.reload();
  }

  public openSection(selectedRoute: any) {
    this.routes = this.routes.map((item) => {
      item.isSelected =
        item.name === selectedRoute.name ? !item.isSelected : false;
      return item;
    });
  }

  
// Web toggles
toggleProfileMenuWeb() {
  this.isProfileMenuOpenWeb = !this.isProfileMenuOpenWeb;
  if (this.isProfileMenuOpenWeb) {
    this.isLanguageMenuOpenWeb = false;
  }
}

toggleLanguageMenuWeb() {
  this.isLanguageMenuOpenWeb = !this.isLanguageMenuOpenWeb;
  if (this.isLanguageMenuOpenWeb) {
    this.isProfileMenuOpenWeb = false;
  }
}

// Mobile toggles
toggleProfileMenuMobile() {
  this.isProfileMenuOpenMobile = !this.isProfileMenuOpenMobile;
  if (this.isProfileMenuOpenMobile) {
    this.isLanguageMenuOpenMobile = false;
  }
}

toggleLanguageMenuMobile() {
  this.isLanguageMenuOpenMobile = !this.isLanguageMenuOpenMobile;
  if (this.isLanguageMenuOpenMobile) {
    this.isProfileMenuOpenMobile = false;
  }
}



@HostListener('document:click', ['$event.target'])
onClickOutside(target: HTMLElement) {
  const clickedInsideProfile = target.closest('.header-profile');
  if (!clickedInsideProfile) {
    this.isProfileMenuOpen = false;
    this.isLanguageMenuOpen = false;
  }
}



  classActive(data: any) {
    this.classActives = data;
  }

  logouts() {
    localStorage.clear();
  this.router.navigateByUrl('/login')
  }

   logout() {
    debugger
    localStorage.clear();
  this.router.navigateByUrl('/doctor-login');
  }
closeSidebar() {
  this.isSidebarCollapsed = false;
}

// Or more descriptive
onMenuClick() {
  this.closeSidebar();
}


 @HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  
  // If the clicked element is inside the sidebar and is an anchor tag
  if (target.closest('.side-bar a')) {
    if (window.innerWidth < 768) {
      this.isSidebarCollapsed = false; // or true if 'true' means closed
    }
  }
}


updateVisitSection(type: VisitSectionType): void {
    const payload = {
      username: localStorage.getItem('mrn'),
      type: VisitSectionType[type]
    };

    this.contentService.visitupdation(payload).subscribe({
      next: (res) => {
        if (res?.isSuccess) {
       
        } else {
          
        }
      },
      error: (err) => {     
      }
    });
  }


  updatedoctorVisitSection(type: VisitSectionType): void {
    const payload = {
      username: localStorage.getItem('code'),
      type: VisitSectionType[type]
    };

    this.contentService.visitupdation(payload).subscribe({
      next: (res) => {
        if (res?.isSuccess) {
       
        } else {
          
        }
      },
      error: (err) => {     
      }
    });
  }

}
