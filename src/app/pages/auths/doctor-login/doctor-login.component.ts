import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/shared/models/login';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LanguageSwitcherServiceService } from 'src/app/shared/services/language-switcher.service.service';
import { MessagingService } from 'src/app/shared/services/messaging-service';
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
    private languageService: LanguageSwitcherServiceService,
    private messagingService :MessagingService
  ) {
  
  }
  ngOnInit() {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.setConfigurationOfLoginForm();
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.languageService.switchLanguage(this.currentLanguage);
     this.messagingService.requestPermission();
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
      showInPatientPortal: [true],
      deviceType: ['Web']
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

  const formValues = this.loginForm.value;
  const fieldsToCheck = ['orgCode', 'loginid'];

  const isAnyRequiredFieldEmpty = fieldsToCheck.some(field => {
    const value = formValues[field];
    return !value || value.toString().trim() === '';
  });

  if (this.loginForm.invalid || isAnyRequiredFieldEmpty) {
    this.toasterService.error('Please enter correct value');
    this.spinner.hide();
    return;
  }

  this.authService.Doctorlogin(this.loginForm.value).subscribe({
    next: (response) => {
      if (response.status === true) {
        // ✅ Save token and doctor code as "mrn"
        const token = response.data?.token;
        const mrn = response.data?.doctor?.code;

        localStorage.setItem('token', token);
        localStorage.setItem('mrn', mrn);

        // ✅ Call FCM token update
        this.updateToken(mrn, token);

        // ✅ Reset form and navigate
        this.loginForm.reset();
        this.router.navigate(['/doctor-dashboard']);
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


 
updateToken(mrn: string, token: string) {
  const payload = {
    username: mrn,
    fcmToken: token
  };

  console.log('📤 Sending FCM update payload:', payload);

  this.authService.fcmToken(payload).subscribe({
    next: (response: any) => {
      if (response.isSuccess) {
        console.log('✅ FCM token updated successfully');
      } else {
        console.warn('⚠️ FCM token update failed:', response.messages);
      }
    },
    error: (err) => {
      console.error('❌ FCM token update error:', err);
    }
  });
}

getPrefrence(mrn:any){

  this.authService.getPrefrenceDoctor(mrn).subscribe(response => {
    if(response.isSuccess) {

    } else {

    }
  });
}

}
