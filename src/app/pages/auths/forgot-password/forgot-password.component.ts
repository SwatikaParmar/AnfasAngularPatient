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
    this.loginForm(); 
  }

  switchLanguage(lang: string) {
    this.currentLanguage = lang;
    this.languageService.switchLanguage(lang);
    localStorage.setItem('language', lang); // Store the selected language
  }

  get f() {
    return this.form.controls;
  }   

  loginForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      otp: ['', Validators.required],
    //  isVerify: [false]
    },
    {
      validator: this.MustMatch('newPassword', 'confirmPassword')
    });
  }
  
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  sendOTP() {
    if (this.form.controls['email'].invalid) {
      this.toasterService.error('Please enter a valid email.');
      return;
    }
  
    const payload = {  
      email: this.form.value.email,
      isUserExisting: true
    };
  
    this.auth.otp(payload).subscribe(response => {
      if (response.status == true) {
        this.otpSent = true;
        this.form.controls['otp'].enable(); 
        this.toasterService.success('OTP sent successfully.');
        this.receivedOTP = response.data.otpCode; // Store the received OTP
      } else {
        this.toasterService.error(response.message);
      }
    }, error => {
      this.toasterService.error('Failed to send OTP. Please try again.');
    });
  }

  verifyOTP() {
    if (!this.otpSent) {
      this.toasterService.error('Please send OTP first.');
      return;
    }

    const enteredOTP = this.form.value.otp;
    if (enteredOTP === this.receivedOTP.toString()) {
      this.otpVerified = true;
      // this.form.controls['otp'].disable();
      this.toasterService.success('OTP verified successfully.');
    } else {
      this.toasterService.error('Invalid OTP. Please try again.');
    }
  }

  
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (input.value.length >= 5 && event.key !== 'Backspace' && event.key !== 'Delete') {
      event.preventDefault();
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  resetPassword(){
    debugger
    this.submitted = true;
    
    if (this.form.invalid) {
      return;
    }

    if(this.otpVerified ==false){
      this.toasterService.error('Please verify OTP first')
       return;
    }

    this.spinner.show();
      let payload = {
        email: this.form.value.email,
        newPassword: this.form.value.newPassword
      }
      this.contentService.resetPassword(payload).subscribe(response => {
        if (response.isSuccess == true) {
          console.log('Reset Password Payload:', payload);

          localStorage.setItem('resetPasswordPayload', JSON.stringify(payload));
        
          this.toasterService.success(response.message,'successful login');
          this.router.navigate(['/login'])
            .then(() => {
              window.location.reload();
            });
         
        }
        else {
          this.toasterService.error(response.message,'error');
        }
      });
    }

     changePassword(){
      this.submitted = true;
      
     if (this.form.invalid) {
     }
  
     if(this.otpVerified == false){
       this.toasterService.error('Please verify OTP first')
       return;
     }
  
     this.spinner.show();
         let payload = {
          email:this.form.value.email,
         oldPassword: this.form.value.oldPassword,
        newPassword:this.form.value.newPassword
      }
      this.contentService.changePassword(payload).subscribe(response => {
        if (response.isSuccess == true) {
           this.toasterService.success(response.message,'success');
          this.router.navigate(['/login'])
             .then(() => {
             window.location.reload();
             });
           
        }
          else {
          this.toasterService.error(response.message,'error');
        }
        });
      }
}