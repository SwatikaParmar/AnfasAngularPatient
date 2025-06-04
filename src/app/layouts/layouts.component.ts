import { Component, ElementRef, Renderer2 } from '@angular/core';
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
  isMenuOpen = false;
  cartCount: any;
  distributorcartCount: any;
  // currentLanguage: any;
  currentLanguage: string = 'en';
  isLanguageMenuOpen: boolean = false;
  role = localStorage.getItem('role')
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
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  switchLanguage(lang: string) {
    this.currentLanguage = lang;
    this.languageService.switchLanguage(lang);
    localStorage.setItem('language', lang); // Store selected language
debugger

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

  toggleLanguageMenu() {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
  }

  classActive(data: any) {
    this.classActives = data;
  }

  logouts() {
    localStorage.clear();
    this.auth.logout();
  }
}
