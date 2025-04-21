import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from 'src/app/shared/services/content.service';

@Component({
  selector: 'app-language-list',
  templateUrl: './language-list.component.html',
  styleUrls: ['./language-list.component.css']
})
export class LanguageListComponent {
  languageList: any;
  
  constructor(private contentService: ContentService,
    private router: Router,
    private spinner: NgxSpinnerService,

  ) {
  }

  ngOnInit(): void {
    
  }


}
