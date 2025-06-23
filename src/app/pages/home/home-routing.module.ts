import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LayoutsComponent } from 'src/app/layouts/layouts.component';

import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { VisitListComponent } from './visit/visit-list/visit-list.component';
import { ComplaintListComponent } from './complaint/complaint-list/complaint-list.component';
import { SatisfactionFormComponent } from './satisfaction/satisfaction-form/satisfaction-form.component';
import { AboutUsComponent } from './about/about-us/about-us.component';
import { MessagesListComponent } from './messages/messages-list/messages-list.component';
import { AppointmentListComponent } from './appointment/appointment-list/appointment-list.component';
import { DoctorDetailComponent } from './doctor/doctor-detail/doctor-detail.component';
import { DoctorListComponent } from './doctor/doctor-list/doctor-list.component';
import { PatientProfileComponent } from './profile/patient-profile/patient-profile.component';
import { PatientConsentComponent } from './profile/patient-consent/patient-consent.component';
import { BookAppointmentComponent } from './appointment/book-appointment/book-appointment.component';
import { MessageChatComponent } from './messages/message-chat/message-chat.component';
import { ComplaintChatComponent } from './complaint/complaint-chat/complaint-chat.component';
import { ComplaintFormComponent } from './complaint/complaint-form/complaint-form.component';
import { HistoryListComponent } from 'src/app/history/history-list/history-list.component';
import { HistoryChatComponent } from 'src/app/history/history-list/history-chat/history-chat.component';
import { HealthTrackingComponent } from 'src/app/Health/health-tracking/health-tracking.component';
import { MedicationListComponent } from 'src/app/Medication/medication-list/medication-list.component';
import { RequestListComponent } from 'src/app/Medication/request-list/request-list.component';
import { BloodPressureComponent } from 'src/app/Health/blood-pressure/blood-pressure.component';
import { BloodSugarComponent } from 'src/app/Health/blood-sugar/blood-sugar.component';
import { HeartRateComponent } from 'src/app/Health/heart-rate/heart-rate.component';
import { WeightComponent } from 'src/app/Health/weight/weight.component';
import { LabResultsComponent } from 'src/app/Health/lab-results/lab-results.component';
import { StepsComponent } from 'src/app/Health/steps/steps.component';
import { EducationalMaterialComponent } from 'src/app/education/educational-material/educational-material.component';
import { AddRequestComponent } from 'src/app/Medication/add-request/add-request.component';
import { EducationalMaterialDetailComponent } from 'src/app/education/educational-material/educational-material-detail/educational-material-detail.component';
import { DoctorDashboardComponent } from 'src/app/doctor/doctor-dashboard/doctor-dashboard.component';
import { DoctorAppointmentComponent } from 'src/app/doctor/doctor-appointment/doctor-appointment.component';
import { DoctorPatientComponent } from 'src/app/doctor/doctor-patient/doctor-patient.component';
import { DoctorRecordsComponent } from 'src/app/doctor/doctor-records/doctor-records.component';
import { DoctorBloodPressureComponent } from 'src/app/doctor/doctor-blood-pressure/doctor-blood-pressure.component';
import { DoctorBloodsugarComponent } from 'src/app/doctor/doctor-bloodsugar/doctor-bloodsugar.component';
import { DoctorHeartRateComponent } from 'src/app/doctor/doctor-heart-rate/doctor-heart-rate.component';
import { DoctorWeightComponent } from 'src/app/doctor/doctor-weight/doctor-weight.component';
import { DoctorLabresultsComponent } from 'src/app/doctor/doctor-labresults/doctor-labresults.component';

