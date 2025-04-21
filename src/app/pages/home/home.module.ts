import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DashboardComponent } from './Dashbord/dashboard/dashboard.component';
import { AppointmentListComponent } from './appointment-list/appointment-list/appointment-list.component';
import { AppointmentDetailsComponent } from './appointment-list/appointment-details/appointment-details.component';


import { DoctorAddComponent } from './doctor-list/doctor-add/doctor-add.component';
import { DoctorEditComponent } from './doctor-list/doctor-edit/doctor-edit.component';
import { DoctorDetailsComponent } from './doctor-list/doctor-details/doctor-details.component';
import { DoctorListComponent } from './doctor-list/doctor-list/doctor-list.component';
import { EditLabServiceComponent } from './lab-service/edit-lab-service/edit-lab-service.component';
import { LabServiceComponent } from './lab-service/lab-service/lab-service.component';
import { ManageLanguageComponent } from './language-list/manage-language/manage-language.component';
import { LanguageListComponent } from './language-list/language-list/language-list.component';
import { PatientsListComponent } from './patients-list/patients-list/patients-list.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { BannerListComponent } from 'src/app/banner-list/banner-list.component';
import { BannerDetailComponent } from 'src/app/banner-list/banner-detail/banner-detail.component';
import { BannerAddComponent } from 'src/app/banner-list/banner-add/banner-add.component';
import { PatientsDetailComponent } from './patients-list/patients-detail/patients-detail.component';
import { PatientsAddComponent } from './patients-list/patients-add/patients-add.component';
import { VisitDetailComponent } from 'src/app/visit-detail/visit-detail.component';
import { GetconsentformComponent } from 'src/app/getconsentform/getconsentform.component';
import { ComplaintListComponent } from 'src/app/complaint-list/complaint-list.component';
import { FeedbackComponent } from 'src/app/feedback/feedback.component';
import { ComplaintDetailComponent } from 'src/app/complaint-list/complaint-detail/complaint-detail.component';
import { SatisfactionSurveyComponent } from 'src/app/Satisfaction/satisfaction-survey/satisfaction-survey.component';
import { SurveyDataComponent } from 'src/app/Satisfaction/survey-data/survey-data.component';


// export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    AppointmentListComponent,
    AppointmentDetailsComponent,
    DoctorAddComponent,
    DoctorEditComponent,
    DoctorDetailsComponent,
    DoctorListComponent,
    EditLabServiceComponent,
    LabServiceComponent,
    ManageLanguageComponent,
    LanguageListComponent,
    PatientsListComponent,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    AboutusComponent,
    BannerListComponent,
    BannerDetailComponent,
    BannerAddComponent,
    PatientsDetailComponent,
    PatientsAddComponent,
    VisitDetailComponent,
    GetconsentformComponent,
    ComplaintListComponent,
    FeedbackComponent,
    ComplaintDetailComponent,
    SatisfactionSurveyComponent,
    SurveyDataComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    FormsModule,
    AngularEditorModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: []
})
export class HomeModule { }
