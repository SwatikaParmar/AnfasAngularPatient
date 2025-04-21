import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LanguageSwitcherServiceService } from 'src/app/shared/services/language-switcher.service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenuSidebar: EventEmitter<any> = new EventEmitter<any>();
  constructor(private auth: AuthService,
    private languageService: LanguageSwitcherServiceService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }
  switchLanguage(lang: string) {
    this.languageService.switchLanguage(lang);
  }
}