import { DoctorStepsComponent } from 'src/app/doctor/doctor-steps/doctor-steps.component';
import { DoctorEducationComponent } from 'src/app/doctor/doctor-education/doctor-education.component';
import { TermsConditionComponent } from 'src/app/doctor/terms-condition/terms-condition.component';
import { DoctorProfileComponent } from 'src/app/doctor/doctor-profile/doctor-profile.component';
import { ChatListComponent } from 'src/app/doctor/chat/chat-list/chat-list.component';
import { ChatBoxComponent } from 'src/app/doctor/chat/chat-box/chat-box.component';
import { DoctorAddEducationalmaterialComponent } from 'src/app/doctor/doctor-add-educationalmaterial/doctor-add-educationalmaterial.component';
import { DoctorAddmedicationComponent } from 'src/app/doctor/doctor-addmedication/doctor-addmedication.component';
import { DoctorEducationalmaterialComponent } from 'src/app/doctor/doctor-educationalmaterial/doctor-educationalmaterial.component';
import { AppointmentChatListComponent } from 'src/app/doctor/doctor-appointment/appointment-chat-list/appointment-chat-list.component';
import { PatientChatlistComponent } from 'src/app/doctor/doctor-patient/patient-chatlist/patient-chatlist.component';
import { VisitDiagnoseComponent } from './visit/visit-list/visit-diagnose/visit-diagnose.component';
import { RequestDetailComponent } from 'src/app/Medication/request-detail/request-detail.component';
import { ConnectedDevicesComponent } from 'src/app/connected-devices/connected-devices.component';
const routes: Routes = [

  {
    path: '',
    component: LayoutsComponent,
    canActivate: [AuthGuard],
    children: [

      { path: 'home', component: HomeComponent },
      { path: 'visit', component: VisitListComponent },
      { path: 'visit/report/:id/:id2/:id3/:id4', component: VisitDiagnoseComponent },
      { path: 'complaint', component: ComplaintListComponent },
      { path: 'visit/satisfaction-form', component: SatisfactionFormComponent },
      { path: 'about-Us', component: AboutUsComponent },
      { path: 'messages', component: MessagesListComponent },
      { path: 'appointment-list/appointment', component: AppointmentListComponent },
      { path: 'doctor-list', component: DoctorListComponent },
      { path: 'doctor-list/detail/:id', component: DoctorDetailComponent },
      { path: 'profile', component: PatientProfileComponent },
      { path: 'profile/consent', component: PatientConsentComponent },
      { path: 'appointment-list/appointment/book', component: BookAppointmentComponent },
      { path: 'messages/chat', component: MessageChatComponent },
      { path: 'complaint/chat/:id', component: ComplaintChatComponent },
      { path: 'complaint/complaint-add', component: ComplaintFormComponent },
      { path: 'history-list', component: HistoryListComponent },
      { path: 'history-list/chat', component: HistoryChatComponent },
      { path: 'appointment-list', component: HistoryListComponent },
      { path: 'Health-Tracker', component: HealthTrackingComponent },
      { path: 'medication-list', component: MedicationListComponent },
      { path: 'request-list', component: RequestListComponent },
      { path: 'request-list/detail/:id', component: RequestDetailComponent },
      { path: 'Health-Tracker/Blood-Pressure', component: BloodPressureComponent },
      { path: 'Health-Tracker/Blood-Sugar', component: BloodSugarComponent },
      { path: 'Health-Tracker/Heart-Rate', component: HeartRateComponent },
      { path: 'Health-Tracker/Weight', component: WeightComponent },
      { path: 'Health-Tracker/Lab-Results', component: LabResultsComponent },
      { path: 'Health-Tracker/Steps', component: StepsComponent },
      { path: 'educational-Material', component: EducationalMaterialComponent },
      { path: 'educational-Material/educational-detail/:id', component: EducationalMaterialDetailComponent },
      { path: 'request-list/request-add', component: AddRequestComponent },
      { path: 'request-list/update/:id', component: AddRequestComponent },

      // Doctor Routes

      { path: 'doctor-dashboard', component: DoctorDashboardComponent },
      { path: 'doctor-appointment', component: DoctorAppointmentComponent },
      { path: 'doctor-patient', component: DoctorPatientComponent },
      { path: 'doctor-patient/doctor-records/:id', component: DoctorRecordsComponent },
      { path: 'doctor-patient/doctor-bloodPressure/:id', component: DoctorBloodPressureComponent },
      { path: 'doctor-patient/doctor-bloodSugar/:id', component: DoctorBloodsugarComponent },
      { path: 'doctor-patient/doctor-HeartRate/:id', component: DoctorHeartRateComponent },
      { path: 'doctor-patient/doctor-weight/:id', component: DoctorWeightComponent },
      { path: 'doctor-patient/doctor-labresults/:id/:id2/:id3', component: DoctorLabresultsComponent },
      { path: 'doctor-patient/doctor-steps/:id', component: DoctorStepsComponent },
      { path: 'doctor', component: DoctorEducationComponent },
      { path: 'terms', component: TermsConditionComponent },
      { path: 'doctor-profile', component: DoctorProfileComponent },
      { path: 'chat-list', component: ChatListComponent },
      { path: 'chat-list/chat/:id/:name', component: ChatBoxComponent },
      { path: 'doctor/educational-detail/:id', component: DoctorEducationalmaterialComponent },
      { path: 'doctor/educational-material', component: DoctorAddEducationalmaterialComponent },
      { path: 'doctor/educational-material-edit/:id', component: DoctorAddEducationalmaterialComponent },
      { path: 'doctor-patient/doctor/medication/:id', component: DoctorAddmedicationComponent },
      { path: 'doctor-patient/doctor/medication/update/:id/:id2', component: DoctorAddmedicationComponent },
      { path: 'doctor-appointment/appointment-list/chat', component: AppointmentChatListComponent },
      { path: 'doctor-patient/Patient/chat', component: PatientChatlistComponent },
       { path: 'connected-Devices', component: ConnectedDevicesComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
