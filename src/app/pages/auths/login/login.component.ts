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

  currentLang: string = 'en'; // Default language
  selectedField: string = 'mrn'; // Default selection
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
      mrn: [''],
      mobilePhone: [''],
      nationalId: [''],
      isVerified: [true]
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
  
   // Handle dropdown selection change
   onSelectChange(event: any) {
    this.selectedField = event.target.value;
    this.setConfigurationOfLoginForm();  // Reset form to ensure selected field is active
  }


  onLogin() {
    this.spinner.show();
    this.submitted = true;
  
    if (!this.loginForm.get(this.selectedField)?.value) {
      this.toasterService.error('Please enter correct value');
      this.spinner.hide();
      return;
    }
  
    const payload: any = {
      isVerified: true,
    };
    payload[this.selectedField] = this.loginForm.get(this.selectedField)?.value;
  
    this.authService.login(payload).subscribe({
      next: (response) => {
        if (response.status === true) {
          this.toasterService.success('OTP sent to your phone number');
          this.loginForm.reset();
          this.router.navigateByUrl('/otp'); // Navigate immediately after successful login
          // Optionally still fetch patient details in background
          this.patientDetail(payload);
        } else {
          this.toasterService.error(response.message);
        }
        
        this.spinner.hide();
      },
      error: (err) => {
        this.toasterService.error('Login failed. Please try again.');
        console.error('Login error:', err);
        this.spinner.hide();
      }
    });
  }
  

  patientDetail(data: any) {
    this.authService.patientDetails(data).subscribe({
      next: (response) => {
        if (response.status === true) {
          this.router.navigateByUrl('/otp');
        } else {
          this.toasterService.error(response.message);
        }
        this.spinner.hide();
      },
      error: (err) => {
        console.error('Patient details error:', err);
        this.spinner.hide();
      }
    });
  }
  
}
