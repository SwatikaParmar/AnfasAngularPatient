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
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent {
loginForm!: FormGroup;
  loginModel!: Login;
  password: boolean = false;
  submitted = false;
  show = false;
  currentLanguage: string = 'en';

  currentLang: string = 'en'; // Default language
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
    this.currentLang = lang;
    this.currentLanguage = lang;
    this.languageService.switchLanguage(lang);
    localStorage.setItem('language', lang); // Store the selected language
  }
  
  get f() {
    return this.loginForm.controls;
  }                   

  setConfigurationOfLoginForm() {
    this.loginForm = this.formBuilder.group({
      orgCode: [''],
      loginid: [''],
      showInPatientPortal: [true]
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
      this.toasterService.error('Please enter correct value');
      this.spinner.hide();
      return;
    }
  
   
  
    this.authService.Doctorlogin(this.loginForm.value).subscribe({
      next: (response) => {
        if (response.status === true) {
          this.loginForm.reset();
         this.router.navigate(['/doctor-dashboard']); // replace with your actual route
          // Optionally still fetch patient details in background
        } else {
          this.toasterService.error(response.message);
        }
        
        this.spinner.hide();
      },
      error: (err) => {
        this.toasterService.error('Login failed. Please try again.');
      
        this.spinner.hide();
      }
    });
  }
  

 
}
