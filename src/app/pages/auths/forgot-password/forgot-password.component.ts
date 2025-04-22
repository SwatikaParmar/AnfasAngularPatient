import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ContentService } from 'src/app/shared/services/content.service';
import { LanguageSwitcherServiceService } from 'src/app/shared/services/language-switcher.service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;
  show = false;
  password!: any;
  submitted = false;
  disableInput: boolean = false;
  showPassword = false;
  otpVerified = false;
  showConfirmPassword = false;
  receivedOTP: any;
  verifiedEmail: any;
  currentLanguage: string = 'en';
  otpSent = false;
  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toasterService: ToastrService,
    private contentService: ContentService,
    private auth: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private languageService: LanguageSwitcherServiceService
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.languageService.switchLanguage(this.currentLanguage);
  }

  switchLanguage(lang: string) {
    this.currentLanguage = lang;
    this.languageService.switchLanguage(lang);
    localStorage.setItem('language', lang); // Store the selected language
  }

  get f() {
    return this.form.controls;
  }   

 
}