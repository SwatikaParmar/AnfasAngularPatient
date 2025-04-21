import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/shared/models/login';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LanguageSwitcherServiceService } from 'src/app/shared/services/language-switcher.service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginModel!: Login;
  password: boolean = false;
  submitted = false;
  show = false;
  currentLanguage: string = 'en';
  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toasterService: ToastrService,
    private router: Router,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private languageService: LanguageSwitcherServiceService
  ) {
  
  }
  ngOnInit() {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.setConfigurationOfLoginForm();
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.languageService.switchLanguage(this.currentLanguage);
  }

  switchLanguage(lang: string) {
    this.currentLanguage = lang;
    this.languageService.switchLanguage(lang);
    localStorage.setItem('language', lang); // Store the selected language
  }
  
  get f() {
    return this.loginForm.controls;
  }                   

  setConfigurationOfLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      deviceToken:['string'],
      deviceType:['string']
    });
  }
     
  togglePasswordVisibility() {
    this.password = !this.password;
  }

  // onClick() {
  //   if (this.password === 'password') {
  //     this.password = 'text';
  //     this.show = true;
  //   } else {
  //     this.password = 'password';  
  //     this.show = false;                                                                        
  //   }                                            
  // }                                               

  onLogin() {
    this.spinner.show();
    this.submitted = true;
  
    if (this.loginForm.invalid) {
      this.toasterService.error('Incorrect Username');
      this.spinner.hide();
      return;
    } 
    this.loginModel = this.loginForm.value;
    this.authService.login(this.loginModel).subscribe({
      next: (response) => {
        if (response.status === true) {
          this.loginForm.reset();
          this.toasterService.success(response.message);
          this.router.navigateByUrl('/home');
        } else {
          this.toasterService.error(response.message);
        }
        this.spinner.hide();
      },
      error: (err) => {
        this.toasterService.error('Login failed. Please try again.');
        this.spinner.hide();
        console.error('Login error:', err);
      }
    });
  } 
  
}
