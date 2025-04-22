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
      { path: 'appointment', component: AppointmentListComponent },
      { path: 'doctor-list', component:DoctorListComponent},
      { path: 'doctor-list/detail/:id', component: DoctorDetailComponent},
      { path: 'profile', component:PatientProfileComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
