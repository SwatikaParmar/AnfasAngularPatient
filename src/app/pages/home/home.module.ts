import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { VisitListComponent } from './visit/visit-list/visit-list.component';
import { ComplaintListComponent } from './complaint/complaint-list/complaint-list.component';
import { SatisfactionFormComponent } from './satisfaction/satisfaction-form/satisfaction-form.component';
import { AboutUsComponent } from './about/about-us/about-us.component';
import { MessagesListComponent } from './messages/messages-list/messages-list.component';
import { AppointmentListComponent } from './appointment/appointment-list/appointment-list.component';
import { DoctorListComponent } from './doctor/doctor-list/doctor-list.component';
import { DoctorDetailComponent } from './doctor/doctor-detail/doctor-detail.component';
import { PatientProfileComponent } from './profile/patient-profile/patient-profile.component';
import { PatientConsentComponent } from './profile/patient-consent/patient-consent.component';
import { BookAppointmentComponent } from './appointment/book-appointment/book-appointment.component';
import { EditConsentComponent } from './profile/edit-consent/edit-consent.component';
import { MessageChatComponent } from './messages/message-chat/message-chat.component';
import { ComplaintChatComponent } from './complaint/complaint-chat/complaint-chat.component';
import { ComplaintFormComponent } from './complaint/complaint-form/complaint-form.component';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HistoryListComponent } from 'src/app/history/history-list/history-list.component';
import { HistoryChatComponent } from 'src/app/history/history-list/history-chat/history-chat.component';
import { HealthTrackingComponent } from 'src/app/Health/health-tracking/health-tracking.component';
import { BloodPressureComponent } from 'src/app/Health/blood-pressure/blood-pressure.component';
import { BloodSugarComponent } from 'src/app/Health/blood-sugar/blood-sugar.component';
import { HeartRateComponent } from 'src/app/Health/heart-rate/heart-rate.component';
import { WeightComponent } from 'src/app/Health/weight/weight.component';
import { LabResultsComponent } from 'src/app/Health/lab-results/lab-results.component';
import { StepsComponent } from 'src/app/Health/steps/steps.component';
import { MedicationListComponent } from 'src/app/Medication/medication-list/medication-list.component';
import { RequestListComponent } from 'src/app/Medication/request-list/request-list.component';
import { CustomDateAdapter } from './appointment/book-appointment/custom-date-formats';
import { EducationalMaterialComponent } from 'src/app/education/educational-material/educational-material.component';
import { AddComplaintComponent } from './complaint/add-complaint/add-complaint.component';
import { AddRequestComponent } from 'src/app/Medication/add-request/add-request.component';
import { EducationalMaterialDetailComponent } from 'src/app/education/educational-material/educational-material-detail/educational-material-detail.component';
import { DoctorAppointmentComponent } from 'src/app/doctor/doctor-appointment/doctor-appointment.component';
import { DoctorPatientComponent } from 'src/app/doctor/doctor-patient/doctor-patient.component';
import { DoctorRecordsComponent } from 'src/app/doctor/doctor-records/doctor-records.component';
import { DoctorBloodPressureComponent } from 'src/app/doctor/doctor-blood-pressure/doctor-blood-pressure.component';
import { DoctorBloodsugarComponent } from 'src/app/doctor/doctor-bloodsugar/doctor-bloodsugar.component';
import { DoctorHeartRateComponent } from 'src/app/doctor/doctor-heart-rate/doctor-heart-rate.component';
import { DoctorLabresultsComponent } from 'src/app/doctor/doctor-labresults/doctor-labresults.component';
import { DoctorWeightComponent } from 'src/app/doctor/doctor-weight/doctor-weight.component';
import { DoctorStepsComponent } from 'src/app/doctor/doctor-steps/doctor-steps.component';
import { DoctorEducationComponent } from 'src/app/doctor/doctor-education/doctor-education.component';

import { TermsConditionComponent } from 'src/app/doctor/terms-condition/terms-condition.component';
import { DoctorDashboardComponent } from 'src/app/doctor/doctor-dashboard/doctor-dashboard.component';
import { DoctorProfileComponent } from 'src/app/doctor/doctor-profile/doctor-profile.component';

// export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

@NgModule({
  declarations: [
    HomeComponent,
    VisitListComponent,
    ComplaintListComponent,
    SatisfactionFormComponent,
    AboutUsComponent,
    MessagesListComponent,
    AppointmentListComponent,
    DoctorListComponent,
    DoctorDetailComponent,
    PatientProfileComponent,
    PatientConsentComponent,
    BookAppointmentComponent,
    EditConsentComponent,
    MessageChatComponent,
    ComplaintChatComponent,
    ComplaintFormComponent,
    HistoryListComponent,
    HistoryChatComponent,
    HealthTrackingComponent,
    BloodPressureComponent,
    BloodSugarComponent,
    HeartRateComponent,
    WeightComponent,
    LabResultsComponent,
    StepsComponent,
    MedicationListComponent,
    RequestListComponent,
    EducationalMaterialComponent,
    AddComplaintComponent,
    AddRequestComponent,
    EducationalMaterialDetailComponent,
    DoctorAppointmentComponent,
    DoctorPatientComponent,
    DoctorRecordsComponent,
    DoctorBloodPressureComponent,
    DoctorBloodsugarComponent,
    DoctorHeartRateComponent,
    DoctorLabresultsComponent,
    DoctorWeightComponent,
    DoctorStepsComponent,
    DoctorEducationComponent,
    TermsConditionComponent,
    DoctorDashboardComponent,
    DoctorProfileComponent

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    FormsModule,
    AngularEditorModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter }, // Override default DateAdapter
  ],
})
export class HomeModule { }
