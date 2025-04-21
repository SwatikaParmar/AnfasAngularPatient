import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageSwitcherServiceService {
  private languageSubject = new BehaviorSubject<string>('en');
  language$ = this.languageSubject.asObservable();

  private languageModeSubject = new BehaviorSubject<number>(1); // Default to English
  languageMode$ = this.languageModeSubject.asObservable();

  constructor(private translateService: TranslateService) {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    this.setLanguage(savedLanguage);
  }

  setLanguage(lang: string) {
    this.languageSubject.next(lang);
    this.translateService.use(lang);

    const languageMode = lang === 'ar' ? 2 : 1;
    this.languageModeSubject.next(languageMode);

    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('selectedLanguage', lang);
    localStorage.setItem('languageMode', languageMode.toString());
  }

  switchLanguage(language: string) {
    this.setLanguage(language);
  }
}
