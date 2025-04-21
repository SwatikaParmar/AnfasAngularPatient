import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageSwitcherServiceService } from 'src/app/shared/services/language-switcher.service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentLanguage: string = 'en';

  constructor(
    private translateService: TranslateService,
    private languageService: LanguageSwitcherServiceService
  ) {
   
  }

}
