import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  expectedOtp: string = '12345';
  error: string = '';

  constructor(private router: Router) {}

  onOtpChange(otp: string) {
    this.otp = otp;
    this.error = ''; // clear error on input
  }

  verifyOtp() {
    if (this.otp === this.expectedOtp) {
      // ✅ Navigate to the next page
      this.router.navigate(['/home']); // replace with your actual route
    } else {
      // ❌ Show error message
      this.error = 'Incorrect OTP. Please try again.';
    }
  }
}
