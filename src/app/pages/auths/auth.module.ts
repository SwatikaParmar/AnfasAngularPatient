import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthRoutingModule } from './auth-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { OtpComponent } from './otp/otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    OtpComponent,
    DoctorLoginComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReactiveFormsModule,  
    BrowserAnimationsModule,
    FormsModule,
    AuthRoutingModule,
    TranslateModule,
    NgOtpInputModule
  ],
  providers: []
})
export class AuthModule { }

