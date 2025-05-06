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


const routes: Routes = [

  {
    path: '',
    component: LayoutsComponent,
    canActivate: [AuthGuard],
    children: [

      { path: 'home', component: HomeComponent },
      { path: 'visit', component: VisitListComponent },
      { path: 'complaint', component: ComplaintListComponent },
      { path: 'satisfaction-form', component: SatisfactionFormComponent },
      { path: 'about-Us', component: AboutUsComponent },
      { path: 'messages', component: MessagesListComponent },
      { path: 'appointment-list/appointment', component: AppointmentListComponent },
      { path: 'doctor-list', component:DoctorListComponent},
      { path: 'doctor-list/detail/:id', component: DoctorDetailComponent},
      { path: 'profile', component:PatientProfileComponent},
      { path: 'profile/consent', component:PatientConsentComponent},
      { path: 'appointment-list/appointment/book', component:BookAppointmentComponent},
      { path: 'messages/chat', component:MessageChatComponent},
      { path: 'complaint/chat/:id', component:ComplaintChatComponent},
      { path: 'complaint/complaint-add', component: ComplaintFormComponent},
      { path: 'history-list', component: HistoryListComponent},
      { path: 'history-list/chat', component:HistoryChatComponent},
      { path: 'appointment-list', component: HistoryListComponent},
      { path: 'Health-Tracker', component: HealthTrackingComponent},
      { path: 'medication-list', component: MedicationListComponent},
      { path: 'request-list', component: RequestListComponent},
      { path: 'Health-Tracker/Blood-Pressure', component: BloodPressureComponent},
      { path: 'Health-Tracker/Blood-Sugar', component: BloodSugarComponent},
      { path: 'Health-Tracker/Heart-Rate', component: HeartRateComponent},
      { path: 'Health-Tracker/Weight', component: WeightComponent},
      { path: 'Health-Tracker/Lab-Results', component: LabResultsComponent},
      { path: 'Health-Tracker/Steps', component: StepsComponent},
      { path: 'educational-Material', component: EducationalMaterialComponent},
      { path: 'request-list/request-add', component: AddRequestComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
