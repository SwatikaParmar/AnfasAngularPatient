import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageSwitcherServiceService } from 'src/app/shared/services/language-switcher.service.service';
import { ContentService } from 'src/app/shared/services/content.service';
@Component({
  selector: 'app-complaint-form',
  templateUrl: './complaint-form.component.html',
  styleUrls: ['./complaint-form.component.css']
})
export class ComplaintFormComponent {
  complaintForm!: FormGroup;
  password: boolean = false;
  submitted = false;
  show = false;
  currentLanguage: string = 'en';

  currentLang: string = 'en'; // Default language

  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private content: ContentService,
    private toasterService: ToastrService,
    private router: Router,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private languageService: LanguageSwitcherServiceService
  ) {
  
  }

  ngOnInit() {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.Form();
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.languageService.switchLanguage(this.currentLanguage);
  }


  get f() {
    return this.complaintForm.controls;
  }                   

  Form() {
    this.complaintForm = this.formBuilder.group({
      mrn: [''],
      mobilePhone: [''],
      nationalId: [''],
      isVerified: [true]
    });
  }

}
