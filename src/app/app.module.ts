import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { HomeModule } from './pages/home/home.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './pages/auths/auth.module';
import { JwtInterceptor } from './shared/helpers/jwt.interceptor';
import { LayoutModule } from './layouts/layout.module';

import { NgOtpInputModule } from 'ng-otp-input';
import { ConnectedDevicesComponent } from './connected-devices/connected-devices.component';
import { NotificationComponent } from './notification/notification.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { MessagingService } from './shared/services/messaging-service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MaintenanceComponent } from './maintenance/maintenance.component';







export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    MaintenanceComponent,
    

  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AuthModule,
    HomeModule,
    LayoutModule,
    NgxSpinnerModule,
    NgOtpInputModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    AngularFireAuthModule,
    AngularFireModule.initializeApp({
     apiKey: "AIzaSyDAv0cpNLxGNzD1viqjAsWe0ktoidMuego",
  authDomain: "anfas-7a927.firebaseapp.com",
  databaseURL: "https://anfas-7a927-default-rtdb.firebaseio.com",
  projectId: "anfas-7a927",
  storageBucket: "anfas-7a927.firebasestorage.app",
  messagingSenderId: "1078172885688",
  appId: "1:1078172885688:web:bd0848b228c9357bee8a4d",
  measurementId: "G-B3D35H5S50"
    }),
    AngularFireMessagingModule,  
  ],
  providers: [MessagingService, AsyncPipe, DatePipe,


  // ⭐ JWT Token Interceptor SECOND
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
