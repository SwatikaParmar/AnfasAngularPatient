import { Component } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageSwitcherServiceService } from './shared/services/language-switcher.service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Anfas';
  currentLanguage: string = 'en';

  constructor(
    private translateService: TranslateService,
    private languageService: LanguageSwitcherServiceService,
    private router: Router,
  ) {
    this.translateService.setDefaultLang(this.currentLanguage);
    this.languageService.language$.subscribe(lang => {
      this.currentLanguage = lang;
      this.translateService.use(lang);
      document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    });
  }
  ngOnInit() {
    this.router.events.subscribe((defaultpage) => {
      if (defaultpage instanceof NavigationStart) {
        // tslint:disable-next-line: max-line-length
        if (defaultpage.url === '/login') {
          localStorage.removeItem('currentUser');
        }
      }
    });
  }

  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }
  }



