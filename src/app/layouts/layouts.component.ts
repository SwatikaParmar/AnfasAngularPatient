import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from '../shared/services/content.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { LanguageSwitcherServiceService } from '../shared/services/language-switcher.service.service';
import { TranslateService } from '@ngx-translate/core';

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
  role = localStorage.getItem('role');
  isSidebarCollapsed = false;

  isProfileMenuOpen: boolean = false;
  isLanguageMenuOpen: boolean = false;


  
  constructor(
    private spinner: NgxSpinnerService,
    private contentServices: ContentService,
    private auth: AuthService,
    private el: ElementRef,
    private router: Router,
    private translate: TranslateService,
    private languageService: LanguageSwitcherServiceService
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
            this.isLanguageMenuOpen = false;

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

  // toggleLanguageMenu() {
  //   this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  // }

  // Toggle Profile Menu
  toggleProfileMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isProfileMenuOpen = !this.isProfileMenuOpen;

    // Close language menu if profile opens
    if (this.isProfileMenuOpen) {
      this.isLanguageMenuOpen = false;
    }
  }

  // Toggle Language Menu
  toggleLanguageMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;

    // Close profile menu if language opens
    if (this.isLanguageMenuOpen) {
      this.isProfileMenuOpen = false;
    }
  }



  @HostListener('document:click')
  handleOutsideClick() {
    this.isProfileMenuOpen = false;
    this.isLanguageMenuOpen = false;
  }


  classActive(data: any) {
    this.classActives = data;
  }

  logouts() {
        this.isProfileMenuOpen = false;

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


  // Auto-close dropdowns on outside click
  @HostListener('document:click')
  onDocumentClick(): void {
    this.isProfileMenuOpen = false;
    this.isLanguageMenuOpen = false;
  }
}




