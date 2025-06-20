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


  // onLogin() {
  //   this.spinner.show();
  //   this.submitted = true;
  
  //   if (!this.loginForm.get(this.selectedField)?.value) {
  //     this.toasterService.error('Please enter correct value');
  //     this.spinner.hide();
  //     return;
  //   }
  
  //   const payload: any = {
  //     isVerified: true,
  //   };
  //   payload[this.selectedField] = this.loginForm.get(this.selectedField)?.value;
  
  //   this.authService.login(payload).subscribe({
  //     next: (response) => {
  //       if (response.status === true) {
  //         this.toasterService.success('OTP sent to your phone number');
  //         this.loginForm.reset();
  //         this.router.navigateByUrl('/otp'); // Navigate immediately after successful login
  //         // Optionally still fetch patient details in background
  //         this.patientDetail(payload);
  //       } else {
  //         this.toasterService.error(response.message);
  //       }
        
  //       this.spinner.hide();
  //     },
  //     error: (err) => {
  //       this.toasterService.error('Login failed. Please try again.');
  //  
  //       this.spinner.hide();
  //     }
  //   });
  // }
  

  // patientDetail(data: any) {
  //   this.authService.patientDetails(data).subscribe({
  //     next: (response) => {
  //       if (response.status === true) {
  //         this.router.navigateByUrl('/otp');
  //       } else {
  //         this.toasterService.error(response.message);
  //       }
  //       this.spinner.hide();
  //     },
  //     error: (err) => {
  //       console.error('Patient details error:', err);
  //       this.spinner.hide();
  //     }
  //   });
  // }
  


// login.component.ts
// onLogin() {
//   this.spinner.show();
//   this.submitted = true;

//   const value = this.loginForm.get(this.selectedField)?.value;

//   if (!value) {
//     this.toasterService.error('Please enter correct value');
//     this.spinner.hide();
//     return;
//   }

//   const payload: any = {
//     isVerified: false,
//   };
//   payload[this.selectedField] = value;

//   this.authService.login(payload).subscribe({
//     next: (loginResponse) => {
//       if (loginResponse.status === true || loginResponse.isSuccess === true) {

//         this.authService.sendotp(payload).subscribe({
//           next: (otpResponse) => {
//             if (otpResponse.status === true || otpResponse.isSuccess === true) {
//               this.toasterService.success('OTP sent to your phone number');

//               // Save phone number and MRN
//               const phoneNumber = otpResponse.data?.phoneNumber || '';
//               const mrn = otpResponse.data?.mrnNumber || '';
//               localStorage.setItem('phoneNumber', phoneNumber);
//               localStorage.setItem('mrnNumber', mrn);

//               this.router.navigateByUrl('/otp');
//             } else {
//               this.toasterService.error(otpResponse.message || 'OTP sending failed');
//             }
//           },
//           error: (err) => {
//             this.toasterService.error('Something went wrong while sending OTP.');
//             console.error('OTP error:', err);
//           }
//         });

//         this.authService.patientDetails(payload).subscribe({
//           next: (patientResponse) => {
//             if (patientResponse.status === true || patientResponse.isSuccess === true) {
//               this.loginForm.reset();
//             } else {
//               this.toasterService.error(patientResponse.message || 'Fetching patient details failed');
//             }
//             this.spinner.hide();
//           },
//           error: (err) => {
//             console.error('Patient details error:', err);
//             this.toasterService.error('Something went wrong while fetching patient details.');
//             this.spinner.hide();
//           }
//         });

//       } else {
//         this.toasterService.error(loginResponse.message || 'Login failed');
//         this.spinner.hide();
//       }
//     },
//     error: (err) => {
//  
//       this.toasterService.error('Login failed. Please try again.');
//       this.spinner.hide();
//     }
//   });
// }
onLogin() {
  this.spinner.show();
  this.submitted = true;

  const value = this.loginForm.get(this.selectedField)?.value;

  if (!value) {
    this.toasterService.error('Please enter correct value');
    this.spinner.hide();
    return;
  }

  const payload: any = {
    isVerified: false,
  };
  payload[this.selectedField] = value;

  // Step 1: Send OTP
  this.authService.sendotp(payload).subscribe({
    next: (otpResponse) => {
      if (otpResponse.status === true || otpResponse.isSuccess === true) {
        this.toasterService.success('OTP sent to your phone number');

        // Save phone number and MRN
        const phoneNumber = otpResponse.data?.phoneNumber || '';
        const mrn = otpResponse.data?.mrnNumber || '';

        localStorage.setItem('phoneNumber', phoneNumber);
        localStorage.setItem('mrnNumber', mrn);
        localStorage.setItem('mrn', mrn);
        localStorage.setItem('role', 'Patient');

        // Step 2: Fetch Patient Details
        this.authService.patientDetails(payload).subscribe({
          next: (patientResponse) => {
            if (patientResponse.status === true || patientResponse.isSuccess === true) {
              localStorage.setItem('loginRole', patientResponse.data.role);
              localStorage.setItem('fname', patientResponse.data.firstName);
              localStorage.setItem('lname', patientResponse.data.lastName);
            this.spinner.hide();

              // ✅ Navigate only after both calls are successful
              this.router.navigateByUrl('/otp');
            } else {
            
            }
            this.spinner.hide();
          },
          error: (err) => {
          
          
            this.spinner.hide();
          }
        });

      } else {
        this.toasterService.error(otpResponse.messages || 'OTP sending failed');
        this.spinner.hide();
      }
    },
    error: (err) => {

      this.toasterService.error('Something went wrong while sending OTP.');
      this.spinner.hide();
    }
  });
}



}
