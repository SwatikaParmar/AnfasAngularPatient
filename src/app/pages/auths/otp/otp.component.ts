import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ContentService } from 'src/app/shared/services/content.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {
  
  otpConfig = {
    length: 5,
    inputClass: 'otp-input',
    allowNumbersOnly: true
  };

   otp: string = '';
  error: string = '';
  phoneNumber: string = localStorage.getItem('phoneNumber') || '';
  role: string = localStorage.getItem('role') || '';
 mrnNumber: string = localStorage.getItem('mrnNumber') || ''; // example default
  nationalId: string = localStorage.getItem('nationalId') || ''; // or any default value
constructor(
    private router: Router,
    private toastr: ToastrService,
    private authservice: AuthService
  ) {}


  onOtpChange(otp: string) {
    this.otp = otp;
    this.error = ''; // clear error on input
  }

  // verifyOtp() {
  //   if (this.otp === this.expectedOtp) {
  //     // ✅ Navigate to the next page

  //     if(this.role == 'Patient') {
  //        this.router.navigate(['/home']); // replace with your actual route
  //     } else if (this.role == 'Doctor') {
  //        this.router.navigate(['/doctor-dashboard']); // replace with your actual route

  //     }
     
  //   } else {
  //     // ❌ Show error message
  //     this.error = 'Incorrect OTP. Please try again.';
  //   }
  // }

  verifyOtp() {
    if (!this.otp || this.otp.length !== 5) {
      this.error = 'Please enter a valid OTP.';
      return;
    }

    this.authservice.verifyPhone(this.phoneNumber, this.otp).subscribe({
      next: (res) => {
        if ((res?.status === true || res?.isSuccess === true) && (res?.code === 200 || res?.statusCode === 200)) {
          this.toastr.success(res.message || 'OTP verified successfully');

          if (this.role === 'Patient') {
            this.router.navigate(['/home']);
          } else if (this.role === 'Doctor') {
            this.router.navigate(['/doctor-dashboard']);
          } else {
            this.router.navigate(['/home']); // fallback
          }
        } else {
          this.error = res?.message || 'OTP verification failed.';
        }
      },
      error: (err) => {
        this.error = 'Something went wrong. Please try again.';
        console.error(err);
      }
    });
  }



//   Resendotp(data: any) {
//   this.authservice.sendotp(data).subscribe({
//     next: (response) => {
//       // Use isSuccess and statusCode as per your API response
//       if (response.isSuccess === true && response.statusCode === 200) {
//         this.toastr.success(response.messages || 'OTP resent successfully.');
//       } else {
//         this.toastr.error(response.messages || 'Failed to resend OTP.');
//       }
//     },
//     error: (err) => {
//       console.error('Resend OTP error:', err);
//       this.toastr.error('Something went wrong. Please try again.');
//     }
//   });
// }

  
}
