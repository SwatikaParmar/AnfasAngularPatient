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
import { MedicationListComponent } from './Medication/medication-list/medication-list.component';
import { RequestListComponent } from './Medication/request-list/request-list.component';
import { EducationalMaterialComponent } from './education/educational-material/educational-material.component';
import { AddRequestComponent } from './Medication/add-request/add-request.component';
import { EducationalMaterialDetailComponent } from './education/educational-material/educational-material-detail/educational-material-detail.component';
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader { 
  return new TranslateHttpLoader(http, './assets/i18n/', '.json'); 
}

@NgModule({  
  declarations: [ 
    AppComponent
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
    
  ], 
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  
  bootstrap: [AppComponent] 
})
export class AppModule { }
